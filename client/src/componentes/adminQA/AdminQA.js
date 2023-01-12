import { useState, useEffect } from "react";
import UnansweredQuestion from "./UnansweredQuestion";
import classes from "./AdminQA.module.css";
import { useValidateUser } from "../../customHooks/validate-user";

const AdminQA = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState({});
  const [hasRemainingQuestions, setHasRemainingQuestions] = useState("");

  const { isAdmin, accessToken } = useValidateUser();

  useEffect(() => {
    console.log(accessToken);
    
    accessToken &&
      fetch("https://suprasports.up.railway.app/adminQA", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error) return setError(data);

          let remaining = false;
          data.forEach((q) => {
            if (!q.answer) remaining = true;
          });
          remaining && setHasRemainingQuestions(true);
          !remaining && setHasRemainingQuestions(false);

          setQuestions(data);
        });
  }, [accessToken]);

  return (
    <>
      {isAdmin ? (
        <div className={classes["admin-questions"]}>
          {hasRemainingQuestions ? <h1>Preguntas por responder:</h1> : ""}{" "}
          <div className={classes["question-cards"]}>
            {hasRemainingQuestions
              ? questions.map((q) => (
                  <UnansweredQuestion
                    key={q.questionId}
                    question={q}
                    accessToken={accessToken}
                  />
                ))
              : ""}
          </div>
          {!hasRemainingQuestions ? (
            <p className={classes["no-questions"]}>
              De momento, no hay preguntas.
            </p>
          ) : (
            ""
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
