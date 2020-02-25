import React from 'react';
import PropTypes from 'prop-types';
import InterviewerListItem from 'components/InterviewerListItem';
import './InterviewerList.scss';

export default function InterviewerList({ interviewers, value, onChange }) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((inter, key) => {
          return (
            <InterviewerListItem
              name={inter.name}
              selected={inter.id === value}
              setInterviewer={e => onChange(inter.id)}
              avatar={inter.avatar}
              key={key}
            />
          );
        })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
