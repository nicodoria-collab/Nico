/**
 * Partner Portal  ⇄  Google Sheet sync endpoint
 * --------------------------------------------------
 * Paste this into your sheet's Apps Script editor (Extensions ▸ Apps Script),
 * change SECRET below, then deploy as a Web app (see docs/SETUP-google-sync.md).
 *
 * It reads and writes two dedicated tabs — Portal_Partners and Portal_Leads —
 * which it creates automatically. Your existing sheet layout is never touched.
 */

// 1) CHANGE THIS to a private phrase. Enter the SAME value as the token in the portal.
const SECRET = "change-me-to-a-secret";

const PARTNER_TAB  = "Portal_Partners";
const LEAD_TAB     = "Portal_Leads";
const PARTNER_COLS = ["id", "company", "tier", "type", "contract", "revShare", "doc",
                      "contact", "lastTB", "status", "todo", "notes", "target"];
const LEAD_COLS    = ["id", "name", "partnerId", "contact", "stage", "value", "notes"];

/** Read: GET ?action=read&token=... → { partners:[...], leads:[...] } */
function doGet(e) {
  try {
    checkToken_((e && e.parameter && e.parameter.token) || "");
    return json_({
      partners: readTab_(PARTNER_TAB, PARTNER_COLS),
      leads:    readTab_(LEAD_TAB, LEAD_COLS)
    });
  } catch (err) {
    return json_({ error: String(err && err.message || err) });
  }
}

/** Write: POST body { action:"write", token, partners:[...], leads:[...] } */
function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    checkToken_(body.token || "");
    writeTab_(PARTNER_TAB, PARTNER_COLS, body.partners || []);
    writeTab_(LEAD_TAB, LEAD_COLS, body.leads || []);
    return json_({ ok: true, partners: (body.partners || []).length, leads: (body.leads || []).length });
  } catch (err) {
    return json_({ error: String(err && err.message || err) });
  }
}

function checkToken_(token) {
  if (SECRET === "change-me-to-a-secret") throw new Error("Set SECRET in the script before using.");
  if (token !== SECRET) throw new Error("Bad token.");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function readTab_(name, cols) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(name);
  if (!sh) return [];
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const header = values[0].map(String);
  const out = [];
  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    if (row.every(c => c === "" || c === null)) continue;
    const obj = {};
    cols.forEach(c => { const i = header.indexOf(c); obj[c] = i >= 0 ? row[i] : ""; });
    if (!obj.id && !obj.company && !obj.name) continue;
    out.push(obj);
  }
  return out;
}

function writeTab_(name, cols, rows) {
  const sh = getOrCreateSheet_(name);
  sh.clearContents();
  const data = [cols];
  rows.forEach(o => data.push(cols.map(c => (o[c] == null ? "" : o[c]))));
  sh.getRange(1, 1, data.length, cols.length).setValues(data);
  sh.getRange(1, 1, 1, cols.length).setFontWeight("bold");
  sh.setFrozenRows(1);
}
