-- 1. Erstelle eine Staging-Tabelle für den Import der CSV-Daten, die sowohl Kurse als auch Klassen enthält.
DROP TABLE IF EXISTS staging_courses_classes;
CREATE TABLE staging_courses_classes (
  course_name    TEXT,
  degree_name    TEXT,          -- falls auch Degrees in derselben CSV erfasst werden
  degree_description TEXT,
  class_level_1  TEXT,
  class_level_2  TEXT,
  class_level_3  TEXT,
  class_level_4  TEXT,
  -- Optional: Für Kursvoraussetzungen kannst du z. B. eine Spalte hinzufügen, die eine Liste von
  -- vorausgesetzten Kursen (als Komma-separierte Werte) enthält. Hier im Beispiel:
  prerequisites  TEXT         -- z. B. "Blowjob Basics,Anal Basics"
);

-- Hinweis:
-- Exportiere deine Excel-Tabelle als CSV und importiere sie in diese Tabelle, z. B. mit:
COPY staging_courses_classes(course_name, degree_name, degree_description, class_level_1, class_level_2, class_level_3, class_level_4, prerequisites)
FROM './courses.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- 2. Erstelle die endgültigen Tabellen

-- Tabelle für Courses
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabelle für Degrees (falls du sie separat pflegen möchtest)
DROP TABLE IF EXISTS degrees;
CREATE TABLE degrees (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tabelle für Classes
DROP TABLE IF EXISTS classes;
CREATE TABLE classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  course_id   UUID REFERENCES courses(id),
  difficulty  INT,  -- 1 = niedrigste, 4 = höchste Schwierigkeit
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tabelle zur Abbildung von Kurs-Voraussetzungen (Many-to-Many-Selbstbeziehung)
DROP TABLE IF EXISTS course_prerequisite;
CREATE TABLE course_prerequisite (
  course_id UUID REFERENCES courses(id),
  prerequisite_id UUID REFERENCES courses(id),
  PRIMARY KEY (course_id, prerequisite_id)
);

-- 3. Fülle die Tabelle courses anhand der Staging-Tabelle (eindeutige Kursnamen)
INSERT INTO courses (name)
SELECT DISTINCT course_name
FROM staging_courses_classes;

-- 4. Falls auch Degrees separat erfasst werden sollen:
INSERT INTO degrees (name, description)
SELECT DISTINCT degree_name, degree_description
FROM staging_courses_classes;

-- 5. Fülle die Tabelle classes anhand der einzelnen Spalten aus der Staging-Tabelle
-- Klasse Level 1 (Schwierigkeit 1)
INSERT INTO classes (name, course_id, difficulty)
SELECT class_level_1, c.id, 1
FROM staging_courses_classes sc
JOIN courses c ON c.name = sc.course_name
WHERE class_level_1 IS NOT NULL AND class_level_1 <> '';

-- Klasse Level 2 (Schwierigkeit 2)
INSERT INTO classes (name, course_id, difficulty)
SELECT class_level_2, c.id, 2
FROM staging_courses_classes sc
JOIN courses c ON c.name = sc.course_name
WHERE class_level_2 IS NOT NULL AND class_level_2 <> '';

-- Klasse Level 3 (Schwierigkeit 3)
INSERT INTO classes (name, course_id, difficulty)
SELECT class_level_3, c.id, 3
FROM staging_courses_classes sc
JOIN courses c ON c.name = sc.course_name
WHERE class_level_3 IS NOT NULL AND class_level_3 <> '';

-- Klasse Level 4 (Schwierigkeit 4)
INSERT INTO classes (name, course_id, difficulty)
SELECT class_level_4, c.id, 4
FROM staging_courses_classes sc
JOIN courses c ON c.name = sc.course_name
WHERE class_level_4 IS NOT NULL AND class_level_4 <> '';

-- 6. Erstelle die Kurs-Voraussetzungen
-- Wir gehen davon aus, dass in der Spalte 'prerequisites' der Staging-Tabelle
-- eine kommagetrennte Liste von Kursnamen steht.
-- Beispiel: Für "Double Penetration Basics" steht in prerequisites: "Blowjob Basics,Anal Basics"
-- Wir fügen die Einträge in die Tabelle course_prerequisite ein.

INSERT INTO course_prerequisite (course_id, prerequisite_id)
SELECT c_main.id, c_req.id
FROM staging_courses_classes sc
JOIN courses c_main ON c_main.name = sc.course_name
CROSS JOIN LATERAL unnest(string_to_array(sc.prerequisites, ',')) AS req(name)
JOIN courses c_req ON trim(req.name) = c_req.name
WHERE sc.prerequisites IS NOT NULL AND sc.prerequisites <> '';

-- Optional: Überprüfe die importierten Daten
SELECT * FROM courses;
SELECT * FROM degrees;
SELECT * FROM classes;
SELECT * FROM course_prerequisite;
