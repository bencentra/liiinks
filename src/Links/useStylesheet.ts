import { useEffect } from "react";
// @ts-ignore
import get from 'lodash.get'

//#region types
export interface Theme {
  font?: any
  background?: any
  border?: any
}
//#endregion

//#region stylesheet creation
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

interface CSSVar {
  path: string
  default: string
}

const CSSVars = {
  '$backgroundColor': {
    path: 'background.color',
    default: '#ffffff'
  },
  '$fontFamily': {
    path: 'font.family',
    default: 'sans-serif'
  },
  '$fontColor': {
    path: 'font.color',
    default: '#000000'
  },
  '$borderColor': {
    path: 'border.color',
    default: '#000000'
  },
  '$borderWidth': {
    path: 'border.width',
    default: '2px'
  },
  '$borderRadius': {
    path: 'border.radius',
    default: '0px'
  }
} as any

const replaceCSSVar = (
  stylesheet: string, 
  theme: Theme, 
  selector: string, 
  cssvar: CSSVar
) => {
  const value = get(theme, cssvar.path, cssvar.default)
  return value ? stylesheet.replace(selector, value) : stylesheet
}

function setTheme(theme: Theme) {
  const styleTag = document.createElement('style')
  const css = Object.entries(CSSVars).reduce((updatedStylesheet, [selector, cssvar]) => {
    return replaceCSSVar(updatedStylesheet, theme, selector, cssvar as CSSVar)
  }, stylesheet)
  styleTag.appendChild(document.createTextNode(css))
  document.head.appendChild(styleTag)
}
//#endregion

export const useStylesheet = (theme?: Theme) => {
  useEffect(() => {
    if (theme) {
      setTheme(theme)
    }
  }, [theme])
}