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
      // **) RetweetId (PostId 에서 RetweetId 로 바뀜)
      // **) belongsTo를 설정 할 경우 아래처럼 테이블에 컬럼 PostId가 생성
      // PostId 에서 { as: "Retweet" }로 아래처럼 RetweetId로 바뀜
      // RetweetId
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User); //post.addUser, post.getUer, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // post.addHashtags
    db.Post.hasMany(db.Comment); // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // post.addImages, post.getImages
    // through는 테이블 이름을 바꿔줌. through가 중간테이블 이름을 Like 테이블로 설정.
    // post.addLikers, post.removeLikers
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    // **) 관계형에서  belongsTo는 테이블에 PostId를 생성
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // post.addRetweet
  };
  return Post;
};
