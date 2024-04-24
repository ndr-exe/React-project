import React from 'react'

import ThemeButton from './ThemeButton'
import { getThemeInfo } from '../funcs'

export default async function ThemeBtnWrapper({dict}) {
    const theme = await getThemeInfo()
  return (
    <ThemeButton theme={theme} dict={dict}/>

  )
}
