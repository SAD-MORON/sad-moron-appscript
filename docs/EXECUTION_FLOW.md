# Execution Flow

## Synthetic Execution Flow

1. Run `metadata-test`
2. Advance to `structure-read`
3. Advance to `layout-profiling`
4. Advance to `semantic-layout-profiling`
5. Advance to `pofa-layout-taxonomy`
6. Advance to `semantic-field-inference`
7. Record evidence and governance outcomes

Synthetic execution is the default proving ground for boundary safety, ambiguity handling, and audit discipline.

## Authorized Real-Sheet Onboarding Flow

1. Confirm authorization
2. Create or validate `sheet-registry` metadata entry
3. Confirm local-only identifier handling
4. Verify sensitivity classification
5. Verify workflow association and ownership

No structural profiling should begin until these onboarding steps are complete.

## Profiling Readiness Flow

1. Enter `real-sheet-profiling`
2. Validate active spreadsheet metadata availability
3. Confirm authorization status
4. Confirm fingerprint, semantic inference, and drift stages are still gated
5. Produce readiness classification

## Fingerprint Flow

1. Start from an authorized sheet context
2. Build structural topology
3. Record level dimension, modality dimension, year/version dimension, and institutional format dimension when available
4. Record layout family classification
5. Produce fingerprint reference and modality-specific baseline
6. Route evidence to audit and review

## Semantic Inference Flow

1. Confirm topology and structural boundaries
2. Confirm level/modality context or explicitly record that it is unknown
3. Run bounded field-category inference
4. Record ambiguity classification
5. Escalate unclear semantics to review

## Extraction Eligibility Review Flow

1. Confirm authorization remains valid
2. Confirm metadata registry is complete
3. Confirm fingerprint baseline exists
4. Confirm level/modality classification exists or an explicit human override is documented
5. Confirm semantic layout and field inference have been reviewed
6. Confirm drift baseline is resolved using like-with-like comparison
7. Decide `PASS`, `REVIEW`, or `BLOCKED`

Extraction eligibility review is not extraction. It is the final governance gate before any future extraction engine could even be considered.

## Stop Conditions

- missing authorization
- sensitivity escalation
- ambiguous semantics
- unresolved drift
- unknown modality or level
- unlike-family comparison attempted without explicit override
- governance review required
- identifier leakage detected
- unexpected package coupling detected

## Flow Rule

When a stop condition appears, the system must pause at the current stage. It must not broaden reads, skip stages, or infer approval from partial success in earlier packages.
