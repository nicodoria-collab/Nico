# Setup: connect the portal to your Google Sheet

This connects the Partner Portal to your Google Sheet with **two-way sync**, while
keeping your data **private** (no public link). It takes about 5 minutes, once.

There are two parts:

- **Part A** — deploy a small script in your sheet (this is the private connection).
- **Part B** — host the portal online so you get a shareable URL.

---

## Part A — Deploy the sync script (~3 min)

The portal reads and writes three dedicated tabs it creates for you —
`Portal_Partners`, `Portal_Leads`, and `Portal_Followups`. **Your existing sheet layout is never
touched.**

1. Open your partner spreadsheet in Google Sheets.
2. Menu: **Extensions ▸ Apps Script**. A code editor opens in a new tab.
3. Delete whatever is in `Code.gs`, then paste the entire contents of
   [`apps-script/Code.gs`](../apps-script/Code.gs) from this repo.
4. Near the top, change this line to a private phrase only you know:
   ```js
   const SECRET = "change-me-to-a-secret";
   ```
   For example: `const SECRET = "warm-leads-2026-quokka";`
   **Remember this exact value — you'll paste it into the portal as the "token".**
5. Click **Save** (💾).
6. Click **Deploy ▸ New deployment**.
7. Click the gear ⚙️ next to "Select type" and choose **Web app**.
8. Set:
   - **Description**: `Partner Portal sync` (anything is fine)
   - **Execute as**: **Me**
   - **Who has access**: **Anyone**
     *(This makes the URL callable without a Google login. Your data is still
     protected by the secret token — nobody can read or write without it.)*
9. Click **Deploy**. Google will ask you to **authorize** — approve it (choose
   your account, click **Advanced ▸ Go to … (unsafe)** if prompted; this is normal
   for your own scripts, then **Allow**).
10. Copy the **Web app URL** — it ends in `/exec`. This is what you paste into
    the portal.

> **If you edit the script later**, redeploy with **Deploy ▸ Manage deployments ▸
> ✏️ Edit ▸ Version: New version ▸ Deploy** so the changes go live. The URL stays
> the same.
>
> **Already set up sync before the Follow-ups update?** Re-paste the latest
> `apps-script/Code.gs` and redeploy a **New version** as above. Until you do, the
> portal still works and your follow-ups sync will simply resume once the new
> version is live — nothing is lost.

### Connect the portal
1. Open the portal and click **Connect Sheet** (top-right).
2. Paste the **Web app URL** and the **token** (the `SECRET` value you set).
3. Click **Save & Connect**.

The first connect seeds the two tabs from the portal's data. After that, every
edit you make in the portal auto-saves to the sheet, and the portal pulls the
latest each time it loads. Use **Test** to verify the connection any time.

---

## Part B — Host the portal (GitHub Pages)

A repository workflow ([`.github/workflows/pages.yml`](../.github/workflows/pages.yml))
already builds and deploys the site. You just need to turn Pages on once:

1. On GitHub, go to the repo → **Settings ▸ Pages**.
2. Under **Build and deployment ▸ Source**, choose **GitHub Actions**.
3. Push to (or re-run the workflow on) the deploy branch. The **Actions** tab will
   show a "Deploy portal to GitHub Pages" run; when it's green, the URL appears at
   **Settings ▸ Pages** (looks like `https://<you>.github.io/<repo>/`).
4. Open that URL and connect it to your sheet as in Part A.

Notes:
- GitHub Pages is free for **public** repos. Private repos need GitHub Pro/Team.
- The hosted page contains **no partner data** — data is fetched at runtime using
  the token you enter, which is stored only in your browser. Nobody can read the
  page's source to get your data or token.

---

## How syncing behaves

- **On load** (when connected): the portal pulls the latest from the sheet.
- **On edit**: changes auto-save to the sheet ~1.5s after you stop editing.
- **Pull now**: force a refresh from the sheet (Connect Sheet ▸ Pull now).
- **Offline**: if the sheet is unreachable, the portal keeps working from its local
  copy and shows a red "Sync error" dot; it resumes when the connection is back.
- **Multi-device**: the sheet is the shared source of truth. If two people edit at
  the exact same time, the last save wins — refresh (Pull now) before big edits.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Unexpected response — is this the deployed Web App URL…" | Make sure the URL ends in `/exec` (not `/dev`), and that access is set to **Anyone**. |
| "Bad token." | The token in the portal must exactly match `SECRET` in the script. |
| "Set SECRET in the script before using." | You left `SECRET` at its default — change it and redeploy a new version. |
| Edits don't appear on another device | Click **Pull now** there, or reload the page. |
