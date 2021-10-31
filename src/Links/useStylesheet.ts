import { useEffect } from "react";

//#region types
export interface Theme {
  font?: any
  background?: any
  border?: any
}
//#endregion

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

function setTheme(theme: Theme) {
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

export const useStylesheet = (theme?: Theme) => {
  useEffect(() => {
    if (theme) {
      setTheme(theme)
    }
  }, [theme])
}