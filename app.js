// Epic 1 - User Story 1 Set up basic Express application.

import express from 'express';
import helmet from 'helmet';
import activities from './activities.json' with {type: "json"}

const app = express();
const port = 3000;

// Middleware
// Epic 1 - User Story 2 Add basic security standards using Helmet

app.use(helmet());

// Request handlers
// Root/default request handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Activities request handler
//Epic 2 - User Story 1: Implement functionality to get all activities for a particular user

app.get('/activities/:userid', (req, res) => {
// create variable to capture dynamic values from the URL path
  const userid = req.params.userid

// create blank array so we can shove multiple objects into the array
let responseData = []

/* array method that iterates through the array and for each userid that matches within the json file, 
we push that object into our blank array aka responseData array */
activities.forEach(function (arrayElement) {
    if (arrayElement.id === userid) {
      responseData.push(arrayElement)
    }
  })

  // to send the response status code 200 and the response data of the array
  res.status(200);
  res.json(responseData);
});

// spin up the express server
app.listen(port),
  () => {
    console.log(`Example app listening on port ${port}`);
  };

