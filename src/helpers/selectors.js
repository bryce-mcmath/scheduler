/**
 *
 * @param {Object} state
 * @param {String} day - eg. 'Monday'
 */
const getAppointmentsForDay = ({ days, appointments }, day) => {
  if (!Array.isArray(days) || typeof appointments !== 'object') {
    throw new Error('Argument error in getAppointmentsForDay selector');
  }

  if (days.length < 1 || Object.keys(appointments).length < 1) {
    return [];
  }

  const dayObj = days.filter(x => x.name === day)[0];
  if (!dayObj) {
    return [];
  }

  const apptKeys = dayObj.appointments;

  const foundAppts = [];
  for (const key of apptKeys) {
    if (appointments[key.toString()]) {
      foundAppts.push(appointments[key.toString()]);
    }
  }

  return foundAppts;
};

/**
 * Return interview object formatted the way Appointment component wants them
 * @param {Object} state
 * @param {Object, null} interview - interview object with student string property and interviewer number property. Null if no interview
 */
const getInterview = ({ interviewers, appointments }, interview) => {
  if (typeof interviewers !== 'object' || typeof appointments !== 'object') {
    throw new Error('Argument error in getInterview selector');
  }

  if (!interview) return null;

  const newInterview = {
    student: interview.student
  };

  if (Object.keys(interviewers).length > 0) {
    if (Object.keys(appointments).length > 0) {
      newInterview.interviewer = interviewers[interview.interviewer];
      return newInterview;
    }
  }

  return null;
};

/**
 *
 * @param {Object} state
 * @param {String} day - eg. 'Monday'
 */
const getInterviewersForDay = (state, day) => {
  const days = state.days;
  if (!Array.isArray(days) || days.length < 1) {
    return [];
  }

  const interviewers = state.interviewers;
  if (
    typeof interviewers !== 'object' ||
    Object.keys(interviewers).length < 1
  ) {
    return [];
  }

  const dayObj = days.filter(x => x.name === day)[0];
  if (!dayObj) {
    return [];
  }
  const interviewerKeys = dayObj.interviewers;

  const foundInterviewers = [];
  for (const key of interviewerKeys) {
    if (interviewers[key.toString()]) {
      foundInterviewers.push(interviewers[key.toString()]);
    }
  }

  return foundInterviewers;
};

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
