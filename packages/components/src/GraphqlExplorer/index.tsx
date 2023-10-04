import './style.css'

import { buildClientSchema, type GraphQLSchema, type IntrospectionQuery } from 'graphql'
import { useMemo } from 'react'

import Breadcrumb from './Breadcrumb'

export interface GraphqlExplorerProps {
  /**
   * The GraphQL schema
   */
  schema?: GraphQLSchema | IntrospectionQuery
  /**
   * The query
   */
  query?: string
  /**
   * Is loading schema or query
   */
  loading?: boolean
  /**
   * Editor content changed event
   */
  onChange?: (query: string) => void
  /**
   * Refresh event
   */
  onRefresh?: () => void
}

const GraphqlExplorer = (props: GraphqlExplorerProps) => {
  const schema = useMemo(() => {
    if (!props.schema) {
      return null
    }
    if ('__schema' in props.schema) {
      return buildClientSchema(props.schema)
    }
    return props.schema
  }, [props.schema])
  const query = useMemo(() => {
    if (schema) {
      return schema.getQueryType()
    }
    return null
  }, [schema])
  const mutation = useMemo(() => {
    if (schema) {
      return schema.getMutationType()
    }
    return null
  }, [schema])
  const subscription = useMemo(() => {
    if (schema) {
      return schema.getSubscriptionType()
    }
    return null
  }, [schema])
  console.log(schema)
  window.schema = schema
  return (
    <div className="graphql-explorer">
      <Breadcrumb />
      {schema && <>{}</>}
    </div>
  )
}

export default GraphqlExplorer
