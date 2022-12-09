const server = require('./src/app.js');
const { conn } = require('./src/db.js');


// conn.sync({ force: true }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });


server.listen(3001, async() => {
  await conn.sync({alter:true}),
  console.log('%s listening ' ); 
})