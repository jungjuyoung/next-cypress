import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Button } from "antd";
import { logoutRequestAction, LOG_OUT_REQUEST } from "../reducers/user";

const UserProfile = () => {
  const { me, logOutLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(
      logoutRequestAction({
        type: LOG_OUT_REQUEST,
      })
    );
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹 <br /> 0
        </div>,
        <div key="follower">
          팔로워 <br /> 0
        </div>,
        <div key="following">
          팔로윙 <br /> 0
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickName}
      />
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
