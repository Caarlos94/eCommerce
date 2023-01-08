import { useState, useEffect } from 'react';
import QAAnsweredQuestion from './QAAnsweredQuestion';
import classes from './QAAnsweredQuestions.module.css';
import Modal from '../Modal/Modal';

const QAAnsweredQuestions = ({ productId }) => {
  const [questions, setQuestions] = useState([]);

  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [active]);

  useEffect(() => {
    let isSubscribed = true;

    fetch(`http://localhost:3001/customerQA/${productId}`)
      .then((data) => data.json())
      .then((data) => {
        if (isSubscribed) setQuestions(data);
      });

    return () => (isSubscribed = false);
  }, [productId]);

  console.log(questions);

  return (
    <div className={classes['questions-container']}>
      <div className={classes['titulo-preguntas']}>Últimas preguntas: </div>
      {!questions.length ? (
        <p>Aún no se han hecho preguntas sobre este producto</p>
      ) : (
        <div>
          <div className={classes['qContainer']}>
            <p className={classes['question']}>{questions[0].question}</p>
            <p>{questions[0].answer}</p>
          </div>
          <div className={classes['qContainer']}>
            <p className={classes['question']}>{questions[1].question}</p>
            <p>{questions[1].answer}</p>
          </div>
          <button className={classes['btn-QA']} onClick={toggle}>
            Ver todas las preguntas
          </button>
        </div>
      )}

      <Modal active={active} toggle={toggle}>
        <h1 style={{ fontSize: '30px' }}>Preguntas y respuestas</h1>
        <hr />
        {questions?.map((q) => (
          <QAAnsweredQuestion key={q.questionId} questionData={q} />
        ))}
      </Modal>
      {/* {!questions.length ? (
        <p>Aún no se han hecho preguntas sobre este producto</p>
      ) : (
        ''
      )} */}
    </div>
  );
};

export default QAAnsweredQuestions;
