import type { GlossaryCategory } from './types'

export const wsGlossary: GlossaryCategory[] = [
  {
    category: "Protocol",
    terms: [
      {
        term: "WebSocket",
        definition: "A communication protocol providing full-duplex channels over a single TCP connection. Starts as an HTTP upgrade, then switches to a lightweight binary framing protocol for bidirectional real-time messaging.",
        linkId: "rfc-6455",
        sectionId: "ws-why",
      },
      {
        term: "WebSocket Handshake",
        definition: "The opening exchange where the client sends an HTTP Upgrade request and the server responds with 101 Switching Protocols. After this, the TCP connection is reused for WebSocket frames.",
        linkId: "rfc-6455",
        sectionId: "ws-handshake",
      },
      {
        term: "WebSocket Frame",
        definition: "The minimal unit of data in the WebSocket protocol. Each frame has a FIN bit, opcode, optional masking key, and payload. Adds only 2\u201314 bytes of overhead per message.",
        linkId: "rfc-6455",
        sectionId: "ws-frames",
      },
    ],
  },
  {
    category: "API & Lifecycle",
    terms: [
      {
        term: "readyState (WebSocket)",
        definition: "A property on the WebSocket object indicating its current state: CONNECTING (0), OPEN (1), CLOSING (2), or CLOSED (3). Check before sending to avoid errors.",
        linkId: "mdn-websocket-api",
        sectionId: "ws-api",
      },
      {
        term: "Close Code (WebSocket)",
        definition: "A numeric status code sent during the WebSocket close handshake. 1000 means normal closure, 1006 means abnormal (no Close frame), and 4000\u20134999 are reserved for application use.",
        linkId: "rfc-6455",
        sectionId: "ws-closing",
      },
      {
        term: "bufferedAmount",
        definition: "A WebSocket property reporting the number of bytes queued for transmission but not yet sent. Used for backpressure and flow control when sending high-frequency data.",
        linkId: "mdn-websocket-api",
        sectionId: "ws-sending",
      },
    ],
  },
  {
    category: "Production Patterns",
    terms: [
      {
        term: "Exponential Backoff",
        definition: "A reconnection strategy where the delay between retry attempts doubles each time (1s, 2s, 4s, 8s...) with a cap. Adding jitter (randomness) prevents thundering herd problems when many clients reconnect simultaneously.",
        linkId: "ws-npm",
        sectionId: "ws-patterns",
      },
      {
        term: "Server-Sent Events (SSE)",
        definition: "A simpler alternative to WebSockets for server-to-client streaming. Uses standard HTTP, handles reconnection automatically, and works with HTTP/2. One-directional only \u2014 the client cannot send data back over the same connection.",
        linkId: "mdn-sse",
        sectionId: "ws-alternatives",
      },
    ],
  },
]
