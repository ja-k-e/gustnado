const data = getData();
const container = document.getElementById("container");

const plural = (string, number) => `${string}${number === 1 ? "" : "s"}`;

data.forEach((playerData) => {
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
    pobm, // players on base moved
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
    // players on base moved rate
    playerData.pobmr = `${Math.round((pobm / (pob || 1)) * 100)}%`;
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
  pobab,
  pobabs,
  pobm,
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
        ${s ? li(s, "run", true, "scored") : ""}
        ${bags ? li(bags, "total bag", true) : ""}
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
        ${pobm ? li(pobm, "POBM") : ""}
        ${li(abro, "ABRO", true)}
        ${li(ie, "<strike>inning</strike>")}
      </ul>
    </div>
  `;
  container.appendChild(section);
}

function getData() {
  return [
    {
      player: "Bryan",
      h1: 0,
      h2: 0,
      h3: 0,
      hr: 0,
      bb: 0,
      ab: 3,
      abo: 3,
      abro: 3,
      o: 3,
      rbi: 0,
      s: 0,
      ie: 0,
      sioab: 1,
      siorab: 0,
      pobab: 2,
      pobabs: 0,
      pob: 5,
      pobm: 0,
      g: 1,
    },
    {
      player: "Cory",
      h1: 1,
      h2: 0,
      h3: 0,
      hr: 0,
      bb: 1,
      ab: 3,
      abo: 1,
      abro: 1,
      o: 1,
      rbi: 0,
      s: 1,
      ie: 1,
      sioab: 0,
      siorab: 0,
      pobab: 3,
      pobabs: 2,
      pob: 5,
      pobm: 3,
      g: 1,
    },
    {
      player: "Erik",
      h1: 0,
      h2: 0,
      h3: 0,
      hr: 0,
      bb: 0,
      ab: 4,
      abo: 4,
      abro: 4,
      o: 4,
      rbi: 0,
      s: 0,
      ie: 2,
      sioab: 0,
      siorab: 0,
      pobab: 4,
      pobabs: 0,
      pob: 6,
      pobm: 0,
      g: 1,
    },
    {
      player: "Geoff",
      h1: 2,
      h2: 0,
      h3: 0,
      hr: 0,
      bb: 0,
      ab: 4,
      abo: 2,
      abro: 2,
      o: 2,
      rbi: 1,
      s: 1,
      ie: 1,
      sioab: 2,
      siorab: 1,
      pobab: 2,
      pobabs: 1,
      pob: 2,
      pobm: 1,
      g: 1,
    },
    {
      player: "Jake",
      h1: 2,
      h2: 1,
      h3: 1,
      hr: 0,
      bb: 0,
      ab: 4,
      abo: 0,
      abro: 0,
      o: 0,
      rbi: 7,
      s: 1,
      ie: 0,
      sioab: 0,
      siorab: 0,
      pobab: 4,
      pobabs: 4,
      pob: 9,
      pobm: 9,
      g: 1,
    },
    {
      player: "John",
      h1: 2,
      h2: 0,
      h3: 0,
      hr: 0,
      bb: 0,
      ab: 4,
      abo: 2,
      abro: 4,
      o: 2,
      rbi: 0,
      s: 0,
      ie: 1,
      sioab: 1,
      siorab: 0,
      pobab: 3,
      pobabs: 1,
      pob: 5,
      pobm: 1,
      g: 1,
    },
    {
      player: "Jonny",
      h1: 1,
      h2: 0,
      h3: 0,
      hr: 0,
      bb: 1,
      ab: 4,
      abo: 2,
      abro: 2,
      o: 2,
      rbi: 1,
      s: 2,
      ie: 1,
      sioab: 3,
      siorab: 1,
      pobab: 1,
      pobabs: 0,
      pob: 6,
      pobm: 3,
      g: 1,
    },
    {
      player: "Matt",
      h1: 2,
      h2: 1,
      h3: 0,
      hr: 0,
      bb: 0,
      ab: 4,
      abo: 1,
      abro: 1,
      o: 3,
      rbi: 0,
      s: 1,
      ie: 0,
      sioab: 2,
      siorab: 1,
      pobab: 2,
      pobabs: 2,
      pob: 2,
      pobm: 2,
      g: 1,
    },
    {
      player: "Paul",
      h1: 3,
      h2: 0,
      h3: 0,
      hr: 0,
      bb: 0,
      ab: 4,
      abo: 1,
      abro: 1,
      o: 1,
      rbi: 0,
      s: 1,
      ie: 0,
      sioab: 0,
      siorab: 0,
      pobab: 4,
      pobabs: 4,
      pob: 5,
      pobm: 5,
      g: 1,
    },
    {
      player: "Travis",
      h1: 2,
      h2: 2,
      h3: 0,
      hr: 0,
      bb: 0,
      ab: 4,
      abo: 0,
      abro: 0,
      o: 0,
      rbi: 2,
      s: 4,
      ie: 0,
      sioab: 2,
      siorab: 2,
      pobab: 2,
      pobabs: 2,
      pob: 4,
      pobm: 4,
      g: 1,
    },
  ];
}
