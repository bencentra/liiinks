async function fetchJSON(url = './example.json') {
    const response = await fetch(url)
    return response.json()
}

const stylesheet = `
    html {
        background-color: $backgroundColor;
        font-family: $fontFamily;
    }
    .link {
        color: $fontColor;
        border-color: $borderColor;
        border-width: $borderWidth;
        border-style: solid;
        border-radius: $borderRadius;
    }
`

function setTheme(theme) {
    const styleTag = document.createElement('style')
    // TODO: Handle missing values
    const css = stylesheet
        .replace('$fontFamily', theme.font.family)
        .replace('$fontColor', theme.font.color)
        .replace('$backgroundColor', theme.background.color)
        .replace('$borderColor', theme.border.color)
        .replace('$borderWidth', theme.border.width)
        .replace('$borderRadius', theme.border.radius)
    styleTag.appendChild(document.createTextNode(css))
    document.head.appendChild(styleTag)
}

function renderLinks(links) {
    const linksDiv = document.querySelector('#links')
    linksDiv.innerHTML = ''
    links.forEach(link => {
        const linkDiv = document.createElement('div')
        linkDiv.classList.add('link')

        const title = document.createElement('div')
        title.classList.add('title')
        title.appendChild(document.createTextNode(link.title))

        const description = document.createElement('div')
        description.classList.add('description')
        description.appendChild(document.createTextNode(link.description))

        linkDiv.appendChild(title)
        linkDiv.appendChild(description)

        const anchor = document.createElement('a')
        anchor.classList.add('link-anchor')
        anchor.setAttribute('href', link.href)
        anchor.appendChild(linkDiv)

        linksDiv.appendChild(anchor)
    })
}

async function main() {
    const json = await fetchJSON()
    setTheme(json.theme)
    renderLinks(json.links)
}

main()
