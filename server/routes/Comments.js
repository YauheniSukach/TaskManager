const express = require("express");
const comments = express.Router();
const cors = require("cors");
const Comment = require("../models/Comment");

comments.use(cors());

comments.post('/submit', (req, res) => {
	const commentData = {
		message: req.body.message,
		account: req.body.account,
		taskId: req.body.taskId,
		createdAt: new Date(),
	};

	Comment.create(commentData)
		.then(() => {
			res.status(200).send("Comment submited");
		})
		.catch(err => {
			res.status(400).send('error:' + err);
		});
});

comments.get('/all-comments', (req, res) => {
	Comment.find().then(data => {
		if (data) {
			res.status(200).send(data)
		} else {
			res.status(400).json({ error: "Comments does not exist" });
		}
	})
	.catch(err => {
	  res.status(400).send("error:" + err);
	});
});

comments.delete('/all-comments/:id', (req, res) => {
	Comment.findById(req.params.id).remove()
		.then(data => res.status(200).send(data))
		.catch(err => {
			res.status(400).send("error:" + err);
		});
});

comments.put('/all-comments/:id', (req, res) => {
	Comment.findByIdAndUpdate(req.params.id, req.body)
	  .then(data => {
			if (data) {
				res.status(200).send(data);
			} else {
				res.status(400).json({ error: "Comment does not exist" });
			};
		})
		.catch(err => {
			res.status(400).send("error:" + err);
		});
});

module.exports = comments;
