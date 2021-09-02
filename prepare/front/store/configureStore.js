import React from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper } from 'next-redux-wrapper'

import reducer from '../reducers'

const configureStore = () => {
  const middleware =[]
  const enhancer = process.env.NODE_ENV === 'production' 
  ? compose(applyMiddleware(...middleware))  
  : composeWithDevTools(applyMiddleware(...middleware))
  const store = createStore(reducer, enhancer)
  return store
}

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development' // 디버그 모드 
})

export default wrapper
