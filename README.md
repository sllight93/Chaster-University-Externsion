Hier ist eine vollständige Markdown-Dokumentation, die auch Docker Compose zur Einrichtung der Datenbank im Root-Verzeichnis beschreibt. Kopiere diesen Text in deine `README.md`:

```markdown
# CUE - Chaster-University-Extension

Diese Anwendung ist die Chaster University Extension und besteht aus einem Backend-Server (Express) und einem Frontend-Server (Next.js). Zusätzlich wird PostgreSQL als Datenbank verwendet.

## Stack

- **Backend:** Express Server
- **Frontend:** Next.js Server
- **Datenbank:** PostgreSQL

## Voraussetzungen

- [PostgreSQL](https://www.postgresql.org/)  
  Alternativ kannst du die Datenbank mit Docker Compose im Root-Verzeichnis des Projekts aufsetzen.

## Ports

- **Backend:** 5000
- **Frontend:** 3000

## Docker Setup (optional)

Um die PostgreSQL-Datenbank über Docker Compose zu starten, nutze die `docker-compose.yml` im Root-Verzeichnis des Projekts.
Starte die Datenbank mit:

```bash
docker-compose up -d
```

## Backend Setup

1. **Wechsle in das Backend-Verzeichnis:**

   ```bash
   cd chaster-university-extension/backend
   ```

2. **Erstelle und befülle die Datei `.env`:**

   Erstelle im Verzeichnis `backend` eine `.env`-Datei und trage dort deine PostgreSQL-Verbindungsdaten ein:

   ```env
   DATABASE_URL=postgresql://user:password@127.0.0.1:5432/su
   ```

3. **Installiere die NPM-Abhängigkeiten:**

   ```bash
   npm install
   ```

4. **Migrate Prisma Schema für PostgreSQL:**

   ```bash
   npm run db-migrate
   ```

5. **Generiere den Prisma Client:**

   ```bash
   npm run db-gen
   ```

6. **Seed die Datenbank:**

   ```bash
   npm run db-seed
   ```

7. **Starte den Backend-Server:**

   ```bash
   npm run dev-b
   ```

## Frontend Setup

1. **Wechsle in das Frontend-Verzeichnis:**

   ```bash
   cd chaster-university-extension/frontend
   ```

2. **Erstelle und befülle die Datei `.env`:**

   Erstelle im Verzeichnis `frontend` eine `.env`-Datei und trage den Host des Backend-Servers ein:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

3. **Installiere die NPM-Abhängigkeiten:**

   ```bash
   npm install
   ```

4. **Starte den Frontend-Server:**

   ```bash
   npm run dev-f
   ```

## Hinweise

- **Umgebungsvariablen:**  
  In Next.js werden nur Umgebungsvariablen, die mit `NEXT_PUBLIC_` beginnen, im Client verfügbar gemacht. Daher verwenden wir für den Backend-URL `NEXT_PUBLIC_BACKEND_URL` in der Frontend-Konfiguration.

- **Reihenfolge der Befehle:**  
  Stelle sicher, dass du die Prisma-Migration, den Client-Generator und das Seed-Skript in der angegebenen Reihenfolge ausführst, um die Datenbank korrekt aufzusetzen.

- **Docker:**  
  Mit der Docker Compose-Konfiguration im Root-Verzeichnis kannst du die PostgreSQL-Datenbank schnell und einfach in einem Container starten, was vor allem in der Entwicklung hilfreich ist.
