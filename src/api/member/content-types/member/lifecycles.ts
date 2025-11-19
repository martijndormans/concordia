export default {
  beforeCreate(event) {
    const todayYear = new Date().getUTCFullYear();
    const { DifferentAssociationYears, StartMembership, EndMembership } =
      event.params.data;

    if (EndMembership) {
      return;
    }

    const startYear = StartMembership.split("-", 1)[0];

    event.params.data.JubileeYears =
      todayYear - +startYear + (DifferentAssociationYears || 0);
  },
};
