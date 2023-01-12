const { Router } = require("express");
const customerQARouter = Router();
const { Producto, Pregunta } = require("../db");

customerQARouter.post("/", async (req, res) => {
  try {
    const { productId, newQuestion, email } = req.body;
    console.log(email);

    const product = await Producto.findByPk(productId);

    // console.log(product.productId);

    if (email) {
      const question = await Pregunta.create({ question: newQuestion, email });
      question.setProducto(product);
    }

    if (!email) {
      const question = await Pregunta.create({ question: newQuestion });
      question.setProducto(product);
    }

    return res.status(200).json("La pregunta fue enviada!");
  } catch (error) {
    res.status(400).json({ error: true, msg: error.message });
  }
});

customerQARouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const questions = await Pregunta.findAll({
      raw: true,
      include: [{ model: Producto, where: { id: productId } }],
    });

    let answeredQuestions = questions.filter((q) => q.answer);

    answeredQuestions = answeredQuestions.map((q) => ({
      questionId: q.id,
      question: q.question,
      answer: q.answer,
    }));

    res.status(200).json(answeredQuestions);
  } catch (error) {
    res.status(400).json({ error: true, msg: error.message });
  }
});

module.exports = customerQARouter;