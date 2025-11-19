export default {
  afterCreate(event) {
    const todayYear = new Date().getUTCFullYear();
    const { DifferentAssociationYears, StartMembership, EndMembership } =
      event.params.data;

    if (EndMembership !== null || EndMembership !== undefined) {
      return;
    }

    const startYear = StartMembership.split("-", 1)[0];

    event.params.data.JubileeYears =
      todayYear - startYear + (Number(DifferentAssociationYears) || 0);
  },
};
