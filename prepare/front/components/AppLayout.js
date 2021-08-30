import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/Link'
import { Menu, Input, Row, Col } from 'antd';

const {Search} = Input
const AppLayout = ({children}) => {
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
				 <Search placeholder="search title"
				  enterButton="Search"
					style={{verticalAlign:'middle'}}
				 />
				</Menu.Item>
				<Menu.Item key="signup">
					<Link href="/signup"><a>회원가입</a></Link>
				</Menu.Item>
		</Menu>
		<Row gutter={8}>
		  <Col xs={24} md={6}>
			  왼쪽메뉴
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