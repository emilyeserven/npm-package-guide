import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ───────────────────────────────────────────────────────────

export interface WsComparisonItem {
  id: string
  icon: string
  title: string
  description: string
  accent: string
  darkAccent: string
}

export interface WsHandshakeStep {
  step: number
  label: string
  lines: { name: string; value: string }[]
  isSuccess?: boolean
}

export interface WsReadyState {
  constant: string
  value: number
  description: string
}

export interface WsLifecyclePhase {
  name: string
  readyState: number
  description: string
}

export interface WsCloseCode {
  code: number
  name: string
  description: string
}

export interface WsFrameByte {
  hex: string
  type: 'opcode' | 'mask' | 'length' | 'payload'
  desc: string
}

export interface WsOpcodeEntry {
  name: string
  hex: string
  description: string
}

export interface WsAlternative {
  id: string
  title: string
  useFor: string
  keyTrait: string
  accent: string
  darkAccent: string
}

// ── HTTP vs WS Comparison ──────────────────────────────────────────

export const WS_COMPARISON_ITEMS: WsComparisonItem[] = [
  {
    id: 'polling',
    icon: '\u23f0',
    title: 'HTTP Polling',
    description: 'Client asks the server every N seconds: \u201cAnything new?\u201d Wastes bandwidth, adds latency, and hammers the server with requests \u2014 most of which return empty.',
    accent: '#dc2626',
    darkAccent: '#ff6b6b',
  },
  {
    id: 'websocket',
    icon: '\u26a1',
    title: 'WebSocket',
    description: 'A single persistent connection. Either side can send data at any time. No polling overhead, no wasted requests, sub-millisecond latency for messages.',
    accent: '#16a34a',
    darkAccent: '#00e5a0',
  },
]

// ── Handshake Steps ────────────────────────────────────────────────

