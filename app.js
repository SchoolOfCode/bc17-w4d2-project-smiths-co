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
  res.send('This API works!');
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
  // Create a variable to capture path parameter from the GET request URL
  // Validate that we received a userid path parameter in the first place.
  const userid = req.params.userid;

  if (!userid) {
    res.status(400);
    res.send('Invalid user id provided.');
  }

  try {
    // Create blank array so we can shove multiple objects into the array
    let responseData = [];

    /* Array method that iterates through the array and for each userid that matches within the json file, 
    we push that object into our blank array aka responseData array */
    activities.forEach(function (arrayElement) {
      if (arrayElement.id === userid) {
        responseData.push(arrayElement);
      }
    });

    /* If no activities were found for the user (i.e., blank responseData array),
    then send a meaningful response back to the client. */
    if (responseData.length === 0) {
      res.status(406);
      res.send('No activities found for the provided user id.');
    }

    // Try/catch error test
    // throw "THIS IS A 500 ERROR SIMULATION";

    // Send the successful response status code 200 and the data inside the activities array
    res.status(200);
    res.json(responseData);
  } catch (error) {
    res.status(500);
    res.send(`An issue occurred handling your request. ${error}`);
  }
});

// Activities POST request handler
// Epic 2 - User Story 2: Implement functionality to POST a new activity.
app.post('/activities', (req, res) => {
  try {
    // Take post request from client req.body...
    let newActivity = req.body;

    // Update activities array with new activity object (spread operator) + push.
    // Implement `date.now` and UUID.
    newActivity = {
      id: uuidv4(),
      activity_submitted: Date.now(),
      ...newActivity,
    };

    // Add a new object to our current in memory activities array.
    activities.push(newActivity);
    console.log(activities);

    // Try/catch error test
    // throw "THIS IS A 500 ERROR SIMULATION";

    // Send the successful response status code 200 and a meaningful plain-text response back to the client.
    res.status(200);
    res.send(
      `Your new activity "${newActivity.activity_type}" for ${newActivity.activity_duration} minutes has been added to the database with a new id of ${newActivity.id}.`
    );
  } catch (error) {
    res.status(500);
    res.send(`An issue occurred handling your request. ${error}`);
  }
});

/*
Express server start
*/
// Spin up the express server
app.listen(port),
  () => {
    console.log(`Example app listening on port ${port}`);
  };
