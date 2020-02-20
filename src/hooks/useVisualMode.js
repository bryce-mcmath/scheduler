import { useState } from 'react';

const useVisualMode = initial => {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = (m, replace) => {
    setMode(m);
    if (!replace) {
      setHistory([...history, m]);
    } else {
      const cp = [...history];
      setHistory([...cp.slice(0, cp.length)]);
    }
  };

  const back = () => {
    if (history.length < 2) {
      setMode(mode);
    } else {
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
