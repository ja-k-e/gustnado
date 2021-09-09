const data = getData();
const table = document.getElementById("table");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

const labels = {
  player: "Player",
  games: "G",
  single: "1B",
  double: "2B",
  triple: "3B",
  homer: "HR",
  walk: "BB",
  score: "R",
  ab: "AB",
  out: "Out",
  rbi: "RBI",
  avg: "Avg",
  obp: "OBP",
};
const sortables = [
  "single",
  "double",
  "triple",
  "homer",
  "walk",
  "score",
  "ab",
  "out",
  "rbi",
];

const labelKeys = Object.keys(labels);

const theadtr = document.createElement("tr");
thead.appendChild(theadtr);
labelKeys.forEach((value) => {
  const th = document.createElement("th");
  th.innerText = labels[value];
  th.addEventListener("click", () =>
    table.style.setProperty("--sort", `var(--sort-${value})`)
  );
  theadtr.appendChild(th);
});

data.forEach((player, i) => {
  if (player.player) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const hits = player.single + player.double + player.triple + player.homer;
    player.avg = (hits / (player.ab - player.walk)).toFixed(3);
    player.obp = ((hits + player.walk) / player.ab).toFixed(3);

    tr.style.setProperty("--sort-player", i);
    tr.style.setProperty(
      "--sort-avg",
      Math.round(parseFloat(player.avg) * 1000)
    );
    tr.style.setProperty(
      "--sort-obp",
      Math.round(parseFloat(player.obp) * 1000)
    );
    sortables.forEach((sortable) => {
      tr.style.setProperty(`--sort-${sortable}`, player[sortable]);
    });
    labelKeys.forEach((key) => {
      const td = document.createElement("td");
      td.innerText = player[key];
      tr.appendChild(td);
    });
  }
});

function getData() {
  return [
    {
      player: "Albaugh, Jake",
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
      player: "Davenport, Paul",
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
      player: "Doran, Travis",
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
      player: "Eddinger, Geoffrey",
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
      player: "Ernst, John",
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
      player: "Hoffner, Jonny",
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
      player: "Skjervem, Cory",
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
      player: "Skjervem, Erik",
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
      player: "Weinstein, Bryan",
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
      player: "Winzenried, Matt",
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
