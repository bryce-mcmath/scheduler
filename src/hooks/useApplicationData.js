import { useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer, {
	SET_DAY,
	SET_APPLICATION_DATA,
	SET_INTERVIEW,
	SET_ID
} from '../reducers/application';

const useApplicationData = (initial) => {
	const [state, dispatch] = useReducer(reducer, initial);

	const setDay = (day) => dispatch({ type: SET_DAY, payload: day });

	const bookInterview = (id, interview, create) => {
		return axios
			.put(`/api/appointments/${id}`, { interview, clientId: state.clientId })
			.then(() =>
				create
					? dispatch({
							type: SET_INTERVIEW,
							payload: {
								id,
								interview,
								updating: true,
								clientId: state.clientId
							}
					  })
					: dispatch({
							type: SET_INTERVIEW,
							payload: {
								id,
								interview,
								updating: false,
								clientId: state.clientId
							}
					  })
			);
	};

	const cancelInterview = (id) => {
		return axios
			.delete(`/api/appointments/${id}`, { data: { clientId: state.clientId } })
			.then(() =>
				dispatch({
					type: SET_INTERVIEW,
					payload: { id, interview: null, updating: true }
				})
			);
	};

	useEffect(() => {
		const webSocket = new WebSocket(
			process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8001'
		);

		// Keep socket alive on Heroku
		setInterval(() => {
			webSocket.send('ping');
		}, 25000);

		webSocket.onmessage = (msg) => {
			const data = JSON.parse(msg.data);
			const { type, id, clientId, interview } = data;

			if (type === 'SET_ID') {
				dispatch({ type: SET_ID, payload: { clientId } });
			} else if (type === 'SET_INTERVIEW') {
				dispatch({
					type,
					payload: {
						id,
						interview: interview || null,
						updating: true,
						clientId
					}
				});
			}
		};

		Promise.all([
			axios.get(`/api/days`),
			axios.get(`/api/appointments`),
			axios.get(`/api/interviewers`)
		]).then((all) => {
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
