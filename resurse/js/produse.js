// Variabile globale pentru paginare
const K = 6;
let paginaCurenta = 1;
let produseVizibile = [];

function valideazaInputuriText() {
  let inputuriText = document.querySelectorAll("input[type='text'], textarea");

  for (let input of inputuriText) {
    if (/\d/.test(input.value)) {
      alert(
        `Valoarea introdusă in textarea sau in inputul de tip text nu este valida`
      );
      return false;
    }
  }
  return true;
}

function eliminaDiacritice(text) {
  console.log(text);
  return text
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function actualizeazaProduseVizibile() {
  let produse = document.getElementsByClassName("produs");
  produseVizibile = [];

  for (let prod of produse) {
    if (prod.style.display !== "none") {
      produseVizibile.push(prod);
    }
  }
}

function afiseazaPagina(numerePagina) {
  paginaCurenta = numerePagina;

  for (let prod of produseVizibile) {
    prod.style.display = "none";
  }

  let indexStart = (paginaCurenta - 1) * K;
  let indexEnd = Math.min(indexStart + K, produseVizibile.length);

  for (let i = indexStart; i < indexEnd; i++) {
    produseVizibile[i].style.display = "block";
  }

  actualizeazaInfoPaginare();
  actualizeazaLinkuriPaginare();
}

function actualizeazaInfoPaginare() {
  let indexStart = (paginaCurenta - 1) * K + 1;
  let indexEnd = Math.min(paginaCurenta * K, produseVizibile.length);
  let totalProduse = produseVizibile.length;

  document.getElementById(
    "info-paginare"
  ).textContent = `${indexStart}-${indexEnd} din ${totalProduse}`;
}

function afiseazaPagina(numerePagina) {
  paginaCurenta = numerePagina;

  for (let prod of produseVizibile) {
    prod.style.display = "none";
  }

  let indexStart = (paginaCurenta - 1) * K;
  let indexEnd = Math.min(indexStart + K, produseVizibile.length);

  for (let i = indexStart; i < indexEnd; i++) {
    produseVizibile[i].style.display = "block";
  }

  actualizeazaInfoPaginare();
  actualizeazaLinkuriPaginare();
}

function actualizeazaInfoPaginare() {
  let indexStart = (paginaCurenta - 1) * K + 1;
  let indexEnd = Math.min(paginaCurenta * K, produseVizibile.length);
  let totalProduse = produseVizibile.length;

  document.getElementById(
    "info-paginare"
  ).textContent = `${indexStart}-${indexEnd} din ${totalProduse}`;
}

function actualizeazaLinkuriPaginare() {
  let containerLinkuri = document.getElementById("linkuri-paginare");
  containerLinkuri.innerHTML = "";

  if (produseVizibile.length <= K) {
    document.getElementById("controale-paginare").style.display = "none";
    return;
  }

  document.getElementById("controale-paginare").style.display = "flex";

  let totalPagini = Math.ceil(produseVizibile.length / K);

  let liPrev = document.createElement("li");
  liPrev.className = `page-item ${paginaCurenta === 1 ? "disabled" : ""}`;
  liPrev.innerHTML = `<a class="page-link" href="#" aria-label="Anterior">
    <span aria-hidden="true">&laquo;</span>
  </a>`;
  if (paginaCurenta > 1) {
    liPrev.addEventListener("click", function (e) {
      e.preventDefault();
      afiseazaPagina(paginaCurenta - 1);
    });
  }
  containerLinkuri.appendChild(liPrev);

  for (let i = 1; i <= totalPagini; i++) {
    let li = document.createElement("li");
    li.className = `page-item ${i === paginaCurenta ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;

    li.addEventListener("click", function (e) {
      e.preventDefault();
      afiseazaPagina(i);
    });

    containerLinkuri.appendChild(li);
  }

  let liNext = document.createElement("li");
  liNext.className = `page-item ${
    paginaCurenta === totalPagini ? "disabled" : ""
  }`;
  liNext.innerHTML = `<a class="page-link" href="#" aria-label="Următor">
    <span aria-hidden="true">&raquo;</span>
  </a>`;
  if (paginaCurenta < totalPagini) {
    liNext.addEventListener("click", function (e) {
      e.preventDefault();
      afiseazaPagina(paginaCurenta + 1);
    });
  }
  containerLinkuri.appendChild(liNext);
}

// function aplicaFiltrare() {
//   if (!valideazaInputuriText()) return;

//   let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase();
//   let minCapacitate = parseInt(document.getElementById("inp-capacitate").value);

//   let vectRadioPret = document.getElementsByName("pret_rad");
//   let minPret = null,
//     maxPret = null;
//   for (let rad of vectRadioPret) {
//     if (rad.checked && rad.value !== "toate") {
//       [minPret, maxPret] = rad.value.split(":").map(Number);
//     }
//   }

//   let inpCategorie = document
//     .getElementById("inp-categorie")
//     .value.trim()
//     .toLowerCase();
//   let inpData = document.getElementById("inp-data").value;
//   let includeParcare = document.getElementById("inp-parcare").checked;
//   let inpFacilitati = document
//     .getElementById("inp-facilitati")
//     .value.toLowerCase()
//     .split(",")
//     .map((f) => f.trim())
//     .filter((f) => f);

//   let selectTipAcces = document.getElementById("inp-tip-acces");
//   let tipuriAccesSelectate = Array.from(selectTipAcces.selectedOptions).map(
//     (opt) => opt.value.toLowerCase()
//   );

//   let produse = document.getElementsByClassName("produs");
//   for (let prod of produse) {
//     let afiseaza = true;

//     let nume = prod
//       .getElementsByClassName("val-nume")[0]
//       .innerHTML.toLowerCase();
//     if (!eliminaDiacritice(nume).includes(eliminaDiacritice(inpNume)))
//       afiseaza = false;

//     let capacitate = parseInt(
//       prod.getElementsByClassName("val-capacitate")[0].innerHTML
//     );
//     if (capacitate < minCapacitate) afiseaza = false;

//     let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
//     if (minPret != null && !(minPret <= pret && pret <= maxPret))
//       afiseaza = false;

//     let categorie = prod
//       .getElementsByClassName("val-categorie")[0]
//       .innerHTML.toLowerCase();
//     if (
//       eliminaDiacritice(inpCategorie) !== "toate" &&
//       eliminaDiacritice(inpCategorie) !== eliminaDiacritice(categorie)
//     )
//       afiseaza = false;

//     let dataProdus = prod
//       .getElementsByClassName("val-data-eveniment")[0]
//       .getAttribute("datetime");
//     if (inpData && inpData !== dataProdus) afiseaza = false;

//     let parcareProdus = prod
//       .getElementsByClassName("val-parcare")[0]
//       .innerHTML.trim()
//       .toLowerCase();
//     if (includeParcare && parcareProdus !== "da") afiseaza = false;

//     let facilitatiProdus = prod
//       .getElementsByClassName("val-facilitati")[0]
//       .innerHTML.toLowerCase();
//     if (
//       inpFacilitati.length > 0 &&
//       !inpFacilitati.every((f) => facilitatiProdus.includes(f))
//     )
//       afiseaza = false;

//     let tipAccesProdus = prod
//       .getElementsByClassName("val-tip-acces")[0]
//       .innerHTML.trim()
//       .toLowerCase();
//     if (
//       tipuriAccesSelectate.length > 0 &&
//       !tipuriAccesSelectate.includes(tipAccesProdus)
//     )
//       afiseaza = false;

//     prod.style.display = afiseaza ? "block" : "none";
//   }

//   actualizeazaProduseVizibile();

//   let exista = produseVizibile.length > 0;
//   document.getElementById("mesaj-nu-exista").style.display = exista
//     ? "none"
//     : "block";

//   if (exista) {
//     afiseazaPagina(1);
//   } else {
//     document.getElementById("controale-paginare").style.display = "none";
//   }
// }

function aplicaFiltrare() {
  if (!valideazaInputuriText()) return;

  let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase();
  let minCapacitate = parseInt(document.getElementById("inp-capacitate").value);

  let vectRadioPret = document.getElementsByName("pret_rad");
  let minPret = null,
    maxPret = null;
  for (let rad of vectRadioPret) {
    if (rad.checked && rad.value !== "toate") {
      [minPret, maxPret] = rad.value.split(":").map(Number);
    }
  }

  let inpCategorie = document
    .getElementById("inp-categorie")
    .value.trim()
    .toLowerCase();
  let inpData = document.getElementById("inp-data").value;
  let includeParcare = document.getElementById("inp-parcare").checked;
  let inpFacilitati = document
    .getElementById("inp-facilitati")
    .value.toLowerCase()
    .split(",")
    .map((f) => f.trim())
    .filter((f) => f);

  let selectTipAcces = document.getElementById("inp-tip-acces");
  let tipuriAccesSelectate = Array.from(selectTipAcces.selectedOptions).map(
    (opt) => opt.value.toLowerCase()
  );

  let produse = document.getElementsByClassName("produs");
  for (let prod of produse) {
    let afiseaza = true;

    let nume = prod
      .getElementsByClassName("val-nume")[0]
      .innerHTML.toLowerCase();
    // if (!nume.includes(inpNume)) afiseaza = false;
    if (!eliminaDiacritice(nume).includes(eliminaDiacritice(inpNume)))
      afiseaza = false;
    let capacitate = parseInt(
      prod.getElementsByClassName("val-capacitate")[0].innerHTML
    );
    if (capacitate < minCapacitate) afiseaza = false;

    let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
    if (minPret != null && !(minPret <= pret && pret <= maxPret))
      afiseaza = false;

    let categorie = prod
      .getElementsByClassName("val-categorie")[0]
      .innerHTML.toLowerCase();
    if (inpCategorie !== "toate" && inpCategorie !== categorie)
      afiseaza = false;

    let dataProdus = prod
      .getElementsByClassName("val-data-eveniment")[0]
      .getAttribute("datetime");
    if (inpData && inpData !== dataProdus) afiseaza = false;

    let parcareProdus = prod
      .getElementsByClassName("val-parcare")[0]
      .innerHTML.trim()
      .toLowerCase();
    if (includeParcare && parcareProdus !== "da") afiseaza = false;

    let facilitatiProdus = prod
      .getElementsByClassName("val-facilitati")[0]
      .innerHTML.toLowerCase();
    // if (
    //   inpFacilitati.length > 0 &&
    //   !inpFacilitati.every((f) => facilitatiProdus.includes(f))
    // )
    //   afiseaza = false;
    if (
      inpFacilitati.length > 0 &&
      !inpFacilitati.every((f) =>
        eliminaDiacritice(facilitatiProdus).includes(eliminaDiacritice(f))
      )
    )
      afiseaza = false;

    let tipAccesProdus = prod
      .getElementsByClassName("val-tip-acces")[0]
      .innerHTML.trim()
      .toLowerCase();
    if (
      tipuriAccesSelectate.length > 0 &&
      !tipuriAccesSelectate.includes(tipAccesProdus)
    )
      afiseaza = false;

    prod.style.display = afiseaza ? "block" : "none";
  }

  let exista = Array.from(produse).some((p) => p.style.display !== "none");
  document.getElementById("mesaj-nu-exista").style.display = exista
    ? "none"
    : "block";
}

window.onload = function () {
  let containerProduse = document.querySelector(".grid-produse");
  let ordineInitiala = Array.from(
    document.getElementsByClassName("produs")
  ).map((p) => p.id);

  actualizeazaProduseVizibile();
  afiseazaPagina(1);

  btn = document.getElementById("filtrare");
  btn.onclick = function () {
    if (!valideazaInputuriText()) return;

    // nume
    let inpNume = document
      .getElementById("inp-nume")
      .value.trim()
      .toLowerCase();

    // capacitate minima
    let minCapacitate = parseInt(
      document.getElementById("inp-capacitate").value
    );

    // pret
    let vectRadioPret = document.getElementsByName("pret_rad");
    let minPret = null,
      maxPret = null;
    for (let rad of vectRadioPret) {
      if (rad.checked) {
        if (rad.value != "toate") {
          [minPret, maxPret] = rad.value.split(":").map((v) => parseFloat(v));
        }
        break;
      }
    }

    let produse = document.getElementsByClassName("produs");
    for (let prod of produse) {
      prod.style.display = "none";
      // nume
      let nume = prod
        .getElementsByClassName("val-nume")[0]
        .innerHTML.toLowerCase();
      let cond1 = nume.includes(inpNume);

      // capacitate
      let capacitate = parseInt(
        prod.getElementsByClassName("val-capacitate")[0].innerHTML.toLowerCase()
      );
      let cond2 = capacitate >= minCapacitate;

      // pret
      let pret = parseFloat(
        prod.getElementsByClassName("val-pret")[0].innerHTML.toLowerCase()
      );
      let cond3 = minPret == null || (minPret <= pret && pret <= maxPret);

      // categorie mare
      let inpCategorie = document
        .getElementById("inp-categorie")
        .value.trim()
        .toLowerCase();
      let categorie = prod
        .getElementsByClassName("val-categorie")[0]
        .innerHTML.toLowerCase();
      let cond4 = inpCategorie == "toate" || inpCategorie == categorie;

      // data meci
      let inpData = document.getElementById("inp-data").value;
      let dataProdus = prod
        .getElementsByClassName("val-data-eveniment")[0]
        .getAttribute("datetime");
      let cond5 = inpData === "" || inpData === dataProdus;

      // parcare
      let includeParcare = document.getElementById("inp-parcare").checked;
      let parcareProdus = prod
        .getElementsByClassName("val-parcare")[0]
        .innerHTML.trim()
        .toLowerCase();
      let cond6 = !includeParcare || parcareProdus == "da";

      // facilitati
      let inpFacilitati = document
        .getElementById("inp-facilitati")
        .value.toLowerCase()
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);
      let facilitatiProdus = prod
        .getElementsByClassName("val-facilitati")[0]
        .innerHTML.toLowerCase();
      let cond7 =
        inpFacilitati.length === 0 ||
        inpFacilitati.every((f) => facilitatiProdus.includes(f));

      // tip acces
      let selectTipAcces = document.getElementById("inp-tip-acces");
      let tipuriAccesSelectate = Array.from(selectTipAcces.selectedOptions).map(
        (opt) => opt.value.toLowerCase()
      );
      let tipAccesProdus = prod
        .getElementsByClassName("val-tip-acces")[0]
        .innerHTML.trim()
        .toLowerCase();
      let cond8 =
        tipuriAccesSelectate.length === 0 ||
        tipuriAccesSelectate.includes(tipAccesProdus);

      if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8)
        prod.style.display = "block";
    }

    actualizeazaProduseVizibile();
    let existaProdusAfisat = produseVizibile.length > 0;

    let mesaj = document.getElementById("mesaj-nu-exista");
    if (!existaProdusAfisat) {
      mesaj.style.display = "block";
      document.getElementById("controale-paginare").style.display = "none";
    } else {
      mesaj.style.display = "none";
      afiseazaPagina(1);
    }
  };

  document.getElementById("inp-nume").addEventListener("input", aplicaFiltrare);
  document
    .getElementById("inp-categorie")
    .addEventListener("change", aplicaFiltrare);
  document
    .getElementById("inp-data")
    .addEventListener("change", aplicaFiltrare);
  document
    .getElementById("inp-capacitate")
    .addEventListener("input", function () {
      document.getElementById("infoCapacitate").innerHTML = `(${this.value})`;
      aplicaFiltrare();
    });
  document
    .getElementById("inp-parcare")
    .addEventListener("change", aplicaFiltrare);
  document
    .getElementById("inp-facilitati")
    .addEventListener("input", aplicaFiltrare);
  document
    .getElementById("inp-tip-acces")
    .addEventListener("change", aplicaFiltrare);

  let radios = document.getElementsByName("pret_rad");
  for (let radio of radios) {
    radio.addEventListener("change", aplicaFiltrare);
  }

  // range capacitate onchange
  document.getElementById("inp-capacitate").onchange = function () {
    document.getElementById("infoCapacitate").innerHTML = `(${this.value})`;
  };

  document.getElementById("resetare").onclick = function () {
    if (!confirm("Ești sigur că vrei să resetezi filtrele?")) {
      return;
    }
    // reset pentru mesajul ca nu exista produse
    document.getElementById("mesaj-nu-exista").style.display = "none";

    // Reset nume
    document.getElementById("inp-nume").value = "";

    // Reset capacitate
    document.getElementById("inp-capacitate").value = 0;
    document.getElementById("infoCapacitate").innerHTML = `(0)`;

    // Reset data
    document.getElementById("inp-data").value = "";

    // Reset parcare
    document.getElementById("inp-parcare").checked = false;

    // Reset facilitati
    document.getElementById("inp-facilitati").value = "";

    // Reset tip acces
    let selectTipAcces = document.getElementById("inp-tip-acces");
    for (let opt of selectTipAcces.options) {
      opt.selected = false;
    }

    // Reset radio pret
    let pretRadio = document.getElementsByName("pret_rad");
    for (let rad of pretRadio) {
      if (rad.value == "toate") rad.checked = true;
    }

    // Reset categorie
    document.getElementById("sel-toate").selected = true;

    // afiseaza toate produsele

    let prodAux = document.getElementsByClassName("produs");
    for (let prod of prodAux) {
      prod.style.display = "block";
    }

    // Restaurează ordinea initiala a produselor
    for (let id of ordineInitiala) {
      let prod = document.getElementById(id);
      containerProduse.appendChild(prod);
    }
  };

  document.getElementById("sortCrescRaport").onclick = function () {
    if (!valideazaInputuriText()) return;

    sorteazaRaport(1);
  };

  document.getElementById("sortDescrescRaport").onclick = function () {
    if (!valideazaInputuriText()) return;

    sorteazaRaport(-1);
  };

  function sorteazaRaport(semn) {
    let produse = document.getElementsByClassName("produs");
    let vProduse = Array.from(produse);

    vProduse.sort(function (a, b) {
      let pretA = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
      let pretB = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
      let capA = parseFloat(
        a.getElementsByClassName("val-capacitate")[0].innerHTML
      );
      let capB = parseFloat(
        b.getElementsByClassName("val-capacitate")[0].innerHTML
      );

      // evita impartirea la 0
      let raportA = pretA > 0 ? capA / pretA : 0;
      let raportB = pretB > 0 ? capB / pretB : 0;

      if (raportA != raportB) {
        return (raportA - raportB) * semn;
      }

      let zonaA = a
        .getElementsByClassName("val-tip-acces")[0]
        .innerHTML.trim()
        .toLowerCase(); // fallback
      let zonaTag = a.getElementsByClassName("val-zona-acces");
      if (zonaTag.length > 0) {
        zonaA = zonaTag[0].innerHTML.trim().toLowerCase();
      }

      let zonaB = b
        .getElementsByClassName("val-tip-acces")[0]
        .innerHTML.trim()
        .toLowerCase();
      let zonaBTag = b.getElementsByClassName("val-zona-acces");
      if (zonaBTag.length > 0) {
        zonaB = zonaBTag[0].innerHTML.trim().toLowerCase();
      }

      return zonaA.localeCompare(zonaB) * semn;
    });

    for (let prod of vProduse) {
      prod.parentNode.appendChild(prod);
    }
  }

  window.onkeydown = function (e) {
    if (e.key == "ç" && e.altKey) {
      let produse = document.getElementsByClassName("produs");
      let sumaPreturi = 0;
      for (let prod of produse) {
        if (prod.style.display != "none") {
          let pret = parseFloat(
            prod.getElementsByClassName("val-pret")[0].innerHTML.toLowerCase()
          );
          sumaPreturi += pret;
        }
      }

      if (!document.getElementById("suma_preturi")) {
        let pRezultat = document.createElement("p");
        pRezultat.innerHTML = sumaPreturi;
        pRezultat.id = "suma_preturi";
        let p = document.getElementById("p-suma");
        p.parentElement.insertBefore(pRezultat, p.nextElementSibling);
        setTimeout(function () {
          let p1 = document.getElementById("suma_preturi");
          if (p1) p1.remove();
        }, 2000);
      }
      //  else {
      //   document.getElementById("suma_preturi").innerHTML = sumaPreturi;
      // }
    }
  };

  document.getElementById("btn-calcul-media").onclick = function () {
    if (!valideazaInputuriText()) return;

    let produse = document.getElementsByClassName("produs");
    let suma = 0;
    let nr = 0;

    for (let prod of produse) {
      if (prod.style.display != "none") {
        let pret = parseFloat(
          prod.getElementsByClassName("val-pret")[0].innerHTML.toLowerCase()
        );
        suma += pret;
        nr++;
      }
    }

    if (nr === 0) return;

    let media = suma / nr;

    // creare div rezultat
    let divRezultat = document.createElement("div");
    divRezultat.innerText = `Media prețurilor este: ${media.toFixed(2)}`;
    divRezultat.style.position = "fixed";
    divRezultat.style.bottom = "20px";
    divRezultat.style.right = "20px";
    divRezultat.style.backgroundColor = "#444";
    divRezultat.style.color = "white";
    divRezultat.style.padding = "10px 20px";
    divRezultat.style.borderRadius = "10px";
    divRezultat.style.zIndex = "1000";
    divRezultat.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";

    document.body.appendChild(divRezultat);

    // șterge după 2 secunde
    setTimeout(() => {
      divRezultat.remove();
    }, 2000);
  };
};

window.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("inp-facilitati");

  function valideazaFacilitati() {
    const valoare = textarea.value.trim();
    const contineCifre = /\d/.test(valoare);

    if (contineCifre) {
      textarea.classList.add("is-invalid");
    } else {
      textarea.classList.remove("is-invalid");
    }
  }

  textarea.addEventListener("input", valideazaFacilitati);

  document.getElementById("filtrare").addEventListener("click", function (e) {
    valideazaFacilitati();
    if (textarea.classList.contains("is-invalid")) {
      e.preventDefault();
    }
  });
});
