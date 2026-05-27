# Layout Profiling Test Boundary

This boundary governs structural profiling of irregular Google Sheets before any extraction design is considered.

## Allowed Structural Inference

- Spreadsheet name and tab inventory
- Hidden sheet detection
- Row and column dimensions
- Frozen row and frozen column inspection
- Merged range counting
- Sparse occupied versus empty row estimation
- Sparse occupied versus empty column estimation
- Possible header row detection from bounded prefix sampling
- Structural block or zone estimation from bounded samples
- Tab color or similar non-sensitive sheet metadata when available

## Prohibited Semantic Extraction

- Full row extraction
- Bulk worksheet body reads
- Personal data logging
- Persisting sampled values
- Reconstructing records, entities, or transactions
- Copying cell content into evidence, code comments, commits, or logs
- Writes, triggers, exports, or extraction pipeline assembly
- Credential handling or Drive-wide indexing

## Synthetic-First Testing

- Use synthetic spreadsheets before any controlled real-world validation
- Use placeholder Sheet IDs in scaffold code
- Keep synthetic layouts intentionally irregular so merge, hidden, and sparse-layout paths are exercised
- Ensure synthetic header examples are non-sensitive

## Rollback Conditions

- Any discovery of real Sheet IDs in code or documentation
- Any write path, trigger logic, or deployment logic added to the scaffold
- Any sampling expanded into bulk `getValues()` over worksheet bodies
- Any sampled content persisted, logged, exported, or committed
- Any sign of semantic extraction rather than structural inference

## Audit Expectations

- Evidence must remain metadata-only
- Record inferred structure, not sampled cell contents
- Classify outcomes as `PASS`, `REVIEW`, or `BLOCKED`
- Escalate ambiguous layouts instead of expanding read scope
