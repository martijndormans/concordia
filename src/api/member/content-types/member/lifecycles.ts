export default {
  afterCreate(event) {
    const todayYear = new Date().getUTCFullYear();
    const { DifferentAssociationYears, StartMembership, EndMembership } =
      event.params.data;

    if (EndMembership) {
      return;
    }

    const startYear = new Date(StartMembership).getFullYear();

    event.params.data.JubileeYears =
      todayYear - startYear + (Number(DifferentAssociationYears) || 0);
  },
};
