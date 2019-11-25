/*eslint-disable */

const {db, admin} = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const {validateSignupData, validateLoginData} = require('../util/validators');

exports.signup = (req, res) => {
  // this part is to place the new user info into the auth
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };

  const {valid, errors} = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  const noImg = 'no-img.png';

  let token; // initialize a token
  let userId; // initialize a userId

  db.doc(`/users/${newUser.username}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({username: 'This username has already been taken'});
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;

      const userCredentials = {
        // this part is to place the new user info into the db
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId: userId,
      };
      return db
        .doc(`/users/${newUser.username}`)
        .set(userCredentials)
        .then(() => {
          return res.status(201).json({token});
        });
    })
    .catch(error => {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        return res.status(400).json({email: 'Email is already in use'});
      } else {
        return res.status(500).json({error: error.code});
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const {valid, errors} = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token});
    })
    .catch(error => {
      console.error(error);
      if (error.code === 'auth/wrong-password') {
        return res
          .status(403)
          .json({general: 'Wrong credentials, please try again'});
      } else return res.status(500).json({error: error.code});
    });
};

exports.uploadImage = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({headers: req.headers});

  let imageFilename;
  let imageToBeUploaded = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({error: 'Wrong file type submitted'});
    }
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${Math.round(
      Math.random() * 1000000000000,
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = {filepath, mimetype};
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.username}`).update({imageUrl});
      })
      .then(() => {
        return res.json({message: 'Image uploaded successfully'});
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({error: 'something went wrong'});
      });
  });
  busboy.end(req.rawBody);
  //This part is to change the default image, but isn't working..
  // req.pipe(busboy);
};
