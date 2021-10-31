import React from 'react'
import { Theme, useStylesheet } from './useStylesheet'

//#region types
export interface JsonResponse {
	links: Link[]
	theme: Theme
	version: string
}

export interface Link {
	href: string
	title: string
	description?: string
}
//#endregion

//#region render links by JSON version
const renderLinksVersion1_0_0 = (links: Link[]) =>
	links.map((link) => (
		<a key={link.href} href={link.href} className="no-underline">
			<div className="link mb-4 p-4 text-center">
				<div className="text-2xl mb-2">{link.title}</div>
				<div>{link.description}</div>
			</div>
		</a>
	))

const LinkRenderers = {
	'1.0.0': renderLinksVersion1_0_0,
} as any
//#endregion

async function fetchJSON(url = './liiinks.json') {
	const response = await fetch(url)
	return response.json()
}

export const Links = () => {
	const [json, setJson] = React.useState({} as JsonResponse)
	const { version, theme, links } = json
	useStylesheet(theme)

	React.useEffect(() => {
		fetchJSON().then(setJson)
	}, [])

	if (!links) {
		return <div className="text-center">Loading...</div>
	}

	const render = LinkRenderers[version] as Function

	if (!render) {
		return (
			<div className="text-center text-red-800">
				Error: Invalid JSON version.
			</div>
		)
	}

	return <>{render(links)}</>
}
