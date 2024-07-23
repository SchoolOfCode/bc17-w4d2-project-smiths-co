import express from 'express';
import helmet from 'helmet';
import activities from './activities.json' with {type: "json"}

const app = express();
const port = 3000;

//Middleware
app.use(helmet());

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/activities', (req, res) => {
  res.send('');
});

app.listen(port),
  () => {
    console.log(`Example app listening on port ${port}`);
  };

