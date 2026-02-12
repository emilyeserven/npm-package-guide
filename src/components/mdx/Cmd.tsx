export function Cmd({ npm, pnpm }: { npm: string; pnpm?: string }) {
  return (
    <>
      <span className="cmd cmd-npm">{npm}</span>
      <span className="cmd cmd-pnpm">{pnpm ?? npm.replace(/\bnpm\b/g, 'pnpm')}</span>
    </>
  )
}
