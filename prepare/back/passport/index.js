const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  // 로그인 할 때 serializeUser user.id만 저장
  passport.serializeUser((user, done) => {
    // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
    done(null, user.id);
  });

  // 로그인 한 후 라우터 접근할 때마다 deserializeUser로 user.id를 이용해서 사용자 데이터 복구
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
