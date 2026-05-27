# Sheet Registry Test Boundary

This boundary governs the transition from synthetic spreadsheet validation to authorized real-sheet onboarding.

## Synthetic-First

- Validate registry behavior with synthetic spreadsheets first
- Confirm metadata-only operation before any real-sheet onboarding

## Real-Sheet Onboarding

- Only begin real-sheet onboarding after explicit authorization
- Start with metadata-only registration
- Do not profile structure until authorization status allows it

## No Sensitive Persistence

- Do not store Sheet IDs in Git
- Do not store credentials
- Do not store copied cell values
- Do not store personal data

## Stop Conditions

- Stop if real Sheet IDs appear in repo artifacts
- Stop if any credential material is introduced
- Stop if cell-value reads are added to the scaffold
- Stop if writes, triggers, bulk processing, or deployment logic are added
- Stop if authorization status is unclear or undocumented
