import React,{useCallback, useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {Form, Input,Button} from 'antd'
import {addPost} from '../reducers/post'

const PostForm = ({}) => {
  const dispatch = useDispatch()
  const imageInput = useRef()
  const {imagesPaths} = useSelector(state => state.post)
  const [text, setText] = useState('')
  const onChangeText = useCallback(e => {
    setText(e.target.value)
  },[])

  const onSubmit = useCallback(
    () => {
      dispatch(addPost)
    },
    [],
  )
  const onClickImageUpload = useCallback( 
    () => {
    imageInput.current.clcik()
  },[imageInput.current])

  return (
    <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea 
      value={text} 
      onChange={onChangeText} 
      maxLength={140} 
      placeholder="어떤 재밌는 일이 있었나요?" />
      <div>
        <input 
        type="file"
        multiple hidden ref={imageInput}/>
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" 
        style={{float: 'right'}} 
        htmlType="submit">쩩쩩</Button>
      </div>
      <div>
        {imagesPaths.map(v => {
          <div key={v} style={{display: 'inline-block'}}>
            <img src={v} style={{width:'200px'}} alt={v}/>
            <div>
             <Button>제거</Button>
            </div>
          </div>
        })}
      </div>
    </Form>
  )
}

export default PostForm
