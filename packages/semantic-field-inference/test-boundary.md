# Semantic Field Inference Test Boundary

This boundary governs structure-based field-category inference before any extraction, mapping, or production ingestion work begins.

## Synthetic-First Testing

- Use synthetic or controlled non-sensitive spreadsheets first
- Run only as a bound-sheet scaffold with `SpreadsheetApp.getActiveSpreadsheet()`
- Test varied label styles, merged headers, and ambiguous administrative headings

## Allowed Behavior

- bounded header-like sampling
- field-category inference
- confidence scoring
- structural evidence summaries
- ambiguity classification

## Prohibited Behavior

- row extraction
- personal data persistence
- copied-cell logging
- docente, DNI, CUIL, or name handling
- writes, triggers, exports, or credentials
- production ingestion logic

## Rollback Rules

- Roll back if real Sheet IDs appear
- Roll back if sampling expands into full-table reads
- Roll back if copied sheet content enters logs, evidence, or commits
- Roll back if write, trigger, credential, or deployment logic is added

## Ambiguity Handling

- Prefer `REVIEW` over aggressive classification
- Treat low-confidence inference as a governance checkpoint
- Escalate unclear fields instead of widening read scope
