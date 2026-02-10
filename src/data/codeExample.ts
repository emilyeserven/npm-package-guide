export const codeExample = `<span class="comment">// A well-configured package.json for an npm package</span>
{
  <span class="key">"name"</span>: <span class="string">"my-cool-package"</span>,

  <span class="comment">// "type": "module" means this package uses modern</span>
  <span class="comment">// import/export syntax by default</span>
  <span class="key">"type"</span>: <span class="string">"module"</span>,

  <span class="comment">// Fallback entry points for older tools</span>
  <span class="key">"main"</span>: <span class="string">"./dist/index.cjs"</span>,
  <span class="key">"module"</span>: <span class="string">"./dist/index.js"</span>,
  <span class="key">"types"</span>: <span class="string">"./dist/index.d.ts"</span>,

  <span class="comment">// Modern entry point config — this is what</span>
  <span class="comment">// bundlers and Node.js actually read</span>
  <span class="key">"exports"</span>: {
    <span class="key">"."</span>: {
      <span class="key">"import"</span>: <span class="string">"./dist/index.js"</span>,
      <span class="key">"require"</span>: <span class="string">"./dist/index.cjs"</span>,
      <span class="key">"types"</span>: <span class="string">"./dist/index.d.ts"</span>
    },
    <span class="comment">// Subpath export — consumers can do:</span>
    <span class="comment">// import { helper } from "my-cool-package/utils"</span>
    <span class="key">"./utils"</span>: {
      <span class="key">"import"</span>: <span class="string">"./dist/utils.js"</span>,
      <span class="key">"types"</span>: <span class="string">"./dist/utils.d.ts"</span>
    }
  },

  <span class="comment">// ONLY these files/folders get published to npm</span>
  <span class="key">"files"</span>: [<span class="string">"dist"</span>],

  <span class="comment">// Consumer must have React installed already</span>
  <span class="key">"peerDependencies"</span>: {
    <span class="key">"react"</span>: <span class="string">"^18.0.0 || ^19.0.0"</span>
  }
}`;
