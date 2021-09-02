import React,{useCallback} from 'react'
import {useDispatch} from 'react-redux'
import { Card, Avatar, Button } from 'antd'
import { logoutAction } from '../reducers'

const UserProfile = () => {
  const dispatch = useDispatch()
  const onLogout = useCallback(
    () => {
      dispatch(logoutAction())
    },[])
  return (
    <Card
     actions={[
       <div key="twit">짹짹 <br/> 0</div>,
       <div key="follower">팔로워 <br/> 0</div>,
       <div key="following">팔로윙 <br/> 0</div>
    ]}
    >
    <Card.Meta
      avatar={<Avatar />}
      title="Nadia"
    />
    <Button onClick={onLogout}>로그아웃</Button> 
    </Card>
  )
}

export default UserProfile