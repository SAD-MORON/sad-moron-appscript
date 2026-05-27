# Controlled Real-Sheet Profiling Test Boundary

This boundary governs the first authorized transition from synthetic spreadsheet work to controlled real-sheet structural profiling.

## Synthetic-First

- Complete synthetic validation before real-sheet profiling readiness checks
- Use real-sheet readiness only after governance approval

## Real-Sheet Authorization

- Do not begin profiling without explicit authorization
- Start with metadata-only checks
- Keep Sheet IDs local-only and outside Git-controlled artifacts

## Allowed Behavior

- active spreadsheet metadata
- tab names
- readiness classification
- governance status tracking

## Prohibited Behavior

- personal data extraction
- row exports
- full table reads
- writes, triggers, exports, or deployment logic
- unauthorized profiling

## Stop Conditions

- Stop if authorization is missing or unclear
- Stop if real identifiers appear in the repository
- Stop if code expands into cell-value reads
- Stop if any personal or sensitive data is persisted
