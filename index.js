const express       = require('express')
const app           = express();
const path          = require('path')
const env           = require("dotenv");
env.config();
const PORT          = process.env.PORT || 5000;
const DATABASE_URL  = process.env.DATABASE_URL;
const { Pool }      = require('pg');

const session = require('express-session');
  app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
  if (req.session && req.session.user === "jose" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

const pool  = new Pool({
  connectionString: DATABASE_URL
  /*ssl: {
    rejectUnauthorized: false
  }*/
});
console.log(DATABASE_URL);

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/login', function (req, res) {
    if (!req.query.username || !req.query.password) {
      res.send('login failed');
    } else if(req.query.username === "jose" || req.query.password === "hunter2") {
      req.session.user = "jose";
      req.session.admin = true;
      res.send("login success!");
    }
  })
  .get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
