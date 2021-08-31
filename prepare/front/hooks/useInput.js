import React, {useState, useCallback} from 'react'

export default (initialState = null) => {
  const [value, setValue] = useState(initialState);
  const handler = useCallback(
    (e) => {
      setValue(e.target.value)
    },[])

  return [value, handler]
}
