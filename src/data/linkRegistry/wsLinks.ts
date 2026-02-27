import type { RegistryLink } from './types'

export const wsLinks: RegistryLink[] = [
  {
    id: "rfc-6455",
    url: "https://datatracker.ietf.org/doc/html/rfc6455",
    label: "RFC 6455 — The WebSocket Protocol",
    source: "IETF",
    desc: "The official WebSocket protocol specification \u2014 handshake, framing, close codes, and security considerations",
    tags: ["docs", "free", "guide:websockets"],
    resourceCategory: "Specifications",
  },
  {
    id: "mdn-websocket-api",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket",
    label: "MDN WebSocket API",
    source: "MDN",
    desc: "Complete reference for the browser WebSocket API \u2014 constructor, events, properties, and methods",
    tags: ["docs", "free", "guide:websockets"],
    resourceCategory: "Official Documentation",
  },
  {
    id: "mdn-sse",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events",
    label: "MDN Server-Sent Events",
    source: "MDN",
    desc: "Server-Sent Events API reference \u2014 the simpler alternative for server-to-client streaming",
    tags: ["docs", "free", "guide:websockets"],
    resourceCategory: "Official Documentation",
  },
  {
    id: "ws-npm",
    url: "https://github.com/websockets/ws",
    label: "ws — WebSocket library for Node.js",
    source: "GitHub",
    desc: "The most popular WebSocket server implementation for Node.js \u2014 lightweight, fast, and spec-compliant",
    tags: ["repo", "free", "guide:websockets"],
    resourceCategory: "Libraries & Tools",
  },
  {
    id: "socketio-docs",
    url: "https://socket.io/docs/v4/",
    label: "Socket.IO documentation",
    source: "Socket.IO",
    desc: "Real-time framework with rooms, namespaces, auto-reconnection, and fallback transports built on top of WebSockets",
    tags: ["docs", "free", "guide:websockets"],
    resourceCategory: "Libraries & Tools",
  },
]
