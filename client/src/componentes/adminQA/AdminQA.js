import { useState, useEffect } from "react";
import UnansweredQuestion from "./UnansweredQuestion";
import classes from "./AdminQA.module.css";
import { useValidateUser } from "../../customHooks/validate-user";

const AdminQA = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState({});

  const [, /*isAuthenticated*/ isAdmin, accessToken] = useValidateUser();

  useEffect(() => {
    accessToken &&
      fetch("http://localhost:3001/adminQA", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error) return setError(data);

          setQuestions(data);
        });
  }, [accessToken]);

  return (
    <>
      {isAdmin ? (
        <div className={classes["admin-questions"]}>
          {/* <p>Is admin: {isAdmin ? "true" : "false"}</p> */}
          <h1>Preguntas por responder:</h1>
          {questions.length ? (
            questions.map((q) => (
              <UnansweredQuestion
                key={q.questionId}
                question={q}
                accessToken={accessToken}
              />
            ))
          ) : (
            <p>De momento, no hay preguntas.</p>
          )}
        </div>
      ) : (
        ""
      )}
      {error.error ? <p>{error.msg}</p> : ""}
    </>
  );
};

export default AdminQA;
