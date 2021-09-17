import React from "react";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NickNameEditForm from "../components/nicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const followList = [
    { nickname: "모니" },
    { nickname: "태태" },
    { nickname: "쿠기" },
  ];
  const followingList = [
    { nickname: "찌미" },
    { nickname: "만두" },
    { nickname: "모찌" },
  ];
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내프로필 | nodebird</title>
      </Head>

      <AppLayout>
        <NickNameEditForm />
        <FollowList header="팔로워 리스트" data={followList} />
        <FollowList header="팔로잉 리스트" data={followingList} />
      </AppLayout>
    </>
  );
};

export default Profile;
