const router = require("express").Router();
const Passport = require("passport");
3;

router.get("/", (req, res, next) => {
	const user = req.user;
	const messages = req.flash("error");
	res.render("index", {
		title: "homepage",
		user,
		messages: messages,
		hasErrors: messages.length > 0,
	});
});

router.get("/private_page", async (req, res, next) => {
	// Check if user is login
	const user = req.user;
	// If not than this will print information in console OR re-direct somewhere
	if (!user) {
		res.redirect("/login");
	} else if (user) {
		// If find User than it will go for first variable or second variable
		const firstUser = user.firstUser;
		const secondUser = user.secondUser;
		if (firstUser) {
			return res.render("firstuser", {
				title: "page alloted to first user",
			});
		} else if (secondUser) {
			return res.render("seconduser", {
				title: "page alloted to second user",
			});
		}
	}
});

router.get("/login", (req, res, next) => {
	const messages = req.flash("error");
	res.render("login", {
		title: "login page",
		messages: messages,
		hasErrors: messages.length > 0,
	});
});

router.post(
	"/register_first_user",
	Passport.authenticate("first-user", {
		successRedirect: "/",
		failureRedirect: "/",
		failureFlash: true,
	})
);

router.post(
	"/register_second_user",
	Passport.authenticate("second-user", {
		successRedirect: "/",
		failureRedirect: "/",
		failureFlash: true,
	})
);

router.post(
	"/login",
	Passport.authenticate("login", {
		successRedirect: "/private_page",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

router.get("/logout", (req, res, next) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;

function firstUser(req, res, next) {
	if (req.isAuthenticated() && req.user.firstUser == true) {
		return next();
	} else {
		res.redirect("/");
	}
}

function notFirstUser(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	if (req.user.firstUser == false) {
		return res.redirect("/");
	}
	res.redirect("/");
}
