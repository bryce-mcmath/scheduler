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

      const days = [...state.days];
      const day = days.filter(x => x.name === state.day)[0];

      // Only update spots when creating or deleting
      console.log('spots before is: ', day.spots);
      if (updating) {
        interview ? day.spots-- : day.spots++;
      }
      console.log('spots is: ', day.spots);

      return {
        ...state,
        days: [...days],
        appointments: { ...appointments }
      };

    default:
      throw new Error(`Tried to reduce with unsupported action type: ${type}`);
  }
}
