const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;
class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    return getDb().collection("users").insertOne(this)
  }

  static findById(userId) {
    return getDb()
    .collection("users")
    .findOne({ _id: new mongodb.ObjectId(userId)})
    // .find({ _id: new mongodb.ObjectId(userId)})
    // .next();
  }
}

module.exports = User;
