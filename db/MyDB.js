// const { MongoClient } = require('mongodb');
const { MongoClient, ObjectId } = require("mongodb");
const pageNumber = 6;

function myDB() {
  const myDB = {};
  const dbName = "fileStorage";
  const uri =
    "mongodb+srv://wzy:123456wzy@cluster0.jroge.mongodb.net/myFirstDatabase?retryWrites=true";
  //process.env.DB_URL
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
      console.log("ddd")
      client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      const userCol = db.collection("teachers");
      query._id = ObjectId(query._id)
      console.log("id")
      console.log(query)
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
      console.log("filter");
      console.log(count);
      console.log(file);
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
      return result;
    } catch (error) {
      return error;
    } finally {
      client.close();
    }
  };

  myDB.createFile = async (file) => {
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(dbName);
      const filesCol = db.collection("files");
      console.log("Collection ready, insert ", file);
      const res = await filesCol.insertOne(file);
      console.log("Inserted", res);

      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.getFiles = async (query) => {
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(dbName);
      const filesCol = db.collection("files");
      console.log("Collection ready, querying with ", query);
      const files = await filesCol.find(query).toArray();
      console.log("Got files", files);

      return files;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.deleteFile = async (file) => {
    let client;
    try {
      client = new MongoClient(uri, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(dbName);
      const filesCol = db.collection("files");
      console.log("Collection ready, deleting ", file);
      const files = await filesCol.deleteOne({ _id: ObjectId(file._id) });
      console.log("Got files", files);

      return files;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  return myDB;
}

module.exports = myDB();
