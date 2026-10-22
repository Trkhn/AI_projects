# DocuPulse — Mobile-First Ephemeral Project & Field Report Studio

A privacy-first, zero-retention web application engineered to generate clean, high-impact PDF project documentation directly on smartphones and desktops. Optimized for field use on mobile browsers with instant camera capture and touch-friendly controls, while preserving pure in-memory zero-persistence privacy.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following revisions have been incorporated based on your latest instructions:

- **Confirmed Decision 1 (Simplified Clean Form)**: Removed superfluous administrative fields (`projectReference`, `leadAuthor`, `organization`). The streamlined form now contains strictly:
  - **Project / Intervention Title**
  - **Date** & **Site / Location**
  - **Mandatory On-Site Personnel Count** (`personnelCount >= 1`)
  - **Dashed Tasks List** (`- `) with optional task-specific photos
  - **Observations / Technical Notes**
  - **General Progress Photos** (end of document)
- **Confirmed Decision 2 (Mobile-First Ergonomics & Camera Support)**:
  - **Direct Camera Capture**: Dedicated mobile camera trigger (`capture="environment"`) to snap field photos directly into tasks or general gallery, alongside standard photo library selection.
  - **Touch Target Compliance**: Minimum $44\text{px}$ touch hitbox across all buttons, inputs, steppers, and list controls.
  - **Sticky Mobile Bottom Bar**: Compact thumb-zone sticky bar (<15% viewport height) providing instant PDF export and quick view toggles.
- **Confirmed Decision 3 (Mobile Preview Experience)**:
  - **Mobile-Optimized Card View**: Clean, readable card stream tailored for vertical smartphone scrolling.
  - **Fullscreen A4 Sheet Viewer**: Tap-to-open full A4 print layout modal with zoom controls to inspect the exact PDF paper output before download.
- **Confirmed Decision 4 (Zero-Persistence Guarantee)**: In-memory only; no database, no server uploads, total confidentiality.
- **Confirmed Decision 5 (Trilingual Support)**: Full instant switching across French (`FR`), English (`EN`), and Chinese (`中文`).

---

### 1. Overview & Core Concept

- **What It Does**: DocuPulse allows technicians, site supervisors, and engineers to quickly document on-site interventions from their smartphones: take live photos, list executed tasks with clean dashed bullets, log mandatory workforce numbers, and immediately download a formal PDF report.
- **Target Audience / Persona**: On-site field professionals using smartphones under varied light and physical conditions who need fast, zero-footprint documentation without logging into databases or storing files in the cloud.
- **Key Value**: Extreme mobile usability, friction-free camera capture, and 100% ephemeral privacy.

---

### 2. User Experience & Visual Design

- **Key User Flows on Mobile**:
  1. *Header & Language*: Compact 52px top bar with brand wordmark, FR/EN/ZH switcher, and reset button.
  2. *Quick Identification*: Fast entry of Title, Site, and Date.
  3. *Mandatory Headcount Stepper*: Large thumb-friendly numeric controls (`-` / `+` with $\ge 48\text{px}$ touch target) and preset chips.
  4. *Tasks with Dashes & Camera Attachment*:
     - Tap `[+ Ajouter une tâche]` or paste raw task list.
     - Each task displays with a dash (`—`).
     - Tap `[Prendre photo]` to launch camera or `[Galerie]` to pick files.
  5. *General Progress Photos*: Camera or gallery upload for overall site status.
  6. *Bottom Action Bar (Mobile Thumb Zone)*:
     - Fixed at the bottom of the screen with `[Formulaire]`, `[Aperçu mobile]`, `[Feuille A4]`, and primary `[Télécharger le PDF]`.

---

### 3. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DocuPulse Mobile-First Studio                         │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ Mobile Viewport (<1024px)            │ Desktop Viewport (>=1024px)          │
│  · Clean simplified form             │  · 2-Column Split Studio             │
│  · Camera (capture="environment")    │  · Left: Full Editor Form            │
│  · Mobile card view + A4 modal       │  · Right: Live A4 Interactive Canvas │
│  · Thumb-zone sticky bottom bar      │  · High-res PDF download             │
├──────────────────────────────────────┴──────────────────────────────────────┤
│ Pure Client-Side In-Memory Engine (No Database, Zero Retention)            │
│  - React state + ObjectURLs                                                 │
│  - jsPDF + html2canvas multi-page A4 rendering                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Simplified Data Model**:
  - `ProjectReport`:
    - `id: string`
    - `title: string` (Required)
    - `siteLocation: string`
    - `date: string`
    - `personnelCount: number | ''` (Required, $\ge 1$)
    - `tasks: TaskItem[]` (Rendered as `- [task]`)
    - `generalNotes: string`
    - `images: ProjectImage[]`
    - `language: 'fr' | 'en' | 'zh'`
