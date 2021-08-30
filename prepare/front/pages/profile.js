import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'

const Profile = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>내프로필 | nodebird</title>
      </Head>

    <AppLayout>프로필 페이지</AppLayout>
    </>
  )
}

export default Profile