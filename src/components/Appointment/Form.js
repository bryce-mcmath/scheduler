import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form({
  name,
  interviewers,
  interviewer,
  onSave,
  onCancel
}) {
  const [studentName, setName] = useState(name || '');
  const [chosenInterviewer, setInterviewer] = useState(interviewer || null);

  const reset = () => {
    setName('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName && studentName}
            onChange={e => setName(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={chosenInterviewer}
          onChange={id => {
            setInterviewer(id);
          }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => onSave(studentName, chosenInterviewer)}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
