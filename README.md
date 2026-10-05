# LEAP — AI Literacy for Everyone
## Site Documentation & Content Guide

This document explains how the site is organized, how to add new content, and what every JSON field means. Keep it updated when you add new content types or change field names.

---

## File Structure

```
leap/
│
├── index.html                    Homepage
│
├── css/
│   └── main.css                  All styles — one file, organized by section
│
├── js/
│   └── main.js                   All shared logic:
│                                   - Navigation injection & behavior
│                                   - Data loading (loadItems)
│                                   - Card rendering (renderCard, renderNewsCard)
│                                   - Skeleton placeholder cards (showSkeletonCards)
│                                   - Filter system (initFilters)
│                                   - Detail page body renderer (renderDetailBody)
│
├── pages/
│   ├── classroom-resources.html  Classroom resource card grid
│   ├── educator-training.html    Educator training card grid
│   ├── parent-resources.html     Parent resource card grid
│   ├── interactive-demos.html    Interactive demos card grid
│   ├── news-events.html          Events card grid
│   ├── research.html             Research publications card grid
│   ├── about.html                About page (tabbed: Team / Philosophy / Research)
│   ├── contact.html              Get Involved / contact form
│   │
│   ├── resource-detail.html      Universal detail page for all resource types
│   │                               (classroom resources, educator training, parent resources)
│   │                               Reads:  data/resources/{id}.json
│   │
│   ├── event-detail.html         Event detail page
│   │                               Reads:  data/events/{id}.json
│   │
│   └── research-detail.html      Research publication detail page
│                                   Reads:  data/research/{id}.json
│
├── data/
│   ├── resources/                All content cards: classroom, training, parent, demos
│   │   ├── cr-001.json           Classroom resource — Unpacking Bias in AI Image Generators
│   │   ├── cr-002.json           Classroom resource — How Does a Language Model Actually Work?
│   │   ├── et-001.json           Educator training — Teaching AI Literacy: A Foundations Workshop
│   │   ├── pr-001.json           Parent resource   — Talking to Your Teen About AI
│   │   ├── pr-002.json           Parent resource   — AI Conversation Starters for Families
│   │   └── pr-003.json           Parent resource   — Three AI Activities You Can Do With Your Family Tonight
│   │
│   ├── events/                   Events and news items
│   │   └── ev-001.json
│   │
│   ├── research/                 Research publications
│   │   └── rs-001.json
│   │
│   └── team/
│       └── team.json             All team members (single file)
│
└── assets/                       Images, icons, downloadable PDFs (to be added)
    └── (empty — add files here)
```

---

## Naming Conventions

Use the following ID prefixes and sequential numbers:

| Prefix  | Type                    | Example      |
|---------|-------------------------|--------------|
| `cr-`   | Classroom resource      | `cr-003.json`|
| `et-`   | Educator training       | `et-002.json`|
| `pr-`   | Parent resource         | `pr-002.json`|
| `demo-` | Interactive demo        | `demo-001.json`|
| `ev-`   | Event                   | `ev-002.json`|
| `rs-`   | Research publication    | `rs-002.json`|

---

## How to Add New Content

### 1. Create the JSON file
Use the schema for that type (see sections below). Save it to the correct `data/` subfolder with the next sequential ID.

### 2. Register it in the section page
Open the relevant section page and add the filename to the array at the top of the `<script>` block.

**Example — adding a new classroom resource:**
```html
<!-- pages/classroom-resources.html -->
const RESOURCE_FILES = [
  'cr-001.json',
  'cr-002.json',
  'cr-003.json',   // ← add your new file here
];
```

**Example — adding a new event:**
```html
<!-- pages/news-events.html -->
const EVENT_FILES = [
  'ev-001.json',
  'ev-002.json',   // ← add your new file here
];
```

That's it. The card and detail page render automatically from the JSON.

---

## JSON Schemas

### Classroom Resource  (`data/resources/cr-XXX.json`)

```json
{
  "id": "cr-003",
  "type": "classroom-resource",

  "title": "Short, descriptive title (used as card headline and page H1)",
  "subtitle": "One-line descriptor shown below the title on cards and detail pages",
  "summary": "2–3 sentence summary shown on the card. Should be fully self-contained — a reader should know what this is without clicking.",

  "audience": ["high-school", "educator"],
  // Valid values: "high-school", "educator", "university", "researcher", "parent", "student"

  "gradeLevel": ["9-10", "11-12"],
  // Valid values: "K-5", "6-8", "9-10", "11-12", "university"

  "subject": ["Computer Science", "Social Studies"],
  // Free-form strings matching your standards or subject areas

  "tags": ["bias", "discussion", "no-code"],
  // Used for card filtering. Use lowercase-with-hyphens. Keep to 4–6 per item.
  // Consistent tags across items make the filter system more useful.

  "duration": "60–75 minutes",
  // Shown on the card next to format

  "format": "Classroom Activity",
  // Shown prominently on the card. Examples: "Lesson + Slides", "Discussion Guide",
  // "Multi-Day Unit", "Assessment", "Workshop", "Reading"

  "thumbnail": null,
  // Path to a thumbnail image, e.g. "../assets/cr-003-thumb.jpg"
  // Set to null if not used

  "body": [
    // Array of content blocks rendered on the detail page.
    // Supported block types — see "Body Block Types" section below.
  ],

  "relatedIds": ["cr-001"],
  // Optional: IDs of related items. Reserved for future "Related Resources" sidebar.

  "dateAdded": "2025-10-15",
  "lastUpdated": "2025-10-15"
  // ISO date strings (YYYY-MM-DD). "Last updated" shown in the sidebar.
}
```

---

### Educator Training  (`data/resources/et-XXX.json`)

Same schema as Classroom Resource, with these differences:

```json
{
  "id": "et-002",
  "type": "educator-training",

  "audience": ["educator", "administrator"],
  // Typical values: "educator", "administrator", "university"

  "format": "Workshop",
  // Examples: "Workshop", "Online Course", "Facilitator Guide", "Webinar", "Coaching Session"

  // All other fields identical to classroom-resource
}
```

---

### Parent Resource  (`data/resources/pr-XXX.json`)

Same schema as Classroom Resource, with these differences:

```json
{
  "id": "pr-002",
  "type": "parent-resource",

  "audience": ["parent", "caregiver"],

  "format": "Guide",
  // Examples: "Guide", "FAQ", "Conversation Starter", "Checklist", "Video"

  "gradeLevel": ["9-10", "11-12"],
  // Optional for parent resources. Use to indicate the relevant age range.

  // All other fields identical to classroom-resource
}
```

---

### Interactive Demo  (`data/resources/demo-XXX.json`)

Same schema as Classroom Resource, with these differences:

```json
{
  "id": "demo-001",
  "type": "interactive-demo",

  "format": "Interactive Tool",
  // Examples: "Interactive Tool", "Simulation", "Playground", "Quiz"

  "demoUrl": "https://...",
  // Optional: if the demo lives at an external URL rather than a detail page

  // All other fields identical to classroom-resource
}
```

---

### Event  (`data/events/ev-XXX.json`)

```json
{
  "id": "ev-002",
  "type": "event",

  "title": "Event title",
  "subtitle": "One-line descriptor (optional)",
  "summary": "2–3 sentence description for the card and event detail page intro.",

  "date": "2026-05-10",
  // ISO date string (YYYY-MM-DD). Used for sorting and display.

  "time": "10:00 AM – 3:00 PM CT",
  // Free-form time string including timezone

  "location": "University of Chicago, Crerar Library",
  // Venue name shown in sidebar

  "locationDetail": "5730 S. Ellis Ave, Chicago, IL 60637",
  // Full address (optional)

  "format": "In-Person",
  // Examples: "In-Person", "Online", "Hybrid"

  "tags": ["workshop", "educators", "in-person"],
  // Used for filtering

  "audience": ["educator", "researcher"],
  // Who the event is for

  "registrationUrl": "https://...",
  // Link shown as a Register button in the sidebar. Set to "#" if TBD.

  "registrationDeadline": "2026-04-25",
  // ISO date. Shown in sidebar. Omit if not applicable.

  "cost": "Free",
  // Examples: "Free", "$25", "Free for students"

  "body": [
    // Same body block array as resources — see "Body Block Types" below
  ],

  "dateAdded": "2026-01-10",
  "lastUpdated": "2026-01-10"
}
```

---

### Research Publication  (`data/research/rs-XXX.json`)

```json
{
  "id": "rs-002",
  "type": "research",

  "title": "Full paper title",
  "summary": "2–3 sentence plain-language abstract for the card.",

  "authors": ["A. Lastname", "B. Lastname"],
  // Array of author name strings, displayed as byline

  "affiliation": "LEAP Initiative, University of Chicago",
  // Institutional affiliation

  "year": 2025,
  // Publication year (number, not string)

  "journal": "Journal of Educational Technology Research",
  // Journal, conference, or "Working Paper" if unpublished

  "doi": "https://doi.org/...",
  // Full DOI URL. Set to "#" if not yet assigned.

  "tags": ["survey-research", "mental-models"],
  // Used for filtering

  "audience": ["researcher", "educator"],

  "body": [
    // Same body block array — typically: Abstract, Key Findings, Implications,
    // Methods Note, then Download blocks for the PDF and any supplementary materials
  ],

  "dateAdded": "2025-09-01",
  "lastUpdated": "2025-09-01"
}
```

---

### Team  (`data/team/team.json`)

Single file containing all team members. Edit directly.

```json
{
  "team": [
    {
      "id": "tm-005",
      "name": "Full Name",
      "title": "Job Title",
      "affiliation": "University of Chicago",
      "bio": "2–3 sentence bio in third person.",
      "photo": null,
      // Path to a photo, e.g. "../assets/team/tm-005.jpg". Set to null to show initials.
      "links": {
        "email": "mailto:name@uchicago.edu",
        "website": "https://..."
        // Set either to null if not applicable
      }
    }
  ]
}
```

---

## Body Block Types

The `body` array in every resource, event, and research JSON controls what appears on the detail page. Each block has a `type` field. Available types:

### `section-heading`
Renders as an `<h2>` with a bottom border. Use to divide major sections.
```json
{ "type": "section-heading", "text": "Learning Objectives" }
```

### `paragraph`
Renders as a `<p>`. Use for prose text.
```json
{ "type": "paragraph", "text": "This activity asks students to become investigators rather than passive users..." }
```

### `list`
Renders as a `<ul>` with bullet points.
```json
{
  "type": "list",
  "items": [
    "First item",
    "Second item",
    "Third item"
  ]
}
```

### `numbered-list`
Renders as an `<ol>`. Use for steps, procedures, or agendas.
```json
{
  "type": "numbered-list",
  "items": [
    "Step one: Do this",
    "Step two: Then this",
    "Step three: Finally this"
  ]
}
```

### `download`
Renders as a download button with an icon. Place at the bottom of the body for materials.
```json
{
  "type": "download",
  "label": "Student Worksheet (PDF)",
  "url": "../assets/cr-003-worksheet.pdf"
}
```
Use `"url": "#"` as a placeholder when the file is not yet uploaded.

---

## Tag Reference

Use consistent tags so the filter system stays useful. The tags below are in use across the sample content — extend this list as needed, but keep tags lowercase-with-hyphens.

**Topic tags**
`bias`, `language-models`, `explainability`, `critical-thinking`, `image-generation`, `data-literacy`, `ethics`, `policy`, `privacy`, `generative-ai`, `chatbots`, `automation`

**Format/approach tags**
`discussion`, `no-code`, `conceptual`, `hands-on`, `project-based`, `assessment`, `reading`

**Audience-context tags**
`high-school`, `university`, `professional-development`, `workshop`, `home`, `conversation-guide`, `teen`

**Research tags**
`survey-research`, `mental-models`, `adolescents`, `beliefs`, `curriculum-design`, `qualitative`, `intervention`

---

## Adding a New Section Page (advanced)

If you add a new content type (e.g., "Policy Briefs"), follow this pattern:

1. Create `data/policy/pb-001.json` using any of the existing schemas as a template, with `"type": "policy-brief"`.
2. Create `pages/policy-briefs.html` — copy `classroom-resources.html` and update the title, description, and `RESOURCE_FILES` array. Point `loadItems` at `'policy'` instead of `'resources'` if using a separate folder.
3. Add the new page to the nav in `js/main.js` inside both `getNavHTML()` and the mobile nav section.
4. For the detail page: `resource-detail.html` will work for any type in `data/resources/`. For a separate folder, create `pages/policy-detail.html` by copying `resource-detail.html` and updating the `fetch` path.

---

## Hosting Notes

This site is a fully static site — no server-side code, no build step required.

- Upload the entire `leap/` folder to your static server.
- The `data/` folder must be accessible at the same origin as the HTML files (same domain/subdirectory). Fetching JSON across origins requires CORS headers, which a static server on the same domain handles automatically.
- All internal links are relative, so the site works in any subdirectory (e.g., `yourserver.edu/leap/`).
- Google Fonts are loaded from `fonts.googleapis.com`. If the server has no outbound internet access, download the fonts and serve them locally — update the `@import` in `main.css` accordingly.

### Required: `data-root` attribute

Every HTML file has a `data-root` attribute on its `<html>` tag. This tells `main.js` how to resolve paths to the `data/` folder, and must be set correctly or JSON files will not load:

```html
<!-- Root pages (index.html) -->
<html lang="en" data-root="./">

<!-- Pages inside /pages/ -->
<html lang="en" data-root="../">
```

If you add a page at a new directory depth (e.g., `pages/sub/page.html`), set `data-root="../../"`. This is the single variable to get right when adding new pages.

---

## Contact

Questions about the site structure: `leap@uchicago.edu`
