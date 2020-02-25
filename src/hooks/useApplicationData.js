import { useEffect, useReducer } from 'react';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from '../reducers/application';
import axios from 'axios';

const useApplicationData = initial => {
  const [state, dispatch] = useReducer(reducer, initial);

  const setDay = day => dispatch({ type: SET_DAY, payload: day });

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() =>
      dispatch({
        type: SET_INTERVIEW,
        payload: { id, interview, updating: true }
      })
    );
  };

  const cancelInterview = id => {
    console.log('id is: ', id);
    return axios.delete(`/api/appointments/${id}`).then(() =>
      dispatch({
        type: SET_INTERVIEW,
        payload: { id, interview: null, updating: true }
      })
    );
  };

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onmessage = msg => {
      const msgObj = JSON.parse(msg.data);
      const { type, id, interview } = msgObj;
      if (type === 'SET_INTERVIEW') {
        dispatch({
          type,
          payload: { id, interview: interview || null, updating: false }
        });
      }
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
