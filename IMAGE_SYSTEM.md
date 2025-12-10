# Analog Revolution - Sistema di Gestione Immagini

## 📁 Struttura delle Cartelle

Le immagini sono organizzate automaticamente in base a:
1. **Tipo**: `bnw` (bianco e nero) o `color` (a colori)
2. **Orientamento**: `landscape` (orizzontale) o `portrait` (verticale)

```
public/images/avif/
├── bnw/
│   ├── landscape/
│   └── portrait/
└── color/
    ├── landscape/
    └── portrait/
```

## 🔄 Organizzazione Automatica delle Immagini

### Script di Organizzazione

Lo script `organize-images.mjs` analizza automaticamente le dimensioni delle immagini e le sposta nelle cartelle corrette.

**Eseguire una volta:**
```bash
npm run organize
```

**Modalità watch (auto-organizza nuove immagini):**
```bash
npm run organize:watch
```

### Come Funziona

1. Lo script legge tutte le immagini dalle cartelle `bnw/` e `color/`
2. Per ogni immagine, controlla se `width > height`
   - Se sì → sposta in `landscape/`
   - Se no → sposta in `portrait/`
3. In modalità watch, monitora le cartelle e organizza automaticamente le nuove immagini

## 🎨 Sistema di Toggle Orientamento

### Comportamento Desktop/Laptop

- **Schermo Orizzontale (Landscape)**:
  - Di default mostra foto orizzontali
  - Toggle disponibile per passare a foto verticali
  - Foto verticali vengono fittate in altezza (`object-fit: contain`)
  
- **Schermo Verticale (Portrait)**:
  - Di default mostra foto verticali
  - Toggle disponibile per passare a foto orizzontali

### Comportamento Mobile

- **Mobile Verticale (Portrait)**:
  - Mostra automaticamente foto verticali
  - Header e controlli si nascondono scrollando giù
  - Riappaiono scrollando su
  - Toggle landscape/portrait nascosto
  
- **Mobile Orizzontale (Landscape)**:
  - Passa automaticamente a foto orizzontali
  - Header sempre visibile
  - Toggle disponibile

## 🎯 Funzionalità Implementate

### 1. Auto-Hide Header (Mobile Portrait)
- L'header si nasconde quando si scrolla verso il basso
- Riappare quando si scrolla verso l'alto
- Transizione fluida di 300ms

### 2. Toggle Landscape/Portrait
- Permette di scegliere manualmente quale orientamento visualizzare
- Si nasconde automaticamente su mobile portrait
- Icone animate con transizione

### 3. Fit Intelligente delle Immagini
- **Landscape mode + Portrait images**: `object-fit: contain` (fit in altezza)
- **Portrait mode + Portrait images**: `object-fit: cover` (riempie il container)
- **Landscape mode + Landscape images**: `object-fit: cover`

### 4. Collezioni BW/Color
- Toggle tra collezione bianco e nero e a colori
- Ogni collezione ha le proprie foto landscape e portrait
- Transizione animata quando si cambia collezione

## 🛠️ Aggiungere Nuove Immagini

1. Metti le immagini nella cartella appropriata:
   - `/public/images/avif/bnw/` per bianco e nero
   - `/public/images/avif/color/` per a colori

2. Esegui lo script di organizzazione:
   ```bash
   npm run organize
   ```

3. Aggiorna il file `src/lib/collections.ts` con i nuovi percorsi

**Oppure** usa la modalità watch durante lo sviluppo:
```bash
npm run organize:watch
```

## 📝 File Chiave

- `scripts/organize-images.mjs` - Script di organizzazione automatica
- `src/lib/collections.ts` - Definizione delle collezioni di immagini
- `src/context/GalleryContext.tsx` - Gestione stato galleria
- `src/components/common/LayoutProvider.tsx` - Gestione layout e orientamento
- `src/components/sections/Gallery.tsx` - Componente galleria

## 🚀 Comandi Disponibili

```bash
npm run dev              # Avvia il dev server
npm run build            # Build di produzione
npm run organize         # Organizza le immagini una volta
npm run organize:watch   # Modalità watch per auto-organizzazione
```
