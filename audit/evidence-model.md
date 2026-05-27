# Evidence Model for Governed Apps Script Tests

## Evidence Principles
- Append-only: Evidence is only added, never removed or overwritten.
- Metadata-only: No personal or sensitive data is ever included.
- Timestamped: All evidence must include execution timestamps.
- Synthetic-test distinction: Clearly mark synthetic vs. real-world evidence.
- Audit classification: PASS / FAIL / BLOCKED
- No sensitive payload retention.

## Evidence Fields
- testName
- timestamp
- evidenceType (metadata, structure, etc.)
- result (PASS/FAIL/BLOCKED)
- notes
