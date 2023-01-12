import { useState } from 'react';
import classes from './UnansweredQuestion.module.css';
import { NavLink } from 'react-router-dom';
import defaultImg from '../../img/SupraLogo.jpg';

const UnansweredQuestion = ({ question, accessToken }) => {
  const [answer, setAnswer] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);
  const [didDelete, setDidDelete] = useState(false);

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://suprasports.up.railway.app/adminQA', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ questionId: question.questionId, answer }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setDidDelete(true);

        /* alert(data); */
      })
      .catch((error) => {
        if (error.error) {
          console.log(error);
          return;
        }
      });
    setDidSubmit(true);
    // alert("Respuesta enviada con éxito! Se reflejará en el detalle del producto al actualizar la página...")
  };

  const handleDelete = () => {
    setDidDelete(true);

    fetch(`https://suprasports.up.railway.app/adminQA/${question.questionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.error) {
          alert(error.message);
          return;
        }
      });
  };

  // {
  //   url: `${apiServerUrl}/api/messages/admin`,
  //   method: "GET",
  //   headers: {
  //     "content-type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // }

  return !question.answer && !didSubmit && !didDelete ? (
    <div className={classes['admin-question']}>
      <div className={classes['nombre-imagen']}>
        <div className={classes['name-delete-container']}>
          <NavLink
            to={`details/${question.productId}`}
            style={{ textDecoration: 'none' }}
          >
            <p className={classes['card-name']}>{question.productName}</p>
          </NavLink>
          <div>
            <button onClick={handleDelete}>X</button>
          </div>
        </div>
        <div className={classes['imgProd']}>
          <img
            src={question.productUrl[0] ? question.productUrl[0] : defaultImg}
            alt="nombre del producto"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label className={classes.label} htmlFor="respuesta">
          {question.question}
        </label>
        <br />
        <input
          autoComplete="off"
          onChange={handleChange}
          placeholder="Ej: Sí, tenemos stock!"
          name="respuesta"
          type="text"
          value={answer}
        />
        <button disabled={!answer.length} type="submit">
          Enviar respuesta
        </button>
      </form>
    </div>
  ) : (
    ''
  );
};

export default UnansweredQuestion;
