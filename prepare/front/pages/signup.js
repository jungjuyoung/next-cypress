import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Head from "next/head";

import { SIGN_UP_REQUEST } from "../reducers/user";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";

const TextInput = ({ value }) => {
  return <h1>{value}</h1>;
};

TextInput.propTypes = {
  value: PropTypes.string,
};

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, singUpDoneReset, signUpError, me } =
    useSelector(state => state.user);

  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  useEffect(() => {
    console.log(`사인업 페이지 singUpDone:${signUpDone},
    singUpDoneReset: ${singUpDoneReset}`);

    if (singUpDoneReset) {
      // alert(
      //   `사인업 페이지에서 index로 넘어감 singUpDoneReset: ${singUpDoneReset}`
      // );
      Router.replace("/");
    }
  }, [singUpDoneReset]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  useEffect(() => {
    if (me) {
      alert("로그인했으니 메인페이지로 이동합니다.");
      Router.replace("/");
    }
  }, [me && me.id]);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
      },
    });
  }, [email, password, nickname, passwordCheck, term]);

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback(e => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit} style={{ padding: 10 }}>
        <TextInput value="이것은 테스트인풋 컴포넌트의 텍스트이다" />
        <div>
          <label htmlFor="user-email">아이디</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input
            name="user-nick"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && (
            <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
