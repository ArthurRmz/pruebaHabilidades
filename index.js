const express       = require('express')
const app           = express();
const path          = require('path')
const env           = require("dotenv");
env.config();
const session       = require('express-session');
const PORT          = process.env.PORT || 5000;
const bodyParser 	  = require("body-parser");
const cors          = require("cors");
const routes        = require("./src/routes/routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

routes(app);
  
app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`)
});
