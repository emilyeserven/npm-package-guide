# WebSockets — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning how WebSockets work — from the protocol-level handshake and binary framing to production patterns like reconnection and heartbeats. Assumes familiarity with HTTP, TCP, and Node.js. Teaches the WebSocket protocol, browser API, frame structure, close codes, and when to choose alternatives like SSE.

## Sections

| Section | Pages | Focus |
|---------|-------|-------|
| Fundamentals | ws-why, ws-handshake | Why WebSockets exist, HTTP upgrade handshake |
| The Browser API | ws-api, ws-simulator | JavaScript API, lifecycle, interactive echo simulator |
| Under the Hood | ws-frames, ws-sending, ws-closing | Binary frames, opcodes, masking, data types, close codes |
| Production | ws-patterns, ws-server, ws-alternatives | Reconnection, heartbeats, Node.js server, SSE comparison |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `WsPollingComparison` | *(none)* | Side-by-side HTTP Polling vs WebSocket comparison cards. Data from `WS_COMPARISON_ITEMS`. |
| `WsHandshakeDemo` | *(none)* | Step-through animation of the HTTP upgrade handshake. Data from `WS_HANDSHAKE_STEPS`. |
| `WsLifecycle` | *(none)* | Vertical timeline of the 4 connection lifecycle phases with hover effects. Data from `WS_LIFECYCLE_PHASES`. |
| `WsSimulator` | *(none)* | Fully simulated WebSocket echo server with send/receive log, JSON/binary presets, and heartbeat. Client-side simulation only. |
| `WsFrameInspector` | *(none)* | Interactive hex byte inspector for a "Hello" text frame. Hover to see byte descriptions. Data from `WS_FRAME_BYTES`. |
| `WsCloseCodeExplorer` | *(none)* | Grid of close code cards (1000–1011). Data from `WS_CLOSE_CODES`. |
| `WsHeartbeatViz` | *(none)* | Animated ping/pong ball bouncing between client and server paddles. |
| `WsAlternativesComparison` | *(none)* | Three-column comparison of WebSocket vs SSE vs HTTP Polling. Data from `WS_ALTERNATIVES`. |

## Guide-Specific Conventions

- **No external connections:** The simulator and all interactive demos run entirely client-side. No actual WebSocket connections are opened.
- **Code examples:** Use `CodeAccordion` for all code blocks. TypeScript for server-side code, JavaScript for browser API examples.
- **Data-driven components:** All interactive data lives in `src/data/wsData.ts`. Components import from there — no inline data.
