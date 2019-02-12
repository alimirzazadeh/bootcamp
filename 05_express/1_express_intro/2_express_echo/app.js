// Let's bring express into this file!
let express = require("express");

// Let's create a new express app
let app = express();

// Example route:
// This creates an Express route at
app.get("/", function(request, response) {
  response.send("Express is running!");
});

/* TODO
 * Create a route that listens to /hello and takes one query parameter
 * name and responds with 'Hello there NAME!'
 * You can access the query parameter 'name' via request.query.name.
 */
// YOUR CODE HERE
app.get("/hello", function(request, response) {
    response.send(`Hello there ${request.query.name}!`);
});

// Start the server listening on port 3000.
app.listen(3000);
