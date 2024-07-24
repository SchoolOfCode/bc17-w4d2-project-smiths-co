import express from 'express';
import helmet from 'helmet';
import activities from './activities.json' with {type: "json"}

const app = express();
const port = 3000;

// Middleware
app.use(helmet());

// Request handlers
// Root/default request handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Activities request handler
app.get('/activities/:userid', (req, res) => {
const userid = req.params.userid

let responseData = []
 
activities.forEach(function (arrayElement) {
    if (arrayElement.id === userid) {
      responseData.push(arrayElement)
    }
  })
  res.json(responseData);
});

app.listen(port),
  () => {
    console.log(`Example app listening on port ${port}`);
  };

