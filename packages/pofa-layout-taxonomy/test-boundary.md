# POFA Layout Taxonomy Test Boundary

This boundary governs structural fingerprinting, topology comparison, and drift classification for heterogeneous institutional spreadsheets.

## Synthetic-First Testing

- Use synthetic or controlled non-sensitive bound spreadsheets first
- Run the scaffold with `SpreadsheetApp.getActiveSpreadsheet()`
- Exercise merge-heavy, cuadro-driven, sparse, and repeated-block layouts
- Validate drift comparison using synthetic before-and-after structural variants

## Structure-Only Comparison

- Compare fingerprints, topology hashes, merge geometry, header topology, and detected zones only
- Record compatibility percentages and drift severity without copying sampled text
- Treat modality and level hints as low-risk structural hints, not authoritative classifications

## Prohibited Behaviors

- No docente extraction
- No DNI, CUIL, names, or personal identifiers
- No full table export
- No semantic personal profiling
- No writes, triggers, credentials, or deployment logic
- No production ingestion or operational pipelines

## No Sensitive Persistence

- Do not persist sampled values
- Do not log copied sheet text
- Do not commit or export sensitive content
- Keep audit output structural and bounded

## Ambiguity Handling

- Mark uncertain family classification for review
- Treat low compatibility as a governance checkpoint
- Escalate unusual structures instead of widening read scope

## Rollback Rules

- Roll back if real Sheet IDs appear
- Roll back if bounded sampling expands into full-table reads
- Roll back if any personal data enters logs, evidence, or commits
- Roll back if writes, triggers, credential handling, or deployment logic are added
