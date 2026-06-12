import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, "..", "worldcup2026", "data", "wc2026.json");
const SHEET_CSV_URL = process.env.SHEET_CSV_URL;

if (!SHEET_CSV_URL) {
  throw new Error("Thiếu SHEET_CSV_URL");
}

function normalize(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

function csvToObjects(csv) {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row = {};

    headers.forEach((header, index) => {
      row[header] = (values[index] || "").trim();
    });

    return row;
  });
}

function findMatch(matches, row) {
  const rowDate = String(row.date || "").trim();
  const rowTeam1 = normalize(row.team1);
  const rowTeam2 = normalize(row.team2);

  return matches.find((match) => {
    const sameTeams =
      normalize(match.team1) === rowTeam1 &&
      normalize(match.team2) === rowTeam2;

    const sameDate = !rowDate || match.date === rowDate;

    return sameTeams && sameDate;
  });
}

async function main() {
  const raw = fs.readFileSync(FILE_PATH, "utf8");
  const data = JSON.parse(raw);

  const response = await fetch(SHEET_CSV_URL);
  if (!response.ok) {
    throw new Error(`Không tải được CSV: ${response.status}`);
  }

  const csvText = await response.text();
  const rows = csvToObjects(csvText);

  let updated = 0;

  for (const row of rows) {
    const match = findMatch(data.matches || [], row);
    if (!match) continue;

    const ft1 = Number(row.ft1);
    const ft2 = Number(row.ft2);

    if (!Number.isNaN(ft1) && !Number.isNaN(ft2)) {
      if (!match.score) match.score = {};
      match.score.ft = [ft1, ft2];
      updated += 1;
    }

    const ht1 = Number(row.ht1);
    const ht2 = Number(row.ht2);

    if (!Number.isNaN(ht1) && !Number.isNaN(ht2)) {
      if (!match.score) match.score = {};
      match.score.ht = [ht1, ht2];
    }

    if (row.status) {
      match.status = row.status;
    }

    if (row.minute) {
      match.minute = row.minute;
    }
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Updated ${updated} matches`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});