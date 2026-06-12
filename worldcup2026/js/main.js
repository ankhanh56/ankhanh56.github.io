const flagMap = {
  "Mexico": "https://flagcdn.com/w80/mx.png",
  "South Africa": "https://flagcdn.com/w80/za.png",
  "South Korea": "https://flagcdn.com/w80/kr.png",
  "Czech Republic": "https://flagcdn.com/w80/cz.png",
  "Canada": "https://flagcdn.com/w80/ca.png",
  "Bosnia & Herzegovina": "https://flagcdn.com/w80/ba.png",
  "Qatar": "https://flagcdn.com/w80/qa.png",
  "Switzerland": "https://flagcdn.com/w80/ch.png",
  "Brazil": "https://flagcdn.com/w80/br.png",
  "Morocco": "https://flagcdn.com/w80/ma.png",
  "Haiti": "https://flagcdn.com/w80/ht.png",
  "USA": "https://flagcdn.com/w80/us.png",
  "Paraguay": "https://flagcdn.com/w80/py.png",
  "Australia": "https://flagcdn.com/w80/au.png",
  "Turkey": "https://flagcdn.com/w80/tr.png",
  "Germany": "https://flagcdn.com/w80/de.png",
  "Curaçao": "https://flagcdn.com/w80/cw.png",
  "Netherlands": "https://flagcdn.com/w80/nl.png",
  "Japan": "https://flagcdn.com/w80/jp.png",
  "France": "https://flagcdn.com/w80/fr.png",
  "Senegal": "https://flagcdn.com/w80/sn.png",
  "Iraq": "https://flagcdn.com/w80/iq.png",
  "Norway": "https://flagcdn.com/w80/no.png",
  "Argentina": "https://flagcdn.com/w80/ar.png",
  "Algeria": "https://flagcdn.com/w80/dz.png",
  "Austria": "https://flagcdn.com/w80/at.png",
  "Jordan": "https://flagcdn.com/w80/jo.png",
  "England": "https://flagcdn.com/w80/gb-eng.png",
  "Croatia": "https://flagcdn.com/w80/hr.png",
  "Ghana": "https://flagcdn.com/w80/gh.png",
  "Panama": "https://flagcdn.com/w80/pa.png",
  "Belgium": "https://flagcdn.com/w80/be.png",
  "Egypt": "https://flagcdn.com/w80/eg.png",
  "Iran": "https://flagcdn.com/w80/ir.png",
  "New Zealand": "https://flagcdn.com/w80/nz.png",
  "Spain": "https://flagcdn.com/w80/es.png",
  "Cape Verde": "https://flagcdn.com/w80/cv.png",
  "Saudi Arabia": "https://flagcdn.com/w80/sa.png",
  "Uruguay": "https://flagcdn.com/w80/uy.png",
  "Ivory Coast": "https://flagcdn.com/w80/ci.png",
  "Ecuador": "https://flagcdn.com/w80/ec.png",
  "Sweden": "https://flagcdn.com/w80/se.png",
  "Tunisia": "https://flagcdn.com/w80/tn.png",
  "Portugal": "https://flagcdn.com/w80/pt.png",
  "DR Congo": "https://flagcdn.com/w80/cd.png",
  "Uzbekistan": "https://flagcdn.com/w80/uz.png",
  "Colombia": "https://flagcdn.com/w80/co.png",
  "Scotland": "https://flagcdn.com/w80/gb-sct.png"
};

const fallbackFlag = "https://flagcdn.com/w80/un.png";
const MATCH_DURATION_MINUTES = 120;

function formatDate(dateStr) {
  const [year, month, day] = String(dateStr).split("-");
  return `${day}.${month}.${year}`;
}

function formatTime(timeStr) {
  return String(timeStr || "").replace(/\s*UTC[+-]\d+$/i, "");
}

function getFT(match) {
  const ft = match?.score?.ft;
  if (Array.isArray(ft) && ft.length === 2) {
    return `${ft[0]} - ${ft[1]}`;
  }
  return "";
}

function groupLabel(groupName) {
  return String(groupName || "").replace("Group", "BẢNG");
}

function parseMatchDateTime(match) {
  const date = String(match.date || "");
  const timeOnly = formatTime(match.time || "");
  const [hh = "00", mm = "00"] = timeOnly.split(":");

  return new Date(
    Number(date.slice(0, 4)),
    Number(date.slice(5, 7)) - 1,
    Number(date.slice(8, 10)),
    Number(hh),
    Number(mm),
    0,
    0
  );
}

function buildCard(match) {
  const div = document.createElement("div");
  div.className = "match-card";
  div.dataset.start = parseMatchDateTime(match).getTime();

  const team1Flag = flagMap[match.team1] || fallbackFlag;
  const team2Flag = flagMap[match.team2] || fallbackFlag;

  div.innerHTML = `
    <div class="team-box">
      <div class="flag-wrap">
        <img src="${team1Flag}" alt="${match.team1}" loading="lazy" width="80" height="80">
      </div>
      <div class="team-name">${match.team1}</div>
    </div>

    <div class="center-box">
      <div class="match-time">${formatTime(match.time)}</div>
      <div class="match-date">${formatDate(match.date)}</div>
      <div class="match-group">${groupLabel(match.group || "")}</div>
      <div class="match-ft">${getFT(match)}</div>
    </div>

    <div class="team-box">
      <div class="flag-wrap">
        <img src="${team2Flag}" alt="${match.team2}" loading="lazy" width="80" height="80">
      </div>
      <div class="team-name">${match.team2}</div>
    </div>
  `;

  return div;
}

function renderColumn(targetId, matches) {
  const root = document.getElementById(targetId);
  root.innerHTML = "";
  matches.forEach((match) => {
    root.appendChild(buildCard(match));
  });
}

function sortGroupMatches(matches) {
  return [...matches].sort((a, b) => {
    const aTime = parseMatchDateTime(a).getTime();
    const bTime = parseMatchDateTime(b).getTime();
    return aTime - bTime;
  });
}

function splitByGroupAndMatchday(matches) {
  const groupMap = {};
  const groupOrder = [
    "Group A", "Group B", "Group C", "Group D",
    "Group E", "Group F", "Group G", "Group H",
    "Group I", "Group J", "Group K", "Group L"
  ];

  matches.forEach((match) => {
    const groupName = match.group || "Unknown";
    if (!groupMap[groupName]) {
      groupMap[groupName] = [];
    }
    groupMap[groupName].push(match);
  });

  const round1 = [];
  const round2 = [];
  const round3 = [];

  groupOrder.forEach((groupName) => {
    if (!groupMap[groupName]) return;
    const groupMatches = sortGroupMatches(groupMap[groupName]);

    round1.push(...groupMatches.slice(0, 2));
    round2.push(...groupMatches.slice(2, 4));
    round3.push(...groupMatches.slice(4, 6));
  });

  return { round1, round2, round3 };
}

function clearHighlights() {
  document.querySelectorAll(".match-card").forEach((card) => {
    card.classList.remove("is-live", "is-next");
  });
}

function applyHighlight() {
  clearHighlights();

  const now = Date.now();
  const duration = MATCH_DURATION_MINUTES * 60 * 1000;
  const cards = [...document.querySelectorAll(".match-card")];

  let liveCard = null;
  let nextCard = null;
  let smallestFutureDiff = Infinity;

  cards.forEach((card) => {
    const start = Number(card.dataset.start);
    const end = start + duration;

    if (now >= start && now < end) {
      if (!liveCard || start > Number(liveCard.dataset.start)) {
        liveCard = card;
      }
    } else if (start > now) {
      const diff = start - now;
      if (diff < smallestFutureDiff) {
        smallestFutureDiff = diff;
        nextCard = card;
      }
    }
  });

  if (liveCard) {
    liveCard.classList.add("is-live");
  } else if (nextCard) {
    nextCard.classList.add("is-next");
  }
}

function renderRounds(matches) {
  const { round1, round2, round3 } = splitByGroupAndMatchday(matches);

  renderColumn("round-1", round1);
  renderColumn("round-2", round2);
  renderColumn("round-3", round3);

  applyHighlight();
}

fetch("./data/wc2026.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  })
  .then((json) => {
    renderRounds(json.matches || []);
  })
  .catch((error) => {
    console.error("Không đọc được wc2026.json:", error);
  });