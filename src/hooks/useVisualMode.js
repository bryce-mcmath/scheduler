import { useState } from 'react';

const useVisualMode = initial => {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = (m, replace = false) => {
    setMode(m);
    if (!replace) {
      setHistory(prev => [...prev, m]);
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
