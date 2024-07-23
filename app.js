import express from 'express';
import helmet from 'helmet';

const app = express();
const port = 3000;

//Middleware
app.use(helmet());

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port),
  () => {
    console.log(`Example app listening on port ${port}`);
  };
