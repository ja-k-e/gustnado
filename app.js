const data = getData();
const container = document.getElementById("container");

const plural = (string, number) => `${string}${number > 1 ? "s" : ""}`;

data.forEach((player) => {
  if (player.player) {
    const hits = player.single + player.double + player.triple + player.homer;
    player.avg = (hits / (player.ab - player.walk)).toFixed(3);
    player.obp = (((hits + player.walk) / player.ab) * 100).toFixed(1);
    player.bags =
      player.single + player.double * 2 + player.triple * 3 + player.homer * 4;
    player.slug = (player.bags / (player.ab - player.walk)).toFixed(3);
    createSection(player);
  }
});

function createSection({
  player,
  games,
  single,
  double,
  triple,
  homer,
  walk,
  score,
  ab,
  out,
  bags,
  slug,
  rbi,
  avg,
  obp,
}) {
  const section = document.createElement("section");
  const li = (start, end) => `<li><strong>${start}&nbsp;${end}</strong></li>`;
  const conditionalLi = (stat, word, pluralize = true) =>
    stat ? li(stat, `${pluralize ? plural(word, stat) : word}`) : "";
  section.innerHTML = `
    <h3>${player}</h3>
    <div class="stats">
      <ul>
        <li class="double-line"></li>
        <li><strong>${avg}&nbsp;AVG</strong></li>
        <li><strong>${slug}&nbsp;SLG</strong></li>
        <li><strong>${obp}%&nbsp;OBP</strong></li>
        ${homer || triple || double || single ? '<li class="line"></li>' : ""}
        ${conditionalLi(homer, "dinger")}
        ${conditionalLi(triple, "triple")}
        ${conditionalLi(double, "double")}
        ${conditionalLi(single, "single")}
        ${rbi || score || bags ? '<li class="line"></li>' : ""}
        ${conditionalLi(rbi, "RBI", false)}
        ${conditionalLi(score, "run")}
        ${conditionalLi(bags, "base")}
        </ul>
      <ul></ul>
    </div>
  `;
  container.appendChild(section);
}

function getData() {
  return [
    {
      player: "Bryan",
      games: 1,
      single: 0,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 3,
      out: 3,
      rbi: 0,
      score: 0,
    },
    {
      player: "Cory",
      games: 1,
      single: 1,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 1,
      ab: 3,
      out: 1,
      rbi: 0,
      score: 1,
    },
    {
      player: "Erik",
      games: 1,
      single: 0,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 4,
      out: 4,
      rbi: 0,
      score: 0,
    },
    {
      player: "Geoff",
      games: 1,
      single: 2,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 4,
      out: 2,
      rbi: 1,
      score: 1,
    },
    {
      player: "Jake",
      games: 1,
      single: 2,
      double: 1,
      triple: 1,
      homer: 0,
      walk: 0,
      ab: 4,
      out: 0,
      rbi: 7,
      score: 1,
    },
    {
      player: "John",
      games: 1,
      single: 2,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 4,
      out: 2,
      rbi: 0,
      score: 0,
    },
    {
      player: "Jonny",
      games: 1,
      single: 1,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 1,
      ab: 4,
      out: 2,
      rbi: 0,
      score: 2,
    },
    {
      player: "Matt",
      games: 1,
      single: 2,
      double: 1,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 4,
      out: 3,
      rbi: 0,
      score: 1,
    },
    {
      player: "Paul",
      games: 1,
      single: 3,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 4,
      out: 1,
      rbi: 0,
      score: 1,
    },
    {
      player: "Travis",
      games: 1,
      single: 2,
      double: 2,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 4,
      out: 0,
      rbi: 2,
      score: 4,
    },
    {
      player: "",
      games: 0,
      single: 0,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 0,
      out: 0,
      rbi: 0,
      score: 0,
    },
    {
      player: "",
      games: 0,
      single: 0,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 0,
      out: 0,
      rbi: 0,
      score: 0,
    },
    {
      player: "",
      games: 0,
      single: 0,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 0,
      out: 0,
      rbi: 0,
      score: 0,
    },
    {
      player: "",
      games: 0,
      single: 0,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 0,
      out: 0,
      rbi: 0,
      score: 0,
    },
    {
      player: "",
      games: 0,
      single: 0,
      double: 0,
      triple: 0,
      homer: 0,
      walk: 0,
      ab: 0,
      out: 0,
      rbi: 0,
      score: 0,
    },
  ];
}
