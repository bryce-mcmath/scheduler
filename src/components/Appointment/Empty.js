import React from 'react';

export default function Empty({ onClick }) {
  return (
    <main className="appointment__add">
      <img
        onClick={onClick}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
