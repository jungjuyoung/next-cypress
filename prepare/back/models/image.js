module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      // Mysql에는 소문자 복수 images 테이블 생성
      src: {
        type: DataTypes.STRING(200),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Image.associate = db => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
