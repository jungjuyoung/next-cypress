module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Mysql에는 소문자 복수 users로 테이블 생성
      // id가 기본적으로 들어있다.
      // 가장 많이 사용하는 type : STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        uniqe: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글저장
    }
  );
  User.associate = db => {};
  return User;
};
