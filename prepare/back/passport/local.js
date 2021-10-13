const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // DB에 사용자 이메일이 있는지 찾아보기
          const user = await User.findOne({
            where: { email },
          });
          // DB에 이메일이 존재하지 않으면
          if (!user) {
            // 클라이언트 실패 400
            //done안에 인자
            // 1. 첫번째 인자 서버에러, (null)
            // 2. 두번째 인자 성공, (false)
            // 3. 세번째 인자 클라이언트 에러 ({reason: 존재하지 않는 이메일 입니다!})

            // 클라이언트 실패 400
            return done(null, false, {
              reason: "존재하지 않는 이메일입니다!",
            });
          }
          // 이메일이 존재하면 비밀번호 비교
          // 우리가 입력한 password와 DB에 저장된 password가 같은지 비교
          const result = await bcrypt.compare(password, user.password);
          // result에 입력한 password와 DB에 저장된 password가 같은게 있다면 done으로 내려줌
          if (result) {
            // 200 ok 성공
            return done(null, user);
          }
          // 우리가 입력한 password와 DB에 저장된 password가 같지 않으면 done으로 에러 내려줌
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          // 500에러
          console.log(error);
          return done(error);
        }
      }
    )
  );
};
