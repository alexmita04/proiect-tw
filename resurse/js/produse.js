window.onload = function () {
  btn = document.getElementById("filtrare");
  btn.onclick = function () {
    let inpNume = document
      .getElementById("inp-nume")
      .value.trim()
      .toLowerCase();

    let vectRadio = document.getElementsByName("cap_rad");

    let inpCapacitate = null;
    let minCapacitate = null;
    let maxCapacitate = null;
    for (let rad of vectRadio) {
      if (rad.checked) {
        inpCapacitate = rad.value;
        if (inpCapacitate != "toate") {
          [minCapacitate, maxCapacitate] = inpCapacitate.split(":");
          minCapacitate = parseInt(minCapacitate);
          maxCapacitate = parseInt(maxCapacitate);
        }

        break;
      }
    }

    let inpPret = document.getElementById("inp-pret").value;

    let inpCategorie = document
      .getElementById("inp-categorie")
      .value.trim()
      .toLowerCase();

    let produse = document.getElementsByClassName("produs");
    for (let prod of produse) {
      prod.style.display = "none";

      let nume = prod
        .getElementsByClassName("val-nume")[0]
        .innerHTML.toLowerCase();

      // let cond1 = nume.startsWith(inpNume);
      let cond1 = nume.includes(inpNume);

      let capacitate = parseInt(
        prod.getElementsByClassName("val-capacitate")[0].innerHTML.toLowerCase()
      );

      let cond2 =
        inpCapacitate == "toate" ||
        (minCapacitate <= capacitate && capacitate <= maxCapacitate);

      let pret = parseFloat(
        prod.getElementsByClassName("val-pret")[0].innerHTML.toLowerCase()
      );

      let cond3 = inpPret < pret;

      let categorie = prod
        .getElementsByClassName("val-categorie")[0]
        .innerHTML.toLowerCase();

      let cond4 = inpCategorie == "toate" || inpCategorie == categorie;
      //   console.log(inpCategorie);

      if (cond1 && cond2 && cond3 && cond4) prod.style.display = "block";
    }
  };

  document.getElementById("inp-pret").onchange = function () {
    document.getElementById("infoRange").innerHTML = `(${this.value})`;
  };

  document.getElementById("resetare").onclick = function () {
    document.getElementById("inp-nume").value = "";

    document.getElementById("i_rad4").checked = true;

    const inpPret = (document.getElementById("inp-pret").value = 0);
    document.getElementById("infoRange").innerHTML = `(${inpPret})`;

    document.getElementById("sel-toate").selected = true;

    let produse = document.getElementsByClassName("produs");
    for (let prod of produse) {
      prod.style.display = "block";
    }
  };

  document.getElementById("sortCrescNume").onclick = function () {
    sorteaza(1);
  };

  document.getElementById("sortDescrescNume").onclick = function () {
    sorteaza(-1);
  };

  function sorteaza(semn) {
    let produse = document.getElementsByClassName("produs");
    let vProduse = Array.from(produse);
    vProduse.sort(function (a, b) {
      // a si b sunt article tags
      let pretA = parseFloat(
        a.getElementsByClassName("val-pret")[0].innerHTML.toLowerCase()
      );
      let pretB = parseFloat(
        b.getElementsByClassName("val-pret")[0].innerHTML.toLowerCase()
      );

      if (pretA != pretB) {
        return (pretA - pretB) * semn;
      }

      // preturile sunt egale
      let numeA = a
        .getElementsByClassName("val-nume")[0]
        .innerHTML.toLowerCase();
      let numeB = b
        .getElementsByClassName("val-nume")[0]
        .innerHTML.toLowerCase();

      return numeA.localeCompare(numeB) * semn;
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
};
