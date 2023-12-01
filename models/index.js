// Import models
const User = require("./User");
const Posts = require("./posts");
const Comments = require("./comments");

// Define relationships

Posts.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Posts, {
  foreignKey: "userID",
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comments, {
  foreignKey: "user_id",
});

Posts.hasMany(Comments, {
  foreignKey: "post_id",
});

Comments.belongsTo(Posts, {
  foreignKey: "post_id",
});

// Export models
module.exports = { User, Posts, Comments };
