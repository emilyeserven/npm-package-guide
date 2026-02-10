export function cmd(npmCmd: string, pnpmCmd?: string): string {
  return `<span class="cmd cmd-npm">${npmCmd}</span><span class="cmd cmd-pnpm">${pnpmCmd || npmCmd.replace(/\bnpm\b/g, 'pnpm')}</span>`
}
