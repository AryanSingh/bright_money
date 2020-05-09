import React from 'react';

function StudentCard(props) {
  const student = props.student;
  return <h1>Hello, {student.name}</h1>;
}

export default StudentCard;
