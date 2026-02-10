export function fnRef(n: number): string {
  return `<sup class="fn-ref" data-fn="${n}" title="See footnote ${n}">${n}</sup>`
}
