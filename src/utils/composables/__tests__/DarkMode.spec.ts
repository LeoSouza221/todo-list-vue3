import { describe, it, expect } from 'vitest'
import { useDarkMode } from "../darkMode"


describe('Dark mode test', () => {
  it("tests dark mode on and off", () => {
    const { isDarkMode, applyDarkMode } = useDarkMode()

    expect(isDarkMode.value).toBe(false)

    applyDarkMode()

    expect(isDarkMode.value).toBe(true)
  })
})