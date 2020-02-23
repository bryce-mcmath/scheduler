import { useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

function reducer(state, { type, payload }) {
  switch (type) {
    case SET_APPLICATION_DATA:
      return { ...payload };
    case SET_DAY:
      return { ...state, day: payload };
    case SET_INTERVIEW:
      return {
        ...state,
        days: payload.days,
        appointments: payload.appointments
      };

    default:
      throw new Error(`Tried to reduce with unsupported action type: ${type}`);
  }
}

const useApplicationData = initial => {
  const [state, dispatch] = useReducer(reducer, initial);

  const setDay = day => dispatch({ type: SET_DAY, payload: day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id.toString()],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id.toString()]: appointment
    };

    const days = [...state.days];
    const day = days.filter(x => x.name === state.day)[0];
    day.spots--;

    dispatch({ type: SET_INTERVIEW, payload: { days, appointments } });
    return axios.put(`/api/appointments/${id}`, { interview });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id.toString()],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id.toString()]: appointment
    };

    const days = [...state.days];
    const day = days.filter(x => x.name === state.day)[0];
    day.spots++;

    dispatch({ type: SET_INTERVIEW, payload: { days, appointments } });
    return axios.delete(`/api/appointments/${id}`);
  };

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = function(e) {
      webSocket.send('ping');
    };

    webSocket.onmessage = function(msg) {
      const msgObj = JSON.parse(msg.data);

      console.log(msgObj);

      dispatch({ type: msgObj.type });
    };

    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        payload: {
          day: state.day,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
