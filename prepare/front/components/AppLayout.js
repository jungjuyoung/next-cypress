import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/Link'
import { Menu, Input, Row, Col } from 'antd';

import UserProfile from './UserProfile'
import LoginForm from './LoginForm'

import styled from 'styled-components'

const {Search} = Input

const SearchWrapper = styled(Search)`
 vertical-align:middle;
`

const AppLayout = ({children}) => {
	const [isLogin, setIsLogin] = useState(false)

  return (
    <div>
			<Menu mode="horizontal">
				<Menu.Item key="nodebird">
					<Link href="/"><a>노드버드</a></Link>
				</Menu.Item>
				<Menu.Item key="profile">
					<Link href="/profile"><a>프로필</a></Link>
				</Menu.Item>
				<Menu.Item>
				 <SearchWrapper placeholder="search title"
				  enterButton="Search"
				 />
				</Menu.Item>
				<Menu.Item key="signup">
					<Link href="/signup"><a>회원가입</a></Link>
				</Menu.Item>
		</Menu>
		<Row gutter={8}>
		  <Col xs={24} md={6}>
			  {isLogin? <UserProfile/> : <LoginForm setIsLogin={setIsLogin}/>}
			</Col>
		  <Col xs={24} md={12}>
			  {children}
			</Col>
		  <Col xs={24} md={6}>
			  <a href="https://github.com/jungjuyoung" target="_blank"
				  rel="noreferrer noopener"
				>
				  Nadia Github
				</a>
			</Col>
		</Row>
    </div>
  )
}
AppLayout.propTypes = {
	children: PropTypes.node.isRequired
}

export default AppLayout