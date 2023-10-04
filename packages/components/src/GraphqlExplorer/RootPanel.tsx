import type { GraphQLObjectType } from 'graphql'
import type { Maybe } from 'graphql/jsutils/Maybe'

import Title from './Title'

interface RootPanelProps {
  query: Maybe<GraphQLObjectType<any, any>>
  mutation: Maybe<GraphQLObjectType<any, any>>
  subscription: Maybe<GraphQLObjectType<any, any>>
}

const RootPanel = ({ query, mutation, subscription }: RootPanelProps) => {
  return (
    <div>
      <Title>Root Types</Title>
      {
        query &&
      }
    </div>
  )
}

export default RootPanel
