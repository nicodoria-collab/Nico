# Partner Portal

A self-contained portal for managing a partner book of business and the warm-lead
pipeline it feeds to the sales team. Built for a Checkout.com partner manager to
replace the tracking spreadsheet with something more organized and actionable.

## Running it

There is **no server, build step, or install**. Just open `index.html`:

- Double-click the file, or
- Drag it into any browser (Chrome, Edge, Safari, Firefox).

All data lives in your browser's `localStorage`, so your edits are saved
automatically and persist between sessions on that device.

## What's inside

**Dashboard** — at-a-glance KPIs (partners by tier, active count, leads in
pipeline, handed-to-sales, closed-won, combined revenue targets), plus a
"Follow-ups & open items" list that surfaces every partner with an outstanding
to-do or missing information so you always know your next action.

**Partners** — the full book grouped by tier (1 / 2 / 3 / Unassigned / N/A),
with contract terms, doc location (Ironclad/PDF), contact, last touch-base,
status, linked-lead count, and to-dos. Search and filter by tier or status.
Click any row to edit; use **+ Add partner** to create one.

**Lead Pipeline** — a drag-and-drop Kanban board tracking warm leads through
stages: Identified → Contacted → Intro Made → Handed to Sales → Closed Won /
Closed Lost. Each lead links back to the **source partner** that referred it,
so you can see which partners are actually producing top-of-funnel. Drag cards
between columns to advance them.

## Data

The portal is seeded with a snapshot of the partner spreadsheet (17 partners and
the referral prospects: Skio, Naviga, Ravelin, Ecwid, Vesta, Shopsense AI).
Statuses were inferred from contract state and are fully editable.

- **Export** downloads a JSON backup of everything.
- **Import** restores a backup (useful for moving between devices).
- **Reset** restores the original spreadsheet snapshot, discarding your edits.

Because data is per-device, use **Export** periodically if the data matters — or
ask to have it upgraded to a shared/live-synced backend later.
