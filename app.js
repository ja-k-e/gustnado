const container = document.getElementById("container");
const plural = (string, number) =>
  `${string}${parseInt(number) === 1 ? "" : "s"}`;

DATA.forEach(createSection);

function createSection(data) {
  const section = document.createElement("section");
  const li = (stat, word, pluralize = false, extra = "") =>
    `<li><strong>${stat}&nbsp;<label>${
      pluralize ? plural(word, stat) : word
    }&nbsp;${extra}</label></strong></li>`;

  section.innerHTML = `
    <h3>${data.Player.replace("(S)", "<sup>S</sup>")}</h3>
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
