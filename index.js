const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const sass = require("sass");
const pg = require("pg");

const Client = pg.Client;

client = new Client({
  database: "proiect",
  user: "alexmita04",
  password: "parola",
  host: "localhost",
  port: 5433,
});

client.connect((err) => {
  if (err) {
    console.error("Eroare la conectarea la baza de date:", err);
    process.exit(1); // Închide aplicația
  }
});
// client.query("select * from bilete", function (err, rezultat) {
//   console.log(err);
//   console.log(rezultat);
// });

// client.query(
//   "select * from unnest(enum_range(null::CategorieMareEnum))",
//   function (err, rezultat) {
//     console.log(err);
//     console.log(rezultat);
//   }
// );

app = express();

app.set("view engine", "ejs");
app.use("/resurse", express.static(path.join(__dirname, "resurse")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

console.log("Folderul proiectului: ", __dirname);
console.log("Calea fisierului index.js", __filename);
console.log("Folderul curent de lucru: ", process.cwd());

obGlobal = {
  obErori: null,
  obImagini: null,
  folderScss: path.join(__dirname, "resurse/scss"),
  folderCss: path.join(__dirname, "resurse/css"),
  folderBackup: path.join(__dirname, "backup"),
  optiuniMeniu: null,
};

client.query(
  "SELECT unnest(enum_range(NULL::CategorieMareEnum)) AS categorie",
  function (err, rezultat) {
    if (err) {
      console.error("Eroare la interogarea categoriei:", err);
      process.exit(1);
    }
    obGlobal.optiuniMeniu = rezultat.rows;
  }
);

vect_foldere = ["temp", "backup", "temp1"];
for (let folder of vect_foldere) {
  let caleFolder = path.join(__dirname, folder);
  if (!fs.existsSync(caleFolder)) {
    fs.mkdirSync(caleFolder);
  }
}

function compileazaScss(caleScss, caleCss) {
  // console.log("cale:", caleCss);
  if (!caleCss) {
    let numeFisExt = path.basename(caleScss);
    let numeFis = numeFisExt.split(".")[0]; /// "a.scss"  -> ["a","scss"]
    caleCss = numeFis + ".css";
  }

  if (!path.isAbsolute(caleScss))
    caleScss = path.join(obGlobal.folderScss, caleScss);
  if (!path.isAbsolute(caleCss))
    caleCss = path.join(obGlobal.folderCss, caleCss);

  let caleBackup = path.join(obGlobal.folderBackup, "resurse/css");
  if (!fs.existsSync(caleBackup)) {
    fs.mkdirSync(caleBackup, { recursive: true });
  }

  // la acest punct avem cai absolute in caleScss si  caleCss

  let numeFisCss = path.basename(caleCss);
  if (fs.existsSync(caleCss)) {
    fs.copyFileSync(
      caleCss,
      path.join(obGlobal.folderBackup, "resurse/css", numeFisCss)
    ); // +(new Date()).getTime()
  }
  rez = sass.compile(caleScss, { sourceMap: true });
  fs.writeFileSync(caleCss, rez.css);
  // console.log("Compilare SCSS", rez);
}
//compileazaScss("a.scss");
vFisiere = fs.readdirSync(obGlobal.folderScss);
for (let numeFis of vFisiere) {
  if (path.extname(numeFis) == ".scss") {
    compileazaScss(numeFis);
  }
}

fs.watch(obGlobal.folderScss, function (eveniment, numeFis) {
  console.log(eveniment, numeFis);
  if (eveniment == "change" || eveniment == "rename") {
    let caleCompleta = path.join(obGlobal.folderScss, numeFis);
    if (fs.existsSync(caleCompleta)) {
      compileazaScss(caleCompleta);
    }
  }
});

function initErori() {
  let continut = fs
    .readFileSync(path.join(__dirname, "resurse/json/erori.json"))
    .toString("utf-8");

  obGlobal.obErori = JSON.parse(continut);

  obGlobal.obErori.eroare_default.imagine = path.join(
    obGlobal.obErori.cale_baza,
    obGlobal.obErori.eroare_default.imagine
  );
  for (let eroare of obGlobal.obErori.info_erori) {
    eroare.imagine = path.join(obGlobal.obErori.cale_baza, eroare.imagine);
  }
  //   console.log(obGlobal.obErori);
}

initErori();

function initImagini() {
  var continut = fs
    .readFileSync(path.join(__dirname, "resurse/json/galerie.json"))
    .toString("utf-8");

  obGlobal.obImagini = JSON.parse(continut);
  let vImagini = obGlobal.obImagini.imagini;

  let caleAbs = path.join(__dirname, obGlobal.obImagini.cale_galerie);
  let caleAbsMediu = path.join(
    __dirname,
    obGlobal.obImagini.cale_galerie,
    "mediu"
  );
  let caleAbsMic = path.join(__dirname, obGlobal.obImagini.cale_galerie, "mic");

  if (!fs.existsSync(caleAbsMediu)) fs.mkdirSync(caleAbsMediu);
  if (!fs.existsSync(caleAbsMic)) fs.mkdirSync(caleAbsMic);

  //for (let i=0; i< vErori.length; i++ )
  for (let imag of vImagini) {
    [numeFis, ext] = imag.cale_fisier.split(".");
    let caleFisAbs = path.join(caleAbs, imag.cale_fisier);
    let caleFisMediuAbs = path.join(caleAbsMediu, numeFis + ".webp");
    let caleFisMicAbs = path.join(caleAbsMic, numeFis + ".webp");
    sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs);
    sharp(caleFisAbs).resize(200).toFile(caleFisMicAbs);
    imag.cale_fisier_mic = path.join(
      "/",
      obGlobal.obImagini.cale_galerie,
      "mic",
      numeFis + ".webp"
    );
    imag.cale_fisier_mediu = path.join(
      "/",
      obGlobal.obImagini.cale_galerie,
      "mediu",
      numeFis + ".webp"
    );
    imag.cale_fisier = path.join(
      "/",
      obGlobal.obImagini.cale_galerie,
      imag.cale_fisier
    );
  }
  // console.log(obGlobal.obImagini);
}

initImagini();

function afisareEroare(res, identificator, titlu, text, imagine) {
  let eroare = obGlobal.obErori.info_erori.find(function (elem) {
    return elem.identificator == identificator;
  });
  if (eroare) {
    if (eroare.status) res.status(identificator);
    var titluCustom = titlu || eroare.titlu;
    var textCustom = text || eroare.text;
    var imagineCustom = imagine || eroare.imagine;
  } else {
    var err = obGlobal.obErori.eroare_default;
    var titluCustom = titlu || err.titlu;
    var textCustom = text || err.text;
    var imagineCustom = imagine || err.imagine;
  }

  res.render("pagini/eroare", {
    //transmit obiectul locals
    titlu: titluCustom,
    text: textCustom,
    imagine: imagineCustom,
  });
}

// app.use(async (req, res, next) => {
//   try {
//     const query =
//       "SELECT unnest(enum_range(NULL::CategorieMareEnum)) AS categorie";
//     const result = await client.query(query);
//     res.locals.categorii_mari = result.rows.map((row) => row.categorie);
//     // console.log(res.locals.categorii_mari);
//   } catch (err) {
//     console.error("Eroare la interogarea enumului:", err);
//     res.locals.categorii_mari = []; // fallback gol
//   }
//   next();
// });

app.use(function (req, res, next) {
  res.locals.optiuniMeniu = obGlobal.optiuniMeniu;

  next();
});

app.get(["/", "/index", "/home"], function (req, res) {
  res.render("pagini/index", {
    ip: req.ip,
    imagini: obGlobal.obImagini.imagini,
  });
});

app.get("/galerie", function (req, res) {
  res.render("pagini/galerie", { imagini: obGlobal.obImagini.imagini });
});

app.get("/produse", function (req, res) {
  // console.log(req.query.tip);
  var conditieQuery = ""; // TO DO where din parametri
  if (req.query.tip) {
    conditieQuery = ` where categorie_mare='${req.query.tip}'`;
  }

  queryOptiuni = "select * from unnest(enum_range(null::CategorieMareEnum))";
  queryTipAcces = "SELECT DISTINCT tip_acces FROM bilete ORDER BY tip_acces";
  client.query(queryOptiuni, function (err, rezOptiuni) {
    // console.log(rezOptiuni);

    queryProduse = "select * from bilete" + conditieQuery;
    client.query(queryOptiuni, function (err, rezOptiuni) {
      if (err) {
        console.log(err);
        afisareEroare(res, 2);
      } else {
        client.query(queryProduse, function (err, rezProduse) {
          if (err) {
            console.log(err);
            afisareEroare(res, 2);
          } else {
            client.query(queryTipAcces, function (err, rezTipAcces) {
              if (err) {
                console.log(err);
                afisareEroare(res, 2);
              } else {
                res.render("pagini/produse", {
                  produse: rezProduse.rows,
                  optiuni: rezOptiuni.rows,
                  tipuriAcces: rezTipAcces.rows,
                });
              }
            });
          }
        });
      }
    });
  });
});

app.get("/produs/:id", function (req, res) {
  client.query(
    `select * from bilete where id=${req.params.id}`,
    function (err, rez) {
      if (err) {
        console.log(err);
        afisareEroare(res, 2);
      } else {
        if (rez.rowCount == 0) {
          afisareEroare(res, 404);
        } else {
          res.render("pagini/produs", { prod: rez.rows[0] });
        }
      }
    }
  );
});

app.get("/favincon.ico", function (req, res) {
  res.sendFile(path.join(__dirname, "resurse/ico/favicon.ico"));
});

// app.get("/despre", function (req, res) {
//   res.render("pagini/despre");
// });

app.get("/*.ejs", function (req, res) {
  afisareEroare(res, 400);
});

app.get(/^\/resurse\/[a-zA-Z0-9_\/]*$/, function (req, res) {
  afisareEroare(res, 403);
});

app.use("/*", function (req, res) {
  try {
    res.render("pagini" + req.originalUrl, function (err, rezultatRandare) {
      if (err) {
        console.log(err);
        if (err.message.startsWith("Failed to lookup view")) {
          afisareEroare(res, 404);
        } else {
          afisareEroare(res);
        }
      } else {
        //   console.log(rezultatRandare);
        res.send(rezultatRandare);
      }
    });
  } catch (errRandare) {
    if (errRandare.message.startsWith("Cannot find module")) {
      afisareEroare(res, 404);
    } else {
      afisareEroare(res);
    }
  }
});

app.listen(8080);
console.log("Serverul a pornit");