export const WS_HANDSHAKE_STEPS: WsHandshakeStep[] = [
  {
    step: 1,
    label: 'Client \u2192',
    lines: [
      { name: '', value: 'GET /chat HTTP/1.1' },
      { name: 'Host', value: 'server.example.com' },
      { name: 'Upgrade', value: 'websocket' },
      { name: 'Connection', value: 'Upgrade' },
      { name: 'Sec-WebSocket-Key', value: 'dGhlIHNhbXBsZQ==' },
      { name: 'Sec-WebSocket-Version', value: '13' },
    ],
  },
  {
    step: 2,
    label: '\u2190 Server',
    lines: [
      { name: '', value: 'HTTP/1.1 101 Switching Protocols' },
      { name: 'Upgrade', value: 'websocket' },
      { name: 'Connection', value: 'Upgrade' },
      { name: 'Sec-WebSocket-Accept', value: 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=' },
    ],
  },
  {
    step: 3,
    label: 'Connected',
    lines: [
      { name: '', value: '\u2713 Protocol upgraded. TCP connection stays open.' },
      { name: '', value: 'Both sides can now send frames freely.' },
    ],
    isSuccess: true,
  },
]

// ── ReadyState Reference ───────────────────────────────────────────

export const WS_READY_STATES: WsReadyState[] = [
  { constant: 'CONNECTING', value: 0, description: 'Handshake in progress' },
  { constant: 'OPEN', value: 1, description: 'Connected and ready' },
  { constant: 'CLOSING', value: 2, description: 'Close handshake in progress' },
  { constant: 'CLOSED', value: 3, description: 'Connection terminated' },
]

// ── Lifecycle Phases ───────────────────────────────────────────────

export const WS_LIFECYCLE_PHASES: WsLifecyclePhase[] = [
  {
    name: 'Connecting',
    readyState: 0,
    description: 'The handshake is in progress. You can\'t send data yet. The browser is negotiating with the server.',
  },
  {
    name: 'Open',
    readyState: 1,
    description: 'Connection established. Both sides can send and receive messages freely. This triggers the open event.',
  },
  {
    name: 'Closing',
    readyState: 2,
    description: 'One side has initiated a close. The close handshake is in progress \u2014 both sides exchange close frames before the TCP connection drops.',
  },
  {
    name: 'Closed',
    readyState: 3,
    description: 'Connection is fully closed. The close event fires. To reconnect, you must create a new WebSocket instance.',
  },
]

// ── Close Codes ────────────────────────────────────────────────────

export const WS_CLOSE_CODES: WsCloseCode[] = [
  { code: 1000, name: 'Normal Closure', description: 'Everything\'s fine. The connection completed its purpose.' },
  { code: 1001, name: 'Going Away', description: 'Server shutting down, or client navigating away from page.' },
  { code: 1006, name: 'Abnormal Closure', description: 'Connection dropped without a Close frame. Network issue or crash.' },
  { code: 1008, name: 'Policy Violation', description: 'Message violated server policy (e.g., too large, forbidden content).' },
  { code: 1009, name: 'Too Large', description: 'Message exceeds the server\'s maximum payload size.' },
  { code: 1011, name: 'Server Error', description: 'Unexpected server condition prevented fulfilling the request.' },
]

// ── Frame Visualizer Data ──────────────────────────────────────────

export const WS_FRAME_BYTES: WsFrameByte[] = [
  { hex: '81', type: 'opcode', desc: 'FIN=1 (final fragment), Opcode=0x1 (text frame)' },
  { hex: '85', type: 'mask', desc: 'MASK=1 (client\u2192server), Payload length=5 bytes' },
  { hex: '37', type: 'length', desc: 'Masking key byte 1' },
  { hex: 'FA', type: 'length', desc: 'Masking key byte 2' },
  { hex: '21', type: 'length', desc: 'Masking key byte 3' },
  { hex: '3D', type: 'length', desc: 'Masking key byte 4' },
  { hex: '7F', type: 'payload', desc: 'Payload byte 1 \u2192 "H" (masked: 0x48 XOR 0x37)' },
  { hex: '9F', type: 'payload', desc: 'Payload byte 2 \u2192 "e" (masked: 0x65 XOR 0xFA)' },
  { hex: '4D', type: 'payload', desc: 'Payload byte 3 \u2192 "l" (masked: 0x6C XOR 0x21)' },
  { hex: '51', type: 'payload', desc: 'Payload byte 4 \u2192 "l" (masked: 0x6C XOR 0x3D)' },
  { hex: '48', type: 'payload', desc: 'Payload byte 5 \u2192 "o" (masked: 0x6F XOR 0x37)' },
]

export const WS_FRAME_LEGEND: { label: string; type: WsFrameByte['type'] }[] = [
  { label: 'FIN + Opcode', type: 'opcode' },
  { label: 'Mask + Length', type: 'mask' },
  { label: 'Masking Key', type: 'length' },
  { label: 'Payload', type: 'payload' },
]

// ── Opcode Types ───────────────────────────────────────────────────

export const WS_OPCODES: WsOpcodeEntry[] = [
  { name: 'Continuation', hex: '0x0', description: 'Continues a fragmented message' },
  { name: 'Text', hex: '0x1', description: 'UTF-8 text data' },
  { name: 'Binary', hex: '0x2', description: 'Binary (ArrayBuffer / Blob)' },
  { name: 'Close', hex: '0x8', description: 'Connection close request' },
  { name: 'Ping', hex: '0x9', description: 'Heartbeat request' },
  { name: 'Pong', hex: '0xA', description: 'Heartbeat response' },
]

// ── Alternatives Comparison ────────────────────────────────────────

export const WS_ALTERNATIVES: WsAlternative[] = [
  {
    id: 'websocket',
    title: 'WebSocket',
    useFor: 'Chat, multiplayer games, collaborative editing, live trading, real-time dashboards.',
    keyTrait: 'Bidirectional, low latency, persistent connection.',
    accent: '#16a34a',
    darkAccent: '#00e5a0',
  },
  {
    id: 'sse',
    title: 'SSE',
    useFor: 'News feeds, notifications, live scores, stock tickers, build logs.',
    keyTrait: 'Server-to-client only. Simpler API, auto-reconnect, works with HTTP/2.',
    accent: '#2563eb',
    darkAccent: '#5bc0eb',
  },
  {
    id: 'polling',
    title: 'HTTP Polling',
    useFor: 'Infrequent updates, simple APIs, environments where WebSockets are blocked.',
    keyTrait: 'Simplest to implement. Works everywhere. Stateless.',
    accent: '#7c3aed',
    darkAccent: '#7b61ff',
  },
]

// ── Navigation ─────────────────────────────────────────────────────

export const WS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['ws-start'] },
  { label: 'Fundamentals', ids: ['ws-why', 'ws-handshake'] },
  { label: 'The Browser API', ids: ['ws-api', 'ws-simulator'] },
  { label: 'Under the Hood', ids: ['ws-frames', 'ws-sending', 'ws-closing'] },
  { label: 'Production', ids: ['ws-patterns', 'ws-server', 'ws-alternatives'] },
]

