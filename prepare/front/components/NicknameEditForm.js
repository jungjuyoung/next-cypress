import React, {useMemo} from 'react'
import { Form, Input} from 'antd'

const NickNameEditForm = () => {
  const style = useMemo(() => ({marginBottom: '2px', border:'2px solid #d9d9d9', padding: '10px'}))
  return (
    <Form style={style}>
      <Input.Search addonBefore="닉네임" enterButton="수정"/>
    </Form>
  )
}

export default NickNameEditForm
