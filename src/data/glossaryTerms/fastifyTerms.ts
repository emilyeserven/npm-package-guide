import type { GlossaryCategory } from './index'

export const fastifyGlossary: GlossaryCategory[] = [
  {
    category: "Fastify Core",
    terms: [
      {
        term: "Fastify",
        definition: "A high-performance Node.js web framework that uses encapsulated plugins, JSON Schema validation, and the <code>pino</code> logger. Can serve 76,000+ requests per second via compiled serialization.",
        linkId: "fastify-official-docs",
        sectionId: "fastify-foundations",
      },
      {
        term: "Encapsulation (Fastify)",
        definition: "Fastify\u2019s scoping model where <code>register()</code> creates isolated plugin contexts. Decorators and hooks inside a scope don\u2019t leak to siblings. Use <code>fastify-plugin</code> (<code>fp()</code>) to break encapsulation upward for shared infrastructure.",
        linkId: "fastify-plugins-docs",
        sectionId: "fastify-plugins",
      },
      {
        term: "fastify-plugin",
        definition: "A utility that wraps a Fastify plugin to break encapsulation upward, exposing its decorators to the parent scope. Used for shared infrastructure like database connections and auth utilities.",
        linkId: "fastify-plugin-npm",
        sectionId: "fastify-plugins",
      },
      {
        term: "Decorator (Fastify)",
        definition: "A method to extend the Fastify instance, request, or reply objects. <code>app.decorate('db', pool)</code> makes <code>app.db</code> available in handlers. Scoped by encapsulation unless wrapped with <code>fp()</code>.",
        linkId: "fastify-plugins-docs",
        sectionId: "fastify-plugins",
      },
    ],
  },
  {
    category: "Lifecycle & Hooks",
    terms: [
      {
        term: "Request Lifecycle (Fastify)",
        definition: "The sequence of steps a Fastify request passes through: routing \u2192 onRequest \u2192 preParsing \u2192 parsing \u2192 preValidation \u2192 validation \u2192 preHandler \u2192 handler \u2192 preSerialization \u2192 onSend \u2192 response \u2192 onResponse.",
        linkId: "fastify-lifecycle-docs",
        sectionId: "fastify-lifecycle",
      },
      {
        term: "preHandler",
        definition: "A Fastify hook that fires after validation but before the route handler. The most common hook point for auth guards, permission checks, and data pre-loading.",
        linkId: "fastify-lifecycle-docs",
        sectionId: "fastify-lifecycle",
      },
    ],
  },
  {
    category: "Validation & Serialization",
    terms: [
      {
        term: "fast-json-stringify",
        definition: "A library that compiles JSON Schema into optimized serialization functions. Fastify uses it to serialize responses 2\u20133x faster than native <code>JSON.stringify()</code>.",
        linkId: "fastify-validation-docs",
        sectionId: "fastify-validation",
      },
      {
        term: "TypeBox",
        definition: "A TypeScript-first JSON Schema builder from <code>@sinclair/typebox</code>. Produces both runtime JSON Schema and TypeScript types. Fastify has a first-party type provider for end-to-end type safety.",
        linkId: "fastify-typebox",
        sectionId: "fastify-validation",
      },
      {
        term: "Response Schema Whitelisting",
        definition: "Fastify\u2019s response schema acts as a field whitelist \u2014 properties not defined in the schema are silently stripped from the response. Prevents accidental data leakage (e.g., <code>password_hash</code>).",
        linkId: "fastify-validation-docs",
        sectionId: "fastify-validation",
      },
    ],
  },
  {
    category: "Performance & Routing",
    terms: [
      {
        term: "find-my-way",
        definition: "Fastify\u2019s radix-tree router that resolves paths in O(k) time (where k is path length), compared to Express\u2019s O(n) linear middleware chain matching.",
        linkId: "fastify-official-docs",
        sectionId: "fastify-foundations",
      },
      {
        term: "pino",
        definition: "A fast, structured JSON logger built into Fastify by default. Each request gets a child logger with a unique request ID. Orders of magnitude faster than <code>console.log</code>.",
        linkId: "fastify-pino",
        sectionId: "fastify-production",
      },
    ],
  },
]
