const Passport = require("passport");
const localPassport = require("passport-local").Strategy;
const User = require("../models/User");

Passport.serializeUser((user, done) => {
	done(null, user.id);
});

Passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

// First user stratagy
Passport.use(
	"first-user",
	new localPassport(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		(req, email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, false, {
						message: "Email is not avaliable",
					});
				}
				const newUser = new User({
					email: email,
					password: password,
					firstUser: true,
				});
				newUser.save((err, result) => {
					if (err) {
						return done(err);
					} else {
						return done(null, newUser);
					}
				});
			});
		}
	)
);

// second user stratagy
Passport.use(
	"second-user",
	new localPassport(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		(req, email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, false, {
						message: "Email is not avaliable",
					});
				}
				const newUser = new User({
					email: email,
					password: password,
					secondUser: true,
				});
				newUser.save((err, result) => {
					if (err) {
						return done(err);
					} else {
						return done(null, newUser);
					}
				});
			});
		}
	)
);

// Login Users
Passport.use(
	"login",
	new localPassport(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		(req, email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: "No user found with this email",
					});
				}
				if (user.password != password) {
					return done(null, false, {
						message: "Invalid Password",
					});
				}
				console.log(user);
				return done(null, user);
			});
		}
	)
);
