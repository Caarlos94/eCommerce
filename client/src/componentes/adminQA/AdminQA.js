import { useState, useEffect } from 'react';
import UnansweredQuestion from './UnansweredQuestion';
import classes from './AdminQA.module.css';

// De momento no se encuentra renderizado en ninguna parte. Importar a un componente renderizado para probarlo

const AdminQA = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/adminQA')
      .then((data) => data.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <div className={classes['admin-questions']}>
      <h1>Preguntas por responder:</h1>
      {questions.length
        ? questions.map((q) => (
            <UnansweredQuestion key={q.questionId} question={q} />
          ))
        : ''}
    </div>
  );
};

export default AdminQA;
