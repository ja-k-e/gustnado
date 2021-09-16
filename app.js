const container = document.getElementById("container");
const plural = (string, number) =>
  `${string}${parseInt(number) === 1 ? "" : "s"}`;

DATA.forEach((playerData) => {
  const {
    player, // name
    h1, // singles
    h2, // doubles
    h3, // triples
    hr, // homers
    bb, // walks
    ab, // plate appearances
    abo, // plate appearance outs
    abro, // plate appearances that resulted in outs
    o, // total outs
    rbi, // runs batted in
    s, // scores
    ie, // innings ended
    sio, // start it off
    sior, // start it off right
    pob, // players on base
    adv, // advanced players
    g,
  } = playerData;
  if (player) {
    const hits = h1 + h2 + h3 + hr;
    // batting average (hits / at bats)
    playerData.avg = (hits / (ab - bb)).toFixed(3);
    // on base percentage (on base / plate appearances)
    playerData.obp = (((hits + bb) / ab) * 100).toFixed(1);
    // total bases
    playerData.bags = h1 + h2 * 2 + h3 * 3 + hr * 4;
    // slugging %
    playerData.slug = (playerData.bags / (ab - bb)).toFixed(3);
    // players advanced rate
    playerData.advr = `${Math.round((adv / (pob || 1)) * 100)}%`;
    // start it off right rate
    playerData.siorr = `${Math.round((sior / (sio || 1)) * 100)}%`;
    // total outs per plate appearance
    playerData.outr = `${Math.round((o / ab) * 100)}%`;
    // scores per gam
    playerData.spg = (s / g).toFixed(1);
    // at bat outs per game
    playerData.opg = (abo / g).toFixed(1);
    // bags per game
    playerData.bpg = (playerData.bags / g).toFixed(1);
    // hits per game
    playerData.hpg = (hits / g).toFixed(1);
    // rbis per game
    playerData.rbipg = (rbi / g).toFixed(1);
    // innings ended per game
    playerData.iepg = (ie / g).toFixed(1);
    createSection(playerData);
  }
});

function createSection({
  ab,
  abo,
  abro,
  avg,
  bags,
  bpg,
  g,
  h1,
  h2,
  h3,
  hpg,
  hr,
  ie,
  iepg,
  obp,
  opg,
  player,
  pob,
  pobab,
  pobabs,
  adv,
  rbi,
  rbipg,
  s,
  sioab,
  siorab,
  slug,
  spg,
}) {
  const section = document.createElement("section");
  const li = (stat, word, pluralize = false, extra = "") =>
    `<li><strong>${stat}&nbsp;<label>${
      pluralize ? plural(word, stat) : word
    }&nbsp;${extra}</label></strong></li>`;
  section.innerHTML = `
    <h3>${player}</h3>
    <div class="stats">
      <ul>
        <li class="double-line"></li>
        ${li(avg, "AVG")}
        ${li(slug, "SLG")}
        ${li(`${obp}%`, "OBP")}
        ${bags ? '<li class="line"></li>' : ""}
        ${hr ? li(hr, "dinger", true) : ""}
        ${h3 ? li(h3, "triple", true) : ""}
        ${h2 ? li(h2, "double", true) : ""}
        ${h1 ? li(h1, "single", true) : ""}
        ${rbi || s || bags ? '<li class="line"></li>' : ""}
        ${rbi ? li(rbi, "RBI", true) : ""}
        ${adv ? li(adv, "advanced") : ""}
        ${bags ? li(bags, "total bag", true) : ""}
        ${s ? li(s, "run", true, "scored") : ""}
        <li class="line"></li>
        <li class="label"><strong><label>Per Game (${g})</label></strong></li>
        ${li(hpg, "hit", true)}
        ${li(rbipg, "RBI", true)}
        ${li(bpg, "bag", true)}
        ${li(spg, "score", true)}
        ${li(opg, "out", true)}
        <li class="line"></li>
        <li class="label"><strong><label>Momentum (${ab})</label></strong></li>
        ${li(`${siorab}/${sioab}`, "lead")}
        ${li(`${pobabs}/${pobab}`, "keep")}
        ${li(abro, "ABRO", true)}
        ${li(ie, "IKO", true)}
      </ul>
    </div>
  `;
  container.appendChild(section);
}
