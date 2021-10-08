const Sequelize = require("sequelize");
// const comment = require("./comment");
// const hashtag = require("./hashtag");
// const image = require("./image");
// const post = require("./post");
// const user = require("./user");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db.Comment = comment(sequelize, Sequelize);
// db.Hashtag = hashtag(sequelize, Sequelize);
// db.Image = image(sequelize, Sequelize);
// db.Post = post(sequelize, Sequelize);
// db.User = user(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
