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
  //console.log(req.params.userid);

  // TODO: Frank is going to finish this!
  activities.forEach(function (arrayElement) {
    if (arrayElement.id === "55554444") {
      console.log(arrayElement);
    }
  })

  //const userActivity = activities

  res.json(activities);
});

app.listen(port),
  () => {
    console.log(`Example app listening on port ${port}`);
  };

