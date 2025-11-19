export default {
  updateInsurenceValue: {
    task: async ({ strapi }) => {
      const instruments = await strapi.db
        .query("api::instrument.instrument")
        .findMany();

      const today = new Date().getUTCFullYear();
      for (const instrument of instruments) {
        const { Occasion, Purchase_Date, Purchase_Value } = instrument;

        if (Occasion && Occasion > 0) {
          instrument.Computed_Insurance_Value = Occasion;
        } else if (Purchase_Date && Purchase_Value) {
          const purchaseYear = Purchase_Date.split("-", 1)[0];
          if (purchaseYear === today) {
            instrument.Computed_Insurance_Value = Purchase_Value;
          } else if (today - 1 === purchaseYear) {
            instrument.Computed_Insurance_Value = Purchase_Value * 0.9;
          } else if (today - 2 === purchaseYear) {
            instrument.Computed_Insurance_Value = Purchase_Value * 0.85;
          } else if (today - 3 === purchaseYear) {
            instrument.Computed_Insurance_Value = Purchase_Value * 0.8;
          } else if (today - 6 <= purchaseYear) {
            instrument.Computed_Insurance_Value = Purchase_Value * 0.75;
          } else if (today - 10 <= purchaseYear) {
            instrument.Computed_Insurance_Value = Purchase_Value * 0.7;
          } else if (today - 10 >= purchaseYear) {
            instrument.Computed_Insurance_Value = Purchase_Value * 0.65;
          }
        }

        await strapi.db.query("api::instrument.instrument").update({
          where: { id: instrument.id },
          data: instrument,
        });
      }
    },
    options: {
      rule: "0 0 0 1 1 *",
    },
  },
  updateJubileeYears: {
    task: async ({ strapi }) => {
      const members = await strapi.db.query("api::member.member").findMany();

      const todayYear = new Date().getUTCFullYear();
      for (const member of members) {
        const { DifferentAssociationYears, StartMembership, EndMembership } =
          member;

        if (!EndMembership) {
          const startYear = StartMembership.split("-", 1)[0];

          member.JubileeYears =
            todayYear - +startYear + (DifferentAssociationYears || 0);

          await strapi.db.query("api::member.member").update({
            where: { id: member.id },
            data: member,
          });
        }
      }
    },
    options: {
      rule: "0 0 20 20 11 *",
    },
  },
};
