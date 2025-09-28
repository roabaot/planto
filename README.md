# Planto

Next.js 15 (canary) + Tailwind CSS v4 (alpha) + Framer Motion starter.

## Stack

- **Next.js** 15 canary (App Router)
- **React 19 RC**
- **Tailwind CSS 4** (alpha) + PostCSS + Autoprefixer
- **Framer Motion** for animations
- TypeScript, ESLint (flat config)

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm start` – run production build
- `npm run lint` – lint sources

## Folder Structure

```
app/            # App Router entry (layout.tsx, page.tsx)
components/     # Reusable UI components
```

## Tailwind (v4 alpha)

Config kept minimal. Adjust `tailwind.config.js` and content globs as you add folders.

## Example Motion Component

`components/MotionCard.tsx` demonstrates a spring fade/slide + hover scale.

## Next Steps Ideas

- Add design tokens & theming
- Add ESLint rules refinement / Prettier (optional)
- Add testing (Vitest / Jest) if needed

## Figma MCP Server (Design Context Integration)

This repo includes an experimental Model Context Protocol (MCP) server that lets tools / AI assistants query your Figma file for components and styles.

### Location

`mcp/figma-server`

### Features (initial)

- listComponents – returns component metadata (nodeId, key, name, description)
- getComponent – fetches a component by nodeId OR key (simplified node snapshot)
- listStyles – lists style metadata (color/text/effect)

### Setup

1. Generate a Figma Personal Access Token: https://www.figma.com/settings (Personal access tokens section)
2. Copy your file key (segment after `/file/` or `/design/` in the file URL)
3. Copy `mcp/figma-server/.env.figma.example` to `.env.figma` and fill in values:

```
FIGMA_TOKEN=figd_xxxxxxxxxxxxxxxxx
FIGMA_FILE_KEY=your_file_key_here
```

4. Install dependencies (root + server):

```
npm install
```

5. Run the server in dev mode:

```
npm run mcp:figma
```

The server communicates over stdin/stdout using a lightweight JSON-RPC style (one JSON per line). Each request line should look like:

```
{"id":1,"method":"listComponents"}
```

### Example Manual Test

In a second terminal:

```
node -e 'process.stdin.write(JSON.stringify({id:1,method:"ping"})+"\n")' | npm run mcp:figma
```

(For real integration you would configure an MCP-aware client instead.)

### Tool Methods

| Method         | Params           | Description                            |
| -------------- | ---------------- | -------------------------------------- |
| ping           | -                | Health check                           |
| listComponents | -                | Lists component metadata in file       |
| getComponent   | { nodeId? key? } | Fetch component node snapshot (one of) |
| listStyles     | -                | Lists style metadata                   |

### Notes

- `getComponent` by nodeId currently traverses the full file (may be slow for huge files). Future improvement: targeted /nodes query.
- Paints are normalized to hex (with alpha) for SOLID fills only initially.
- Only first 25 children of a node are returned to keep payload small.

### Future Enhancements (Planned)

- Caching layer with etag / last-mod (reduce API calls)
- Export design tokens (colors, typography) as CSS variables
- Diff tool: which components changed since previous hash
- Generate component prop suggestions from variant properties
- Optional image export for preview thumbnails
- Rate limit + error classification
- Variables (Figma design tokens 2.0) ingestion

---

If you want to extend, start inside `mcp/figma-server/src/index.ts` – add new methods and ensure each response is concise and deterministic.

## Design → Code Workflow (Figma Component to React)

1. Run MCP server: `npm run mcp:figma`
2. Query component by name (JSON line):

```
{"id":1,"method":"getComponentByName","params":{"name":"Card","includeNode":true}}
```

3. Inspect response: note layoutMode, itemSpacing, padding, children names.
4. Map spacing to Tailwind (e.g. 24 → py-6, 16 → px-4, 12 gap → gap-3 / space-y-3).
5. Implement or adjust `components/Card.tsx` props.
6. Render example in a page or Storybook for visual verification.
7. Iterate: compare with Figma (overlay plugin or manual reference) and refine.

### Prompting Pattern (to an AI Assistant)

Ask:

> Use the Figma component named "Card". Provide a React component with props (title, body, media, actions). Respect padding: 24/16/24/16, vertical spacing 12, white background, subtle shadow, hover elevation.

### Verification Checklist

- Spacing matches design (measure with browser dev tools)
- Font sizes & weights align with text nodes
- Colors use tokens (when you adopt a token layer) instead of raw hex
- Hover/focus states accessible (visible focus ring)
- Structure is semantic: heading, paragraphs, buttons grouped

### Extending Accuracy

- Add corner radius & effects to server output (future enhancement)
- Derive tokens from repeated hex colors
- Use `/nodes` endpoint for faster targeted fetches
- Introduce component variant mapping (props → variant properties)

## Arbitrary Group / Frame Lookup (e.g. "Group 15")

If a design element is not a published Figma Component (just a group/frame), use:

```
{"id":1,"method":"getNodeByName","params":{"name":"Group 15","firstOnly":true}}
```

Result includes: size, cornerRadius, effects (drop shadow), padding (if auto layout), children list.

Then adapt `Card` props:

1. Map padding -> Card padding prop (or directly provided via `padding={{ top:24, right:16, bottom:24, left:16 }}`)
2. Set radius -> `radius={8}` if not a standard Tailwind radius
3. Shadow: if effect radius doesn’t match standard Tailwind, leave `shadow="custom"` and add a custom class or inline style
4. Background fill color: use `background="#FFFFFF"` (or a token class like `bg-white`)
5. Provide children via `media`, `title`, `body`, `actions` based on node child order

Example usage:

```tsx
<Card
  title="Project Alpha"
  body="Short project description goes here."
  media={
    <img src="/placeholder.png" alt="" className="aspect-video object-cover" />
  }
  actions={<button className="text-sm text-emerald-600">Open →</button>}
  radius={8}
  shadow="md"
  padding={{ top: 24, right: 16, bottom: 24, left: 16 }}
  background="bg-white"
/>
```

> Note: Canary + RC + alpha dependencies may have breaking changes. Lock exact versions (already pinned) and update cautiously.
