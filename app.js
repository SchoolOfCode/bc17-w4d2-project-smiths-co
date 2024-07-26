/*
Node module imports
*/
// Epic 1 - User Story 1: Set up basic Express application
import express from 'express';
import helmet from 'helmet';
import activities from './activities.json' with {type: "json"}

// install uuid for unique userId numbers 
import { v4 as uuidv4 } from 'uuid';

/*
Express application setup
*/
// Using express to create an application
const app = express();

// Save port in a variable
const port = 3000;

/*
Middleware
*/
// Epic 1 - User Story 2: Add basic security standards using Helmet
app.use(helmet());
app.use(express.json());

/*
Request handlers
*/
// Root/default request handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Activities GET request handler - BASIC VERSION - RETURN ALL ACTIVITIES IN OUR JSON FILE
// Epic 2 - User Story 1: Implement functionality to get all activities
app.get('/activities', (req, res) => {
  // Send the response status code 200 and the data inside the activities array
  res.status(200);
  res.json(activities);
});

// Activities GET request handler - ADVANCED VERSION - RETURN ACTIVITIES FOR A PARTICULAR USER
// Epic 2 - User Story 1: Implement functionality to get all activities for a particular user
app.get('/activities/:userid', (req, res) => {
  // Create a variable to capture path paramater from the GET request URL
  const userid = req.params.userid;

  // Create blank array so we can shove multiple objects into the array
  let responseData = [];

  /* Array method that iterates through the array and for each userid that matches within the json file, 
  we push that object into our blank array aka responseData array */
  activities.forEach(function (arrayElement) {
    if (arrayElement.id === userid) {
      responseData.push(arrayElement);
    }
  });

  // Send the response status code 200 and the data inside the activities array
  res.status(200);
  res.json(responseData);
});

// Activities POST request handler
// Epic 2 - User Story 2: Implement functionality to POST a new activity.
app.post('/activities', (req, res) => {
  
  // Take post request from client `req.body...`
  let newActivity = req.body;

  // Update activities array with new activity object (spread operator) + push.
  // Implement `date.now` and UUID.
    newActivity = {
    id:uuidv4(),
    activity_submitted:Date.now(),
    ...newActivity        
    }

  // Add a new object to our current in memory activities array.
  activities.push(newActivity);
  console.log(activities);
  res.send('POST processed')
});

/*
Express server start
*/
// Spin up the express server
app.listen(port),
  () => {
    console.log(`Example app listening on port ${port}`);
  };
