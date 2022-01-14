import React, { useEffect, useRef, useCallback,  useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Button, Input, message, Tag } from 'antd'
import { client } from '../../index.js';


import {
  NAME_MSG_QUERY,
  CREATE_MSG_MUTATION, 
  DELETE_MSG_MUTATION,
  MSG_SUBSCRIPTION
} from '../../graphql'


export default function ChatRoom(props) {
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const bodyRef = useRef(null)

  // for graphql
  const { loading, error, data, subscribeToMore } = useQuery(NAME_MSG_QUERY, {variables: { name: props.whoIam },})

  const [addMsg] = useMutation(CREATE_MSG_MUTATION)
  const [deleteMsg] = useMutation(DELETE_MSG_MUTATION)


  const handleMsgSent = useCallback(
    (e) => {
      // e.preventDefault()

      if (!username || !body) return

      addMsg({
        variables: {
          name: username,
          body: body,
          from: props.whoIam
        }
      })

      setUsername('')
      setBody('')
    },
    [addMsg, username, body]
  )

  const handleMsgDeleted = useCallback(
    (e) => {
      // e.preventDefault()
      if (!props.whoIam) return

      alert(`remove messages about ${ props.whoIam }`)
      deleteMsg({
        variables: {
          name: props.whoIam,
        }
      })
    },
    [deleteMsg]
  )

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }
  useEffect(() => {
    subscribeToMore({
      document: MSG_SUBSCRIPTION,
      variables: { name: props.whoIam },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        if (subscriptionData.data.message.mutation === "CREATED"){
          const newMsg = subscriptionData.data.message.data
          displayStatus({
            type: 'success',
            msg: 'Message sent!'
          })
          return {
            ...prev,
            getMsgByName: [...prev.getMsgByName, newMsg['0']]
          }
        }
        else if (subscriptionData.data.message.mutation === "DELETED"){
          const delMsg = subscriptionData.data.message.data
          displayStatus({
            type: 'danger',
            msg: 'Message removed!'
          })
          return {
            ...prev,
            getMsgByName: prev.getMsgByName.filter(msg => msg.id !== delMsg['0'].id)
          }
        } 
      }
    })
  }, [subscribeToMore])



  const chatRoom = (
    <div>
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={(e) => handleMsgDeleted(e)}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
      {

        (loading || data === undefined) ? (

          <p style={{ color: '#ccc' }}>
            Loading...
          </p>
        ) : (
          data.getMsgByName.length === 0 ? (
            <p style={{ color: '#ccc' }}>
              No messages...
            </p>  
          ) : (
            data.getMsgByName.map(({ name, body, from }, i) => (
              <p className="App-message" key={i}>
                <Tag color="green">{from}</Tag> -><Tag color="blue">{name}</Tag> {body}
              </p>)))
        )
          
      }
      </div>
      <Input
        placeholder="To..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          handleMsgSent()
        }}
      ></Input.Search>
    </div>
  )

  return <div className="App"> { chatRoom }</div>
}


