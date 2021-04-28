// const { MongoClient } = require('mongodb');
const { MongoClient, ObjectId } = require("mongodb");
const pageNumber = 6;

function myDB() {
  const myDB = {};
  const dbName = "fileStorage";
  const uri = process.env.DB_URL
  let client;

  myDB.queryUser = async (query = {}) => {
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const userCol = db.collection("users");
      let file = await userCol.findOne(query);
      return file;
    } finally {
      client.close();
    }
  };

  myDB.storeUser = async (user) => {
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const userCol = db.collection("users");
      let result = await userCol.insertOne(user);
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.queryTeacher = async (query) => {
    try {
      // console.log("ddd")
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const userCol = db.collection("teachers");
      // query._id = ObjectId(query._id)
      console.log("id");
      console.log(query);
      let file = await userCol.findOne(query);
      return file;
    } finally {
      client.close();
    }
  };

  myDB.queryTeachers = async (page = 0, query = {}) => {
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const userCol = db.collection("teachers");
      let file = await userCol
        .find(query)
        .project({ comments: 0 })
        .skip(page > 0 ? (page - 1) * pageNumber : 0)
        .limit(pageNumber)
        .toArray();
      let count = await userCol.count(query);
      return { result: file, count: count };
    } finally {
      client.close();
    }
  };

  myDB.storeTeacher = async (teacher) => {
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const userCol = db.collection("teachers");
      let result = await userCol.insertOne(teacher);
      let item = await userCol.findOne(teacher);
      return item;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.addComment = async (id, data) => {
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const userCol = db.collection("teachers");
      let target = await userCol.findOne({ _id: ObjectId(id) });
      console.log("target");
      console.log(target);
      target.commentCount = target.commentCount + 1;
      target.sumScores = target.sumScores + parseFloat(data.grade);
      target.comments.push(data);
      console.log("after")
      console.log(target);
      let result = await userCol.replaceOne(
        { _id: ObjectId(id) },
        target
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      client.close();
    }
  };

  return myDB;
}

module.exports = myDB();
