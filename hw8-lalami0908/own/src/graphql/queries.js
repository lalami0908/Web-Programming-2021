import { gql } from 'apollo-boost'

export const ALL_MSG_QUERY = gql`
  query {
    showAllMsg{
      name
      body
      from
    }
  }
`

export const NAME_MSG_QUERY = gql`
  query getMsgByName($name: String!){
    getMsgByName(name: $name)
    {
      name
      body
      from
    }
  }
`
