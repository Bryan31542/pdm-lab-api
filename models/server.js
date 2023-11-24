const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

    this.connectingDB();

    this.middleware();

    this.routes();
  }

  async connectingDB() {
    await dbConnection();
  }

  middleware() {
    // CORS
    this.app.use(cors());

    this.app.use(morgan('dev'));

    // Parse and read body
    this.app.use(express.json());
    // Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usersPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
