import { gql } from 'apollo-boost'

export const CREATE_MSG_MUTATION = gql`
  mutation createMsg(
  $name: String!
  $body: String!
  $from: String!){
    createMsg(data:{
      name: $name,
      body: $body,
      from: $from
    }){
      name
      body
      from
    }
  }
`


export const DELETE_MSG_MUTATION = gql`
  mutation deleteMsg($name: String!) {
    deleteMsg(name: $name)
  }
`
