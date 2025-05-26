DROP TABLE bilete;
DROP TYPE IF EXISTS CategorieMareEnum;
DROP TYPE IF EXISTS TipAccesEnum;
DROP TYPE IF EXISTS ZonaAccesEnum;

CREATE TYPE CategorieMareEnum AS ENUM (
    'LaLiga',
    'Champions League',
    'Europa League',
    'Premier League',
    'Superliga'
);

CREATE TYPE TipAccesEnum AS ENUM (
    'tribuna',
    'peluza',
    'vip',
    'familie',
    'student'
);

CREATE TYPE ZonaAccesEnum AS ENUM (
    'nord',
    'sud',
    'est',
    'vest'
);

CREATE TABLE bilete (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(255) UNIQUE NOT NULL,
    descriere TEXT,
    imagine_path VARCHAR(255),
    categorie_mare CategorieMareEnum NOT NULL,
    tip_acces TipAccesEnum,
    pret NUMERIC(10,2) NOT NULL CHECK (pret>=0),
    capacitate_stadion INT CHECK (capacitate_stadion>=0),
    data_eveniment DATE NOT NULL,
    zona_acces ZonaAccesEnum,
    facilitati TEXT,
    include_parcare BOOLEAN DEFAULT FALSE
);



-- LaLiga
INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Real Madrid vs FC Barcelona', 'El Clasico - derby-ul fotbalului spaniol', 'real-barca.png', 'LaLiga', 'vip', 350.00, 81044, '2025-03-15', 'vest', 'Acces la restaurant, bar exclusiv, întâlnire cu jucătorii', TRUE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Atletico Madrid vs Sevilla FC', 'Confruntare importantă în lupta pentru locurile de top', 'altetico-sevilla.png', 'LaLiga', 'tribuna', 85.50, 68456, '2025-04-12', 'est', 'Program de meci gratuit', FALSE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Valencia CF vs Athletic Bilbao', 'Meci între două echipe cu istorie în fotbalul spaniol', 'valencia-bilbao.png', 'LaLiga', 'peluza', 55.00, 55000, '2025-05-24', 'nord', 'Eșarfă comemorativă inclusă', FALSE);

-- Champions League
INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Manchester City vs Bayern Munich', 'Optimi de finală Champions League', 'city-bayern.png', 'Champions League', 'vip', 450.00, 55097, '2025-02-18', 'vest', 'Masă inclusă, acces la zona de relaxare, program de meci premium', TRUE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('PSG vs AC Milan', 'Sferturi de finală Champions League', 'psg-acm.png', 'Champions League', 'tribuna', 180.00, 47929, '2025-04-05', 'sud', 'Program de meci, acces la zona de food court', FALSE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Real Madrid vs Liverpool', 'Semifinală Champions League', 'real-liverpool.png', 'Champions League', 'vip', 550.00, 81044, '2025-05-03', 'vest', 'Ospitalitate premium, acces la zona de interviuri post-meci', TRUE);

-- Europa League
INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('AS Roma vs Arsenal', 'Duelul între echipe cu ambiții de trofeu', 'roma-arsenal.png', 'Europa League', 'tribuna', 120.00, 70634, '2025-03-06', 'est', 'Ghid al stadionului, program de meci', FALSE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Sevilla FC vs Ajax Amsterdam', 'Meci între foste campioane Europa League', 'sevilla-ajax.png', 'Europa League', 'peluza', 75.00, 43833, '2025-03-13', 'nord', 'Poster cu echipa', FALSE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Bayer Leverkusen vs Benfica', 'Semifinală Europa League', 'leverkusen-benfica.png', 'Europa League', 'vip', 200.00, 30210, '2025-05-08', 'vest', 'Bufet all-inclusive, acces la lounge', TRUE);

-- Premier League
INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Liverpool vs Manchester United', 'Cel mai mare derby al fotbalului englezesc', 'liverpool-united.png', 'Premier League', 'familie', 145.00, 53394, '2025-01-25', 'est', 'Zone dedicate pentru copii, activități pre-meci pentru familie', TRUE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Arsenal vs Tottenham', 'Derby-ul Londrei de Nord', 'arsenal-spurs.png', 'Premier League', 'student', 70.00, 60704, '2025-02-08', 'nord', 'Reducere pentru studenți, băutură răcoritoare inclusă', FALSE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Chelsea vs Manchester City', 'Duel între forțele financiare ale fotbalului englezesc', 'chelsea-city.png', 'Premier League', 'vip', 275.00, 40853, '2025-04-19', 'vest', 'Experiență culinară premium, acces exclusiv la interviuri', TRUE);

-- Superliga
INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('FCSB vs CFR Cluj', 'Derby-ul campionatului românesc', 'fcsb-cfr.png', 'Superliga', 'tribuna', 60.00, 55634, '2025-03-01', 'est', 'Eșarfă și program de meci cadou', FALSE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('Universitatea Craiova vs Rapid București', 'Duel între echipe cu suporteri pasionați', 'craiova-rapid.png', 'Superliga', 'peluza', 45.00, 30983, '2025-05-17', 'sud', 'Zona dedicată pentru fani ultras', FALSE);

INSERT INTO bilete (nume, descriere, imagine_path, categorie_mare, tip_acces, pret, capacitate_stadion, data_eveniment, zona_acces, facilitati, include_parcare)
VALUES 
('U Cluj vs Dinamo București', 'Confruntare între echipe de tradiție', 'ucluj-dinamo.png', 'Superliga', 'familie', 50.00, 23500, '2025-04-26', 'vest', 'Zonă dedicată familiilor, activități pentru copii', TRUE);