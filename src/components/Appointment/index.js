import React, { useEffect } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';

import './styles.scss';

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview
}) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const ERROR_SAVING = 'ERROR_SAVING';
  const ERROR_DELETING = 'ERROR_DELETING';

  const { transition, back, mode } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd = () => {
    transition(CREATE);
  };

  const onEdit = () => {
    transition(EDIT);
  };

  const onSave = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, newInterview)
      .then(res => {
        transition(SHOW);
      })
      .catch(err => {
        transition(ERROR_SAVING, true);
      });
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  const onConfirmDelete = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(res => {
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR_DELETING, true);
      });
  };

  useEffect(() => {
    if (mode === EMPTY && interview) transition(SHOW);
    if (mode === SHOW && !interview) transition(EMPTY);
  }, [interview, mode, transition]);

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onClick={onAdd} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={onSave} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={onSave}
          interviewer={interview.interviewer.id}
          name={interview.student}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this interview?"
          onConfirm={onConfirmDelete}
          onCancel={back}
        />
      )}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVING && <Error message="Error saving" onClose={back} />}
      {mode === ERROR_DELETING && (
        <Error message="Error deleting" onClose={back} />
      )}
    </article>
  );
}
