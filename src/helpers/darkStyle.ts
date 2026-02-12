/** Return light or dark value based on current theme */
export function ds(light: string, dark: string, isDark: boolean): string {
  return isDark ? dark : light
}
