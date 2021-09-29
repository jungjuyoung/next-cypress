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
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Post.associate = db => {};
  return Post;
};