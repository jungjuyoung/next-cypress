import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/Link'
import { Menu } from 'antd';

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
				<Menu.Item key="signup">
					<Link href="/signup"><a>회원가입</a></Link>
				</Menu.Item>
		</Menu>
		{children}
    </div>
  )
}
AppLayout.propTypes = {
	children: PropTypes.node.isRequired
}

export default AppLayout