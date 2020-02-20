import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
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
  const { transition, back, mode } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd = () => {
    transition(CREATE);
  };

  const onCancel = () => {
    back();
  };

  const save = (name, interviewer) => {
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
        console.error('Error in promise returned by bookInterview(): ', err);
      });
  };

  const onConfirmDelete = () => {
    transition(DELETING);
    cancelInterview(id)
      .then(res => {
        transition(EMPTY);
      })
      .catch(err => {
        console.error('Error in promise returned by cancelInterview(): ', err);
      });
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onClick={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={onCancel} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this interview?" onConfirm={onConfirmDelete} onCancel={onCancel} />}
    </article>
  );
}
