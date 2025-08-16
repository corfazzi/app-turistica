# App Turistica — CI Ready

Questo progetto è pronto per **compilare un APK di debug su GitHub Actions** (senza SDK sul tuo PC).

## Istruzioni (senza terminale)
1. Crea un repo privato su GitHub.
2. Carica il contenuto di questa cartella nel repo (drag & drop).
3. Vai su **Actions** → lascia abilitato i workflow → il build parte al push (o avvialo con *Run workflow*).
4. A fine job scarica l'APK in **Artifacts** (nome: `app-debug`).

## Configura Google Sheet (facoltativo)
Modifica `config.js` → `SHEET_CSV_URL` con l'URL CSV pubblicato del tuo Google Sheet.

Ultimo aggiornamento: 2025-08-16
