import { gql } from 'apollo-boost'

export const MSG_SUBSCRIPTION = gql`
  subscription message($name: String!){
    message(name: $name)
    {
      mutation
      data {
        name
        body
        from
      }
    }
  }
`
