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

## Two-way Google Sheet sync

The portal can sync with your Google Sheet — private (no public link) and
two-way, via a small Apps Script endpoint bound to your sheet. It reads/writes two
dedicated tabs (`Portal_Partners`, `Portal_Leads`) and never touches your existing
layout.

- Click **Connect Sheet** (top-right), paste your Web App URL + token, and connect.
- Edits auto-save to the sheet; the portal pulls the latest on load.
- Works offline from the local copy and resumes when the connection returns.

**Setup (~5 min, once):** follow [`docs/SETUP-google-sync.md`](docs/SETUP-google-sync.md).
It covers deploying the script (`apps-script/Code.gs`) and hosting the portal on
GitHub Pages so you get a shareable URL (`.github/workflows/pages.yml` does the
deploy automatically once Pages is enabled).

Without a connection, the portal simply runs locally with `localStorage` as before.
