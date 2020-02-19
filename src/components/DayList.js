import React from 'react';
import DayListItem from 'components/DayListItem';
import './DayList.scss';

export default function DayList({ days, day, setDay }) {
  return (
    <ul>
      {days.map((d, key) => {
        return (
          <DayListItem
            name={d.name}
            spots={d.spots}
            selected={d.name === day}
            setDay={setDay(d.name)}
            key={key}
          />
        );
      })}
    </ul>
  );
}