export const WS_START_PAGE_DATA: StartPageData = {
  subtitle: 'Real-time bidirectional communication \u00b7 handshake protocol \u00b7 frames \u00b7 reconnection \u00b7 production patterns.',
  tip: 'For backend engineers learning how WebSockets work under the hood and how to use them in production.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Understand the Fundamentals',
      description: 'Learn why WebSockets exist, how they compare to HTTP polling, and how the opening handshake upgrades an HTTP connection.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'ws-why': 'Why HTTP polling breaks down and how WebSockets solve the real-time problem.',
        'ws-handshake': 'The HTTP upgrade handshake, Sec-WebSocket-Key, and the 101 Switching Protocols response.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Master the Browser API',
      description: 'Walk through the WebSocket JavaScript API \u2014 events, readyState, and a live echo server simulator.',
      sectionLabel: 'The Browser API',
      subItemDescriptions: {
        'ws-api': 'The four events, two methods, lifecycle phases, and readyState reference.',
        'ws-simulator': 'Interactive echo server simulation \u2014 send text, JSON, binary, and rapid-fire messages.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Go Under the Hood',
      description: 'Explore WebSocket frames, opcodes, masking, and the close handshake with interactive visualizers.',
      sectionLabel: 'Under the Hood',
      subItemDescriptions: {
        'ws-frames': 'Binary frame anatomy, opcodes, masking keys, and the interactive frame inspector.',
        'ws-sending': 'Sending text, JSON, binary data, and managing backpressure with bufferedAmount.',
        'ws-closing': 'The close handshake, common close codes (1000\u20131011), and clean vs abnormal closure.',
      },
    },
    {
      type: 'bonus',
      title: 'Production Patterns',
      description: 'Build production-ready WebSocket code with reconnection, heartbeats, and know when to choose alternatives like SSE.',
      sectionLabel: 'Production',
      subItemDescriptions: {
        'ws-patterns': 'Exponential backoff reconnection, jitter, and application-level ping/pong heartbeats.',
        'ws-server': 'Building a Node.js WebSocket server with the ws library \u2014 echo, broadcast, and ping handling.',
        'ws-alternatives': 'When to use WebSockets vs SSE vs HTTP polling \u2014 a decision framework.',
      },
    },
  ],
  relatedGuides: ['tanstack-query', 'nginx'],
}

export const WS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'websockets',
    icon: '\u{1f50c}',
    title: 'WebSockets',
    startPageId: 'ws-start',
    description: 'Real-time, bidirectional communication on the web \u2014 from the opening handshake to production reconnection patterns.',
    category: 'infrastructure',
    dateCreated: '2026-02-27',
    dateModified: '2026-02-27',
    sections: WS_GUIDE_SECTIONS,
  },
  startPageData: WS_START_PAGE_DATA,
}
