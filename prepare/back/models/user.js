module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Mysql에는 소문자 복수 users로 테이블 생성
      // id가 기본적으로 들어있다.
      // 가장 많이 사용하는 type : STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      // id:{} Mysql에서 id는 기본적으로 넣어준다.
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
      // 두번째 객체는 User 모델에 대한 인코딩
      charset: "utf8",
      collate: "utf8_general_ci", // 한글저장
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
