import React from 'react'
import Head from 'next/head'

import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {
  const followList = [{nickname: '제로초'},{nickname:'삥'},{nickname:'홀리'}]
  const followingList = [{nickname: '제로초'},{nickname:'빠삐용'},{nickname:'오피셜'}]
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