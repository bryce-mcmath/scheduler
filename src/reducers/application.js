export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

export default function reducer(state, { type, payload }) {
  switch (type) {
    case SET_APPLICATION_DATA:
      return { ...payload };
    case SET_DAY:
      return { ...state, day: payload };
    case SET_INTERVIEW:
      const { id, interview, updating } = payload;

      const appointment = {
        ...state.appointments[id.toString()],
        interview
      };

      const appointments = {
        ...state.appointments,
        [id.toString()]: appointment
      };

      let days = [...state.days];

      if (updating && !interview) {
        days = state.days.map(day =>
          day.appointments.includes(id) ? { ...day, spots: day.spots + 1 } : day
        );
      } else if (updating) {
        days = state.days.map(day =>
          day.appointments.includes(id) ? { ...day, spots: day.spots - 1 } : day
        );
      }

      return {
        ...state,
        days: [...days],
        appointments: { ...appointments }
      };

    default:
      throw new Error(`Tried to reduce with unsupported action type: ${type}`);
  }
}
