const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});




//SESSIONS & COOKIES
//15. to start using sessions, install express-session with 'npm install express-session' *
//16. in server.js file, add const session = require('express-session); *
//17. next, in server.js, create sessionConfig variable, after the variable declarations but just 
// before the server.use() declarations
//18. the sessionConfig is an object that contains the following:
//name, secret, cookie: { maxAge: , secure: t/f, httpOnly: t/f}, resave: t/f, 
// saveUninitialize: t/f
//19. next, pass the session as follows, server.use(session(sessionConfig)) *
//20. in the auth-router.js file, in the login post method, in the if statement add 
// 'req.session.user = user' just before the res.status(200) statement *
//LOGGED IN CHECK MIDDLEWARE
//21. in the auth directory, create logged-in-check-middleware.js file *
//22. build out the code for the logged-in-check-middleware.js file *
//23. import logged-in-check-middleware into users-router.js file * 
//24. add logged-in-check-middleware as middleware to the get method in users-router.js file *
//LOGOUT METHOD
//25. create a get request in the auth-router.js file for logging out with a logout route. *
//26. next, install 'npm install connect-session-knex' *
//27. add a variable that adds connect-session-knex to server.js, like the following *
// const knexSessionStore = require('connect-session-knex')(session) session comes from the variable created from 
// const session = require('express-session');
//28. next, add a store object inside of your sessionConfig object that holds the following
/**
 *   store: new knexSessionStore(
    {
      knex: require("../database/connection.js"), 
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60
    }
  )
 */

//PROJECT 
//1. execute 'npm install' 
//2. execute 'npm install jsonwebtoken'
//3. import jwt at the top of your auth-router.js file, like the following
// const jwt = require('jsonwebtoken');
//4. execute 'npx knex migrate:latest'
//5. create generateToken() function and pass in the user object 
//6. create config directory under api
//7. in config directory, create secrets.js file 
//8. in secrets.js file, create the following: 
/**
 *  module.exports = {
    jwtSecret: process.env.JWT_SECRET ?? 'keep it secret'
}
 * */
//9. in auth-router file, create secrets variable that points to the secret file
//const secrets = require('../config/secrets.js');
//10. inside of the scope of the generateToken() function, add the following
/**
 * const payload = {}
 * const options = {}
 * const token = {} this one has the secret 
 * returns token
 */
//10. in auth-router.js, inside of the login method, in the try and in the first if statement, 
// add const token = generateToken(user);
//11. pass the token into the json message of the 200 status response 
// res.status(200).json({ message: `welcome ${user.username}`, token })
//12. create a .env file at the root
//13. inside of the .env file, add the following:
//JWT_SECRET=keep it secret, this can be anything you deem necessary
//14. in the auth directory, create the restricted-middleware.js file
//15. in the restricted-middleware.js file, add varialbes for the jssonwebtoken and the secret
/**
 * const jwt = require('jsonwebtoken');
    const secret = process.env.JWT_SECRET;
 */
//16. in the restricted-middleware.js file, build out the module.exports function 
// get the token from out of the requests of the header 
// const token = req.headers?.authorization?split(' ')[1] 
//17. next, build out the rest of the method to check for the token with a if statement and complete
// the try/catch
//18. in the auth directory, create the check-role-middleware.js file
//19. the check-role-middleware.js file should have a mathod that has role passed in and inside of the 
// method is returning a fuction that checks the decodedJToken for a "rolename" property
//20. padd check-role-middleware.js into the users-router.js file and add it to the get request 
// the same way you would as middleware. 