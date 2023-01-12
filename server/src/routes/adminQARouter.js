const { Router } = require("express");
const adminQARouter = Router();
const { Producto, Pregunta } = require("../db");
const { validateAdmin } = require("./middleware/validateAdmin");
const { validateAccessToken } = require("./middleware/validateAccessToken");
const { errorHandler } = require("./middleware/error.middleware");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT, EMAIL_USER } = process.env;

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
    const pregunta = await Pregunta.findOne({
      where: { id: questionId },
      include: Producto,
      raw: true,
    });

    let productName = pregunta["producto.nombre"];
    let email = pregunta.email;

    if (!pregunta.email) {
      return res
        .status(200)
        .json({ error: false, msg: "La respuesta fue enviada" });
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ error: true, msg: "Email inválido" });
    }
    let transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "suprasportspf@outlook.com",
      to: email,
      subject: "Respuesta a tu pregunta",
      text: `La tienda respondió tu pregunta sobre el producto ${productName}:
        ${answer}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(400).json({ error: true, msg: error.message });
      } else {
        return res
          .status(200)
          .json(`El correo ${email} fue notificado de la respuesta`);
      }
    });
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
