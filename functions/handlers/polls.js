/*eslint-disable */

const {db} = require('../util/admin');

exports.getAllPolls = (req, res) => {
  db.collection('polls')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let polls = [];
      data.forEach(doc => {
        polls.push({
          pollId: doc.id,
          body: doc.data().body,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(polls);
    })
    .catch(error => console.log(error));
};

exports.createOnePoll = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({body: 'Event title must not be empty'});
  }
  const newPoll = {
    body: req.body.body,
    userUsername: req.user.username,
    createdAt: new Date().toISOString(),
  };

  db.collection('polls')
    .add(newPoll)
    .then(doc => {
      res.json({message: `document ${doc.id} created SUCCESSFULLY`});
    })
    .catch(error => {
      res.status(500).json({error: 'something went wrong'});
      console.log(error);
    });
};
