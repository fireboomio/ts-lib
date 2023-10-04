import type { IntrospectionQuery } from 'graphql'
import { getIntrospectionQuery } from 'graphql'
import { useEffect, useState } from 'react'

import GraphqlExplorer from '@/GraphqlExplorer'

function App() {
  const [schema, setSchema] = useState<IntrospectionQuery>()
  useEffect(() => {
    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: getIntrospectionQuery() })
    })
      .then(res => res.json())
      .then(resp => {
        setSchema(resp.data as IntrospectionQuery)
      })
  }, [])
  return <div>{schema ? <GraphqlExplorer schema={schema} /> : <p>Loading</p>}</div>
}

export default App
