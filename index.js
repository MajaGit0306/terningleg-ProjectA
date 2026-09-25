const start = document.getElementById("start");
const button = document.getElementById("button");
const spilRamme = document.getElementById("spilRamme")

// Denne funktion genere et tilfældigt tal fra 1-6
function genererTal1Til6 () {
  return Math.floor((Math.random() * 6) + 1);
}

let minePointVærdi = 0;
let computerensPointVærdi = 0;

// en addEventListener, som fjerner reglerne og knappen fra startsiden og laver en ny div til spillet, som kommer ind i spilRammen som element 2.
button.addEventListener("click", function() {
  start.style.display = "none";
  button.style.display = "none";

  const game = document.createElement("div");
  game.id = "game";
  spilRamme.insertBefore(game, spilRamme.children[1]);

  // ramme for mine og computerens point
  const minePointRamme = document.createElement("div");
  game.appendChild(minePointRamme);
  minePointRamme.classList.add("point");

  const minePointH3 = document.createElement("h3");
  minePointRamme.appendChild(minePointH3);
  minePointH3.textContent = "MIG";

  const minePoint = document.createElement("p");
  minePointRamme.appendChild(minePoint);
  minePoint.textContent = minePointVærdi;

  const computerensPointRamme = document.createElement("div");
  game.appendChild(computerensPointRamme);
  computerensPointRamme.classList.add("point");

  const computerensPointH3 = document.createElement("h3");
  computerensPointRamme.appendChild(computerensPointH3);
  computerensPointH3.textContent = "COMPUTEREN";

  const computerensPoint = document.createElement("p");
  computerensPointRamme.appendChild(computerensPoint);
  computerensPoint.textContent = computerensPointVærdi;

  // mine og computerens terninger
  const mineTerningerRamme = document.createElement("div");
  game.appendChild(mineTerningerRamme);
  mineTerningerRamme.classList.add("terningerRamme");

  const mineTerningerP = document.createElement("p");
  mineTerningerRamme.appendChild(mineTerningerP);
  mineTerningerP.textContent = `Mine terninger: 0`;

  const mineTerninger = document.createElement("div");
  mineTerningerRamme.appendChild(mineTerninger);
  for(let i = 0; i < 5; ++i) {
    const minTerning = document.createElement("img");
    mineTerninger.appendChild(minTerning);
    minTerning.src = `images/terning-${i + 1}.png`;
    minTerning.classList.add("mineTerninger");
  }

  const computerensTerningerRamme = document.createElement("div");
  game.appendChild(computerensTerningerRamme);
  computerensTerningerRamme.classList.add("terningerRamme");

  const computerensTerningerP = document.createElement("p");
  computerensTerningerRamme.appendChild(computerensTerningerP);
  computerensTerningerP.textContent = `Computerens terninger: 0`;

  const computerensTerninger = document.createElement("div");
  computerensTerningerRamme.appendChild(computerensTerninger);
  for(let i = 0; i < 5; ++i) {
    const computerensTerning = document.createElement("img");
    computerensTerninger.appendChild(computerensTerning);
    computerensTerning.src = `images/terning-${i + 1}.png`;
    computerensTerning.classList.add("computerensTerninger");
  }

  // Knap til at kaste med terningerne
  const buttonKast = document.createElement("button");
  spilRamme.appendChild(buttonKast);
  buttonKast.textContent = "KAST TERNINGER";


  // Tilføj funktion når man trykker på "KAST TERNINGER"
  buttonKast.addEventListener("click", function() {
    // Et array til spillerens terning og dens point
    const slåetTerningerMine = [];
    let minSamledeVærdi = 0;

    // Et array til computerens terning og dens point
    const slåetTerningerComputeren = [];
    let computerensSamledeVærdi = 0;

    // Denne her opdatere terningernes nye værdi, når man slår med terningerne
    const terningerComputeren = document.querySelectorAll(".computerensTerninger");
    const terningerMine = document.querySelectorAll(".mineTerninger")

    for (let i = 0; i < terningerMine.length; ++i) {
      const tal = genererTal1Til6();
      terningerMine[i].src = `images/terning-${tal}.png`;
      slåetTerningerMine.push(tal);
      minSamledeVærdi += tal;
    }

    for (let i = 0; i < terningerComputeren.length; ++i) {
      const tal = genererTal1Til6();
      terningerComputeren[i].src = `images/terning-${tal}.png`;
      slåetTerningerComputeren.push(tal);
      computerensSamledeVærdi += tal;
    }

    // Her opdatere den terningernes værdi for hver kast, så man kan se dem
    mineTerningerP.textContent = `Mine terninger: ${minSamledeVærdi}`;
    computerensTerningerP.textContent = `Computerens terninger: ${computerensSamledeVærdi}`;

    // Denne if/else statement tildeler point udfra hvem der har vundet runden.
    if (minSamledeVærdi > computerensSamledeVærdi) {
      minePointVærdi += 1;
      minePoint.textContent = minePointVærdi;
    } else if (minSamledeVærdi < computerensSamledeVærdi) {
      computerensPointVærdi += 1;
      computerensPoint.textContent = computerensPointVærdi;
    } else {
      minePointVærdi += 0.5;
      computerensPointVærdi += 0.5;
      minePoint.textContent = minePointVærdi;
      computerensPoint.textContent = computerensPointVærdi;
    }

    // Her fjerner den spillet og viser, hvem der vinder
    if (minePointVærdi >= 5 || computerensPointVærdi >= 5) {
      game.style.display = "none";
      const vinderen = document.createElement("div");
      spilRamme.insertBefore(vinderen, spilRamme.children[1]); 
      vinderen.id = "vinderen";

      if (computerensPointVærdi > minePointVærdi) {
        vinderen.textContent = "Computeren vandt";
        vinderen.style.color = "#d54dd8";
      } else if (minePointVærdi > computerensPointVærdi) {
        vinderen.textContent = "Du vandt";
        vinderen.style.color = "#4e47d4";
      } else {
        vinderen.textContent = "Der er uafgjort";
      }

      const startNytSpil = document.createElement("button");
      spilRamme.appendChild(startNytSpil);
      startNytSpil.textContent = "START ET NYT SPIL";
      buttonKast.style.display = "none";

      startNytSpil.addEventListener("click", function() {
        start.style.display = "block";
        button.style.display = "block";
        vinderen.style.display = "none";
        startNytSpil.style.display = "none";
        computerensPointVærdi = 0;
        minePointVærdi = 0;
      })
    }
  })
});