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

const getInterview = (state, id) => {
  const interview = {
    id
  };
  if (
    typeof state.interviewers === 'object' &&
    Object.keys(state.interviewers).length > 0
  ) {
    if (
      typeof state.appointments === 'object' &&
      Object.keys(state.appointments).length > 0
    ) {
      interview.interviewer = state.interviewers[id];
      if (state.appointments[id.toString()]) {
        interview.student = state.appointments[id.toString()].interview.student;
      }
    }
  }

  return interview;
};

module.exports = { getAppointmentsForDay, getInterview };
