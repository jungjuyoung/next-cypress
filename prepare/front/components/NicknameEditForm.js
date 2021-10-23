import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";
import { Form, Input } from "antd";

const NickNameEditForm = () => {
  const { me } = useSelector(state => state.user);
  console.log(`me: ${JSON.stringify(me)}`);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const dispatch = useDispatch();

  const style = useMemo(() => ({
    marginBottom: "2px",
    border: "2px solid #d9d9d9",
    padding: "10px",
  }));

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form style={style}>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmitForm}
        onChange={onChangeNickname}
      />
    </Form>
  );
};

export default NickNameEditForm;
