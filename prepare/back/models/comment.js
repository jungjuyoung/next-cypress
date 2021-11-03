const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        // Mysql에는 소문자 복수 comments로 테이블 생성
        // id가 기본적으로 들어있다.
        content: {
          type: DataTypes.TEXT,
          allowNull: false, // 필수
        },
        // **) belongsTo를 설정 할 경우 아래처럼 테이블에 컬럼 id가 생성
        // UserId: 1
        // PostId: 3
      },
      {
        modelName: "Comment",
        tableName: "comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize, // 연결객체 전달
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    // **) 관계형에서 belongsTo는 테이블 컬럼에 id를 생성
  }
};
