import { useReducer } from 'react';

const useApplicationData = initial => {
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
