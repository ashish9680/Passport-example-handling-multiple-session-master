const express = require("express");
const app = express();
const indexPage = require("./routes/index");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const {
	allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const flash = require("connect-flash");

// Database connection
mongoose.connect(
	"mongodb://Aakash:abc123@ds121599.mlab.com:21599/practice",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Database connected");
		}
	}
);

// requiring passport file
require("./config/passport");

// View engine setup
app.set("view engine", "hbs");
app.engine(
	"hbs",
	expressHbs({
		extname: "hbs",
		defaultView: "default",
		layoutsDir: __dirname + "/views/layouts/",
		partialsDir: __dirname + "/views/partials/",
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
);

// URL Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session storing and initialization
app.use(
	session({
		secret: "session",
		saveUninitialized: true,
		resave: true,
	})
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// flash message for validation
app.use(flash());

// Setting global variable
app.use((req, res, next) => {
	res.locals.login = req.isAuthenticated();
	res.locals.session = req.session;
	next();
});

// index page setup dynamic
app.use("/", indexPage);

// Server settings
app.listen(3000, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Server Started", 3000);
	}
});
