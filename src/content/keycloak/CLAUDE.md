# Keycloak for Frontend Engineers — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers integrating Keycloak into React SPAs. Assumes basic auth knowledge (tokens, OAuth concepts). Teaches Keycloak's domain model (realms, clients, roles), the Authorization Code + PKCE flow, local Docker setup, React integration with react-oidc-context and keycloak-js, JWT token handling, and production deployment patterns.

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `KcConceptAccordion` | *(none)* | Expandable accordion for Keycloak domain model concepts (Realms, Clients, Roles, etc.) |
| `KcAuthFlow` | *(none)* | Step-by-step Authorization Code + PKCE flow timeline |
| `KcProductionChecklist` | *(none)* | Production readiness steps timeline (HTTPS, prod mode, DB, etc.) |
| `KcQuiz` | *(none)* | Five-question knowledge check using QuizBase |

## Guide-Specific Conventions

- **Sequential learning path:** Pages designed to be read in order — foundations first, then integration, then production.
- **Code-heavy React page:** The React Integration page uses multiple `CodeAccordion` blocks showing both react-oidc-context and keycloak-js approaches side by side.
- **Data in single file:** All guide data lives in `src/data/keycloakData.ts` (below 500-line threshold for directory split).
- **Shared components preferred:** Uses `AccordionList`, `TimelineFlow`, `QuizBase`, `DefinitionTable`, `CodeAccordion` — no custom rendering components.
- **Amber accent:** The guide uses `#f59e0b` (amber) as its accent color for flow indicators and quiz styling.
