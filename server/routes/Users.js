const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res) => {
	const userData = {
		login: req.body.login,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		title: req.body.title,
		department: req.body.department,
		assignTasks: [],
		closedTasks: [],
		reopenedTasks: 0,
		resolvedTasks: 0,
		completedOnTime: 0,
		completedNotOnTime: 0,
		createdAt: new Date,
	};

	User.findOne({
		login: req.body.login,
	})
		.then(user => {
			if (!user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					userData.password = hash;
					User.create(userData)
						.then(user => {
							res.status(200).send({ status: user.login + ' registered' });
						})
						.catch(err => {
							res.status(400).send('error:' + err);
						})
				})
			} else {
				res.status(400).json({ error: 'User already exists' });
			}
		})
		.catch(err => {
			res.status(400).send('error:' + err);
		});
});

users.post('/login', (req, res) => {
	User.findOne({
		login: req.body.login
	})
		.then(user => {
			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					const payload = {
						_id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
					};

					const token = jwt.sign(payload, process.env.SECRET_KEY, {
						expiresIn: '1 day',
					});

					res.status(200).send(token);
				} else {
					res.status(400).json({ error: "User does not exist" });
				}
			} else {
				res.status(400).json({ error: "User does not exist" });
			}
		})
		.catch(err => {
			res.send("error:" + err);
		});
});

users.get('/all-users', (req, res) => {
	User.find().then(data => {
		if (data) {
			res.status(200).send(data)
		} else {
			res.status(400).json({ error: "Users does not exist" });
		}
	})
	.catch(err => {
	  res.status(400).send("error:" + err);
	});
});

users.delete('/all-users/:id', (req, res) => {
	User.findById(req.params.id).remove()
		.then(data => res.status(200).send(data))
		.catch(err => {
			res.status(400).send("error:" + err);
		});
});

users.put('/all-users/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body)
	  .then(data => {
			if (data) {
				res.status(200).send(data);
			} else {
				res.status(400).json({ error: "User does not exist" });
			};
		})
		.catch(err => {
			res.status(400).send("error:" + err);
		});
});

module.exports = users;
