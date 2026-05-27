# Semantic Layout Profiling Test Boundary

This boundary governs semantic layout profiling for institutional spreadsheets before any extraction design or field mapping work begins.

## Allowed Structural Inference

- Detect merged title blocks from merge geometry
- Detect institutional header zones from bounded top-left sampling
- Detect cuadro or table label zones without returning text
- Detect multi-row header regions
- Detect observation zones and note areas as structural categories
- Detect repeated administrative blocks from recurring bounded row signatures
- Detect visual layout regions and possible data table starts
- Record merge coordinates, row and column bounds, zone types, and confidence only

## Prohibited Semantic Extraction

- Full table reads
- Personal data extraction
- Row-level docente data access
- DNI, CUIL, or name extraction
- Returning sampled text verbatim
- Logging sampled values
- Building extraction pipelines from this scaffold
- Writes, triggers, exports, or credential handling

## Synthetic-First Testing

- Use synthetic institutional layouts before any controlled validation
- Bind the script to a synthetic spreadsheet and run with `SpreadsheetApp.getActiveSpreadsheet()`
- Exercise merged titles, repeated administrative rows, note zones, and multi-row header patterns
- Keep all synthetic labels non-sensitive

## Rollback Conditions

- Any real Sheet ID added to code or documentation
- Any logging of sampled values or copied sheet text
- Any widening of read scope into full tables or worksheet bodies
- Any write path, trigger, export, or deployment logic
- Any inclusion of personal or administrative identity fields in outputs

## Audit Expectations

- Evidence must remain structural and confidence-based
- Document detected zone types and bounds only
- Classify execution outcomes as `PASS`, `REVIEW`, or `BLOCKED`
- Mark ambiguous layouts for review instead of broadening semantic reads
