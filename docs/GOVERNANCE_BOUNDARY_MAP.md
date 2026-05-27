# Governance Boundary Map

## Boundary Types

### Metadata-Only Boundary

- allowed:
  spreadsheet name, sheet names, sheet count, bounded metadata status
- prohibited:
  cell-value reads, row export, writes, triggers, credentials

### Structure-Only Boundary

- allowed:
  row/column geometry, merge counts, header-row or sparse structural inference, topology signals
- prohibited:
  full-table reads, person-level extraction, persistence of sampled values, writes

### Semantic Inference Boundary

- allowed:
  structural zones, field-category inference, confidence labels, ambiguity classification
- prohibited:
  person-level profiling, extracted records, copied labels in evidence, writes

### Extraction Boundary

- allowed:
  nothing by default in the current repository state
- prohibited:
  extraction engines, production ingestion, bulk processing, exports, operational writes

### Local-Only Identifier Boundary

- allowed:
  local operational references outside Git
- prohibited:
  committed real Sheet IDs, committed Script IDs, identifier leakage in docs, reports, code, or manifests

### Deployment Boundary

- allowed:
  documentation of deployment controls only
- prohibited:
  production deployment changes, runtime deployment logic, uncontrolled automation

## Prohibited Operations Matrix

- metadata-test:
  no cell reads beyond metadata, no writes, no triggers, no deployment
- structure-read:
  no data-row access, no writes, no triggers, no identifiers
- layout-profiling:
  no bulk body reads, no persistence of sampled values, no writes, no exports
- semantic-layout-profiling:
  no row-level profiling, no copied text output, no writes, no triggers
- pofa-layout-taxonomy:
  no person-level semantics, no exports, no writes, no deployment
- semantic-field-inference:
  no record extraction, no personal profiling, no copied sampled text, no writes
- sheet-registry:
  no real IDs in Git, no credentials, no row reads, no writes
- real-sheet-profiling:
  no `getRange`, no `getValues`, no unauthorized profiling, no writes

## PASS / REVIEW / BLOCKED Logic

- `PASS`:
  boundaries respected, ambiguity acceptable, no identifier leakage, no governance conflict
- `REVIEW`:
  ambiguity remains, drift is unresolved, classification confidence is limited, or onboarding context is incomplete
- `BLOCKED`:
  authorization missing, identifier leakage detected, sensitive persistence observed, prohibited read/write behavior detected

## Escalation Paths

- package ambiguity -> governance review
- unresolved structural drift -> topology review
- field-category uncertainty -> semantic review
- authorization uncertainty -> onboarding review
- identifier leakage -> repository hygiene remediation
- attempted extraction behavior -> immediate block and governance escalation

## Boundary Rule

Every package must remain inside its narrowest applicable boundary. Crossing into a broader boundary requires explicit documentation, new governance review, and new audit evidence before any implementation change is allowed.
