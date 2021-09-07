import React from 'react'
import Head from 'next/head'

import AppLayout from '../components/AppLayout'
import NickNameEditForm from '../components/NickNameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {
  const followList = [{nickName: '모니'},{nickName:'태태'},{nickName:'코지'}]
  const followingList = [{nickName: '쿠키'},{nickName:'빠삐코'},{nickname:'모찌떡'}]
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>내프로필 | nodebird</title>
      </Head>

    <AppLayout>
    <NicknameEditForm/>
    <FollowList header="팔로워 리스트" data={followList}/>
    <FollowList header="팔로잉 리스트" data={followingList}/>
    </AppLayout>
    </>
  )
}

export default Profile