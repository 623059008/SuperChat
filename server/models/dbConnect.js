const mongoose = require("mongoose");

const db_config = {
  host: "cluster0.asdhycm.mongodb.net",
  port: 27017,
  username: process.env.MONGOOSE_USERNAME,
  password: process.env.MONGOOSE_PASSWORD,
  database: "myApp",
};

const { username, password, host, database } = db_config;

async function dbConnect() {
  console.log(`[debug] dbConnect: ${username} ${host}`);
  if (!host) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    );
  }
  if (!mongoose || !mongoose.connect) {
    console.log(
      `[LOG] [ERROR] dbConnect: mongoose or mongoose.connect is not imported`
    );
    throw new Error("Mongoose and mongoose connect is not imported");
  }

  const opts = {
    bufferCommands: false,
  };
  // console.log(`[LOG] [DB] dbConnect: start connecting to mongodb`);
  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`,
      opts
    )
    .then((mongoose) => {
      console.log(`[LOG] [DB] dbConnect: connected to mongodb`)
      return mongoose;
    });
}

module.exports = dbConnect;
