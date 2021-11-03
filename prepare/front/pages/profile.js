import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import Router from "next/router";
import { END } from "redux-saga";
import axios from "axios";
import useSWR from "swr";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";

// fetcher util로 빼서 swr하는곳에서 불러서 사용해도 됌.
const fetcher = url =>
  axios.get(url, { withCredentials: true }).then(result => result.data);

const Profile = () => {
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:5000/user/followings?limit=${followingsLimit}`,
    fetcher
  );
  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:5000/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    if (!me?.id) {
      Router.push("/");
    }
  }, [me?.id]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit(prev => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit(prev => prev + 3);
  }, []);

  if (!me) {
    alert("로그인을 하지 않았습니다...");
    return "내 정보 로딩중...";
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return "팔로잉/팔로워 로딩 중 에러가 발생했습니다.";
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingError && !followingsData}
        />
        <FollowList
          header="팔로워"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followerError && !followersData}
        />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  console.log("getServerSideProps start");
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log("getServerSideProps end");
  await context.store.sagaTask.toPromise();
});

export default Profile;
