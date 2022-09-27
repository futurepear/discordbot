const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://pyrus:" + process.env.DB_PASS + "@Cluster0.mn7jo.mongodb.net/discord?retryWrites=true&w=majority";

const createUser = require('./userschema');

const Database = {
  connected: false,
  client: new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  }),
  _events: {
    "connection": () => {}
  },
  on: function(id, callback){
    this._events[id] = callback;
  },
  emit: function(id, arg){
   if(id in this._events){
     this._events[id](arg);
   } 
  },
  find: function(query){
    if(!this.connected) return {};
    
  },
  getUser: async function(id){
    return await this.collection('discord', 'users').findOne({id: id})
  },
  findUser: async function(query){
    return await this.collection('discord', 'users').findOne(query);
  },
  createUser: async function(id){
    this.collection('discord', 'users').insertOne(createUser(id));
  },
  db: function(db){
    return this.client.db(db);
  },
  collection: function(db, collection){
    return this.client.db(db).collection(collection);
  }
}

Database.client.connect()
  .then(() => {
    Database.connected = true;
    Database.emit("connection", true);
  })
  .catch((err) => {
    Database.emit("connection", err);
  });

module.exports = Database;