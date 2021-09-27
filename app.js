const container = document.getElementById("container");
const plural = (string, number) =>
  `${string}${parseInt(number) === 1 ? "" : "s"}`;
const subProof = (player) => player.replace("(S)", "<sup>S</sup>");
DATA.forEach(createSection);

function createSection(data) {
  const section = document.createElement("section");
  const li = (stat, word, pluralize = false, extra = "") =>
    `<li><strong>${stat}&nbsp;<label>${
      pluralize ? plural(word, stat) : word
    }&nbsp;${extra}</label></strong></li>`;

  section.innerHTML = `
    <h3>${subProof(data.Player)}</h3>
    <div class="stats">
      <ul>
        <li class="double-line"></li>
        ${li(data.AVG.toFixed(3), "AVG")}
        ${li(data.SLG.toFixed(3), "SLG")}
        ${li(`${Math.round(data.OBP * 100)}%`, "OBP")}
        ${data.Bags ? '<li class="line"></li>' : ""}
        ${data.HR ? li(data.HR, "homer", true) : ""}
        ${data.H3 ? li(data.H3, "triple", true) : ""}
        ${data.H2 ? li(data.H2, "double", true) : ""}
        ${data.H1 ? li(data.H1, "single", true) : ""}
        ${data.RBI || data.S || data.Bags ? '<li class="line"></li>' : ""}
        ${data.RBI ? li(data.RBI, "RBI", true) : ""}
        ${data.ADV ? li(data.ADV, "advanced") : ""}
        ${data.Bags ? li(data.Bags, "total bag", true) : ""}
        ${data.S ? li(data.S, "run", true, "scored") : ""}
        <li class="line"></li>
        <li class="label"><strong><label>Per Game (${
          data.G
        })</label></strong></li>
        ${li(data.HPG, "hit", true)}
        ${li(data.RBIPG, "RBI", true)}
        ${li(data.BPG, "bag", true)}
        ${li(data.SPG, "score", true)}
        ${li(data.OPG, "out", true)}
        <li class="line"></li>
        <li class="label"><strong><label>Momentum (${
          data.PA
        })</label></strong></li>
        ${li(
          `${Math.round(data.MLRate * 100)}%`,
          "Lead",
          false,
          `${data.NOBPA}`
        )}
        ${li(
          `${Math.round(data.MKRate * 100)}%`,
          "Keep",
          false,
          `${data.POBPA}`
        )}
        ${li(`${Math.round(data.ADVRate * 100)}%`, "ADV")}
        ${li(`${Math.round(data.RBIRate * 100)}%`, "RBI")}
        ${li(`${Math.round(data.PARORate * 100)}%`, "PARO")}
        ${li(data.IKO, "IKO", true)}
      </ul>
    </div>
  `;
  container.appendChild(section);
}

const tableHeadRow = document.querySelector("thead tr");
const tableBody = document.querySelector("tbody");
const tableInfo = document.getElementById("table-info");
const defaultSort = "Player";
let sort = defaultSort;
let sortOrder = "asc";

drawTableForPlayers();

for (let key in LABELS) {
  const th = document.createElement("th");
  const button = document.createElement("button");
  button.innerText = key;
  button.setAttribute("title", LABELS[key]);
  button.addEventListener("click", () => {
    sortOrder = key !== sort ? "desc" : sortOrder === "asc" ? "desc" : "asc";
    sort = key;
    drawTableForPlayers(sort, sortOrder);
  });
  th.appendChild(button);
  tableHeadRow.appendChild(th);
}

function drawTableForPlayers() {
  const sorted = DATA.sort((a, b) => {
    if (a.Player === "Team") {
      return 1;
    } else if (b.Player === "Team") {
      return -1;
    }
    if (a[sort] > b[sort]) {
      return sortOrder === "asc" ? 1 : -1;
    } else if (a[sort] < b[sort]) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (a.Player > b.Player) {
      return 1;
    } else if (a.Player < b.Player) {
      return -1;
    } else {
      return 0;
    }
  });
  const labels = Object.keys(LABELS);
  tableBody.innerHTML = "";
  sorted.forEach((data) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-player", data.Player);
    if (data.Player.match("(S)")) {
      tr.setAttribute("data-sub", "true");
    }
    tableBody.appendChild(tr);
    labels.forEach((label, i) => {
      const td = document.createElement("td");
      const onOn = () => {
        tableInfo.innerText = `${label}: ${LABELS[label]}`;
        tr.classList.add("active");
        if (label !== "Player") {
          tableBody
            .querySelectorAll(`td:nth-child(${i + 1})`)
            .forEach((td) => td.classList.add("active"));
        }
      };
      const onOff = () => {
        tr.classList.remove("active");
        tableInfo.innerHTML = "&nbsp;";
        tableBody
          .querySelectorAll(`td:nth-child(${i + 1})`)
          .forEach((td) => td.classList.remove("active"));
      };
      td.addEventListener("click", () => {
        onOn();
      });
      td.addEventListener("mouseenter", onOn);
      td.addEventListener("mouseleave", onOff);

      const formatted = FORMATTERS[label]
        ? FORMATTERS[label](data[label])
        : data[label];
      td.innerHTML =
        label === "Player"
          ? subProof(formatted).replace(/ +/, "&nbsp;")
          : formatted;
      tr.appendChild(td);
    });
  });
}
