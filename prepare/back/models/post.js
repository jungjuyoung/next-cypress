module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      // Mysql에는 소문자 복수 posts 테이블 생성
      // id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
      // RetweetId (PostId에서 RetweetId로 바뀜)
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
