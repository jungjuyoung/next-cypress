import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NickNameEditForm from "../components/nicknameEditForm";
import FollowList from "../components/FollowList";
import Router from "next/router";

const Profile = () => {
  const { me } = useSelector(state => state.user);
  console.log(`me: ${JSON.stringify(me)}`);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    alert("로그인을 하지 않았습니다.");
    return null;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내프로필 | nodebird</title>
      </Head>

      <AppLayout>
        <NickNameEditForm />
        <FollowList header="팔로워 리스트" data={me.Followers} />
        <FollowList header="팔로잉 리스트" data={me.Followings} />
      </AppLayout>
    </>
  );
};

export default Profile;
