const { Router } = require("express");
const adminQARouter = Router();
const { Producto, Pregunta } = require("../db");
const { validateAdmin } = require("./middleware/validateAdmin");
const { validateAccessToken } = require("./middleware/validateAccessToken");
const { errorHandler } = require("./middleware/error.middleware");

adminQARouter.get("/", validateAccessToken, validateAdmin, async (req, res) => {
  try {
    const allQuestions = await Pregunta.findAll({
      raw: true,
      include: [{ model: Producto }],
    });

    let questionsArr = allQuestions.map((q) => ({
      questionId: q.id,
      question: q.question,
      answer: q.answer,
      productId: q["producto.id"],
      productName: q["producto.nombre"],
      productUrl: q["producto.URL"],
    }));

    res.status(200).json(questionsArr);

    return;
  } catch (error) {
    res.status(400).json({ error: true, msg: error.message });
  }
});

adminQARouter.put("/", validateAccessToken, validateAdmin, async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    Pregunta.findByPk(questionId).then((question) => {
      question.answer = answer;
      question.save();
    });

    res.status(200).json("La respuesta fue enviada");
    return;
  } catch (error) {
    res.status(400).json({ error: true, msg: error.message });
  }
});

adminQARouter.delete(
  "/:id",
  validateAccessToken,
  validateAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      Pregunta.findByPk(id).then((pregunta) => {
        if (!pregunta) {
          throw new Error("Pregunta inexistente");
        }
        pregunta.destroy();
      });
      res.status(200).json("La pregunta fue eliminada");
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }
);

adminQARouter.use(errorHandler);

module.exports = adminQARouter;
