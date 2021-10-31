import React from 'react'
import { Theme, useStylesheet } from './useStylesheet'

//#region types
export interface JsonResponse {
  links: Link[]
  theme: Theme
}

export interface Link {
  href: string
  title: string
  description?: string
}
//#endregion

async function fetchJSON(url = './example.json') {
  const response = await fetch(url)
  return response.json()
}

export const Links = () => {
  const [json, setJson] = React.useState({} as JsonResponse)
  const { theme, links } = json
  useStylesheet(theme)

  React.useEffect(() => {
    fetchJSON().then(setJson)
  }, [])

  if (!links) {
    return <>Loading...</>
  }

  return (
    <>
      {links.map(link => (
        <a key={link.href} href={link.href} className='no-underline'>
          <div className='link mb-4 p-4 text-center'>
            <div className='text-2xl mb-2'>{link.title}</div>
            <div>{link.description}</div>
          </div>
        </a>
      ))}
    </>
  )
}