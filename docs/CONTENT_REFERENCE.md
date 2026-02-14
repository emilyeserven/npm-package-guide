# Content Authoring Reference

Detailed conventions for MDX content, link registry, glossary, and cross-page navigation. See root `CLAUDE.md` for project overview and essential patterns.

## MDX Frontmatter

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | `string` | Unique page identifier (kebab-case). Must match the guide's `*_GUIDE_SECTIONS` array. |
| `title` | Yes | `string` | Display title with emoji suffix (e.g., `"Build & Output ⚙️"`). |
| `guide` | No | `string` | Guide ID. Validated against known IDs at build time. |
| `group` | No | `string` | Section grouping label. |
| `linkRefs` | No | `array` | `{id, note?}` objects referencing link registry entries. Unknown IDs throw errors. |
| `usedFootnotes` | No | `number[]` | Footnote numbers in the MDX body via `<FnRef n={N} />`. Controls footnote vs. "Further Reading" placement. |

## Link Registry

External URLs managed centrally in `src/data/linkRegistry/`. Single source of truth for URL metadata (URL, label, source, description, tags). Split by guide; barrel `index.ts` re-exports merged array + lookup maps.

### Adding a link

1. Add a `RegistryLink` entry to `src/data/linkRegistry/<guideId>Links.ts` with a `{source}-{topic}` slug ID.
2. Reference from MDX frontmatter via `linkRefs`:
   ```yaml
   linkRefs:
     - id: "your-registry-id"
     - id: "another-id"
       note: "Page-specific context"
   usedFootnotes: [1, 2]
   ```
3. Add `resourceCategory` and `tags`/`desc` for External Resources page visibility.
4. For glossary terms, use `linkId` in `GlossaryTerm` to reference entries.

### Registry connections

- **MDX frontmatter** → `linkRefs` resolved to `SectionLink[]` by `src/content/registry.ts`
- **External Resources page** → entries with `resourceCategory` appear as curated resources
- **Glossary** → `GlossaryTerm.linkId` references a registry entry
- **`overallResources.ts`** → derives `ResourceGroup[]` from entries with `resourceCategory`

## Glossary

Searchable table in `src/components/GlossaryPage.tsx`. Data in `src/data/glossaryTerms/`, split by guide.

### GlossaryTerm fields

| Field | Required | Description |
|-------|----------|-------------|
| `term` | Yes | Display name. Title-case for proper nouns, lowercase for general concepts. |
| `definition` | Yes | One to two sentences for a backend engineer. Use `<code>` for inline code. |
| `linkId` | Yes | ID of a `RegistryLink` in `src/data/linkRegistry/`. Must exist. |
| `sectionId` | No | ID of a content page where this concept is taught. |

### Adding a term

1. Ensure the `RegistryLink` exists in `src/data/linkRegistry/`.
2. Add the term to the appropriate guide file in `src/data/glossaryTerms/`.
3. Set `sectionId` if the term is explained on a guide page.
4. Run `pnpm validate` to catch broken references.

For editorial guidance on what qualifies as a glossary term, see the `/add-guide` skill.

## Footnotes & References

Content pages support two kinds of bottom-of-page links via `linkRefs` in MDX frontmatter:

- **Footnotes** — numbered references tied to content via `<FnRef n={N} />` markers. `data-fn` attributes enable tooltip behavior in `FootnoteTooltip.tsx`.
- **Further Reading** — supplemental links not referenced by `<FnRef>` in the body.

Both should include `note` descriptions in `linkRefs` when possible.

## Cross-Page Links

`NavLink` and `NavPill` (`src/components/mdx/NavLink.tsx`) create inline cross-page links. Self-closing form auto-resolves to the page's full title:

```mdx
<NavLink to="build" />                      {/* → "Build & Output ⚙️" */}
<NavLink to="build">bundlers</NavLink>      {/* custom text */}
```

## Navigation Item Formatting

Every MDX `title` must include an emoji suffix. The sidebar (`SidebarItem` in `Sidebar.tsx`) and command menu (`PageItem` in `CommandMenu.tsx`) parse titles with `/^(.+)\s+([\u0080-\u{10FFFF}]+)$/u` to split text from trailing emoji. Text and icon must be in separate `<span>` elements with `justify-between`.
