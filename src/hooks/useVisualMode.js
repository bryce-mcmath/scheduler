import { useState } from 'react';

const useVisualMode = (initial) => {
	const [history, setHistory] = useState([initial]);
	const [mode, setMode] = useState(initial);

	const transition = (m, replace = false) => {
		setMode(m);
		// If someone uses back(), go back two modes
		if (!replace) {
			setHistory((prev) => [...prev, m]);
		}
	};

	const back = () => {
		// If there is no history, stay in current mode
		if (history.length < 2) {
			setMode(mode);
		} else {
			// Remove last mode, set to previous mode without mutating state
			const cp = [...history];
			cp.pop();
			const prev = cp[cp.length - 1];
			setHistory([...cp]);
			setMode(prev);
		}
	};

	return { mode, transition, back };
};

export default useVisualMode;
