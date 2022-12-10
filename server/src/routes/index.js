const { Router } = require('express');
const { getCategories } = require('./functions')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRouter = require('./productRouter.js');
const userRouter = require('./productRouter.js');


const router = Router();

router.use('/products', productRouter);
router.use('/user', userRouter);

router.get("/category", async (req, res) => {
  try {
    let categoria = await getCategories()
    res.status(200).json(categoria)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;