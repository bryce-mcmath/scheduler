const getAppointmentsForDay = (state, day) => {
  const days = state.days;
  if (!Array.isArray(days) || days.length < 1) {
    return [];
  }

  const appts = state.appointments;
  if (typeof appts !== 'object' || Object.keys(appts).length < 1) {
    return [];
  }

  const dayObj = days.filter(x => x.name === day)[0];
  if (!dayObj) {
    return [];
  }
  const apptKeys = dayObj.appointments;

  const foundAppts = [];
  for (const key of apptKeys) {
    if (appts[key.toString()]) {
      foundAppts.push(appts[key.toString()]);
    }
  }

  return foundAppts;
};

module.exports = { getAppointmentsForDay };
