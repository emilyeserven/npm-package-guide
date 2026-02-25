# Security Awareness Guide

## Audience & Purpose

Developers (especially frontend/full-stack) who need practical security awareness. Each topic explains a vulnerability, shows how it's exploited, and provides copy-pasteable prevention code.

## Interactive Components

### `SecurityTopicDetail`

- **Location:** `src/components/mdx/security/SecurityTopicDetail.tsx`
- **Props:** `topicId: string` (matches `SECURITY_TOPICS[].id`)
- **Renders:** Threat badge, "What is it?" overview, "How it works" cards, real-world scenario callout, prevention steps with code blocks + copy buttons
- **Data source:** `SECURITY_TOPICS` from `src/data/securityData.ts`

## Guide-Specific Conventions

- Each MDX page is minimal: `<SectionTitle>` + `<SecurityTopicDetail topicId="..." />`
- All content lives in `SECURITY_TOPICS` data array, not inline in MDX
- Topic IDs match the page ID suffix (e.g., page `sec-xss` uses `topicId="xss"`)
- Threat levels: `critical`, `high`, `medium` with corresponding color schemes
- The `realWorld` field contains HTML (rendered via `dangerouslySetInnerHTML`) for inline code formatting
- Prevention code blocks have copy-to-clipboard functionality built in
- Some link IDs are shared with other guides (e.g., `owasp-top-ten`, `owasp-xss-prevention`, `snyk-open-source`); security-specific links use the `sec-` prefix
