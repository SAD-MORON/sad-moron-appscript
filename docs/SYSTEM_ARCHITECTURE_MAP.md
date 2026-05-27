# System Architecture Map

## Repository Purpose

`SAD-MORON-APPSCRIPT` is a governance-first Apps Script repository for bounded Google Sheets profiling, structural interpretation, and extraction-readiness assessment. Its purpose is to develop controlled scaffolds, audit records, and architecture controls before any extraction engine is authorized.

## Governance Inheritance

This repository inherits governance authority from `sad-moron-framework` and connector discipline from `sad-moron-connectors`. Packages may implement scoped logic, but they may not redefine governance, bypass boundaries, or introduce hidden operational paths.

## Architectural Layers

- `packages/`: scaffold and package-layer bounded logic
- `audit/`: evidence templates and review structures
- `reports/`: execution records, onboarding plans, and governance outcomes
- `docs/`: architecture controls, repository-wide boundaries, and operational rules

## Package Categories

- metadata access:
  `metadata-test`
- structure-only access:
  `structure-read`
- structural profiling:
  `layout-profiling`
- semantic structural interpretation:
  `semantic-layout-profiling`
- topology and drift classification:
  `pofa-layout-taxonomy`
- field-category interpretation:
  `semantic-field-inference`
- real-sheet onboarding:
  `sheet-registry`
- profiling readiness:
  `real-sheet-profiling`

## Synthetic vs Real-Sheet Phases

- synthetic phase:
  validate governance, bounded reads, and audit flow without sensitive content
- authorized real-sheet phase:
  allow metadata-only onboarding, then controlled profiling readiness checks
- extraction review phase:
  remains gated behind authorization, ambiguity review, and drift review

## Bounded Execution Philosophy

- metadata before structure
- structure before semantic interpretation
- semantic interpretation before extraction eligibility review
- POFA taxonomy must be level-aware, modality-aware, year-aware, and format-aware
- local-only identifiers
- no credentials in Git
- no hidden coupling between packages
- every advancement requires an explicit governance checkpoint

## Current Maturity Stages

- `metadata-test`: synthetic-ready
- `structure-read`: synthetic-ready
- `layout-profiling`: synthetic-ready
- `semantic-layout-profiling`: synthetic-ready
- `pofa-layout-taxonomy`: synthetic-ready
- `semantic-field-inference`: synthetic-ready
- `sheet-registry`: onboarding-ready
- `real-sheet-profiling`: authorization-ready

## Package Inventory

### `metadata-test`

- objective: validate bounded spreadsheet connection and metadata-only access
- allowed operations: spreadsheet name, sheet names, sheet count, bounded metadata inspection
- prohibited operations: cell-value reads, writes, triggers, credential persistence, deployment
- current maturity: synthetic-ready
- dependency level: foundational
- governance risk level: low

### `structure-read`

- objective: inspect structure-only sheet layout with header-row boundary
- allowed operations: sheet names, row counts, column counts, first-row headers only
- prohibited operations: data-row reads, full-table reads, writes, triggers, sensitive extraction
- current maturity: synthetic-ready
- dependency level: early-stage profiling dependency
- governance risk level: low to medium

### `layout-profiling`

- objective: infer structural layout from sparse bounded sampling
- allowed operations: occupancy inference, merge counts, frozen rows/columns, possible header detection
- prohibited operations: bulk extraction, personal data logging, writes, triggers, exports
- current maturity: synthetic-ready
- dependency level: structural profiling core
- governance risk level: medium

### `semantic-layout-profiling`

- objective: detect institutional structural zones without extracting row content
- allowed operations: zone-type detection, merge coordinates, visual-region inference, confidence labels
- prohibited operations: row-level profiling, DNI/CUIL/name extraction, writes, triggers, exports
- current maturity: synthetic-ready
- dependency level: advanced profiling layer
- governance risk level: medium to high

### `pofa-layout-taxonomy`

- objective: create topology fingerprints, layout family registries, and drift comparison scaffolds across level, modality, year, and institutional format dimensions
- allowed operations: topology hashes, merge topology, header topology, level/modality context, compatibility scoring, drift severity
- prohibited operations: personal profiling, full exports, writes, triggers, deployment
- current maturity: synthetic-ready
- dependency level: architecture classification layer
- governance risk level: high

### `semantic-field-inference`

- objective: infer likely field categories from bounded structural context
- allowed operations: field-category inference, confidence, structural evidence summaries, ambiguity classification
- prohibited operations: record extraction, person-level inference, persistence of sampled values, writes
- current maturity: synthetic-ready
- dependency level: semantic interpretation layer
- governance risk level: high

### `sheet-registry`

- objective: onboard authorized real sheets through metadata-only governance registration
- allowed operations: spreadsheet metadata, workflow mapping, sensitivity classification, authorization state
- prohibited operations: storing real Sheet IDs, credentials, row reads, writes, triggers, deployment
- current maturity: onboarding-ready
- dependency level: real-sheet gate
- governance risk level: medium

### `real-sheet-profiling`

- objective: assess whether an authorized real sheet is ready for controlled structural profiling
- allowed operations: readiness metadata, tab names, status flags, profiling readiness classification
- prohibited operations: range reads, full-table reads, writes, triggers, unauthorized profiling
- current maturity: authorization-ready
- dependency level: final gate before real profiling
- governance risk level: medium to high

## Cross-Layer Notes

- `audit/` artifacts capture evidence and review logic, but never authorize extraction by themselves
- `reports/` capture observed outcomes and phased plans, but must remain identifier-safe and non-sensitive
- `docs/` define the architectural truth used to prevent package drift and unsafe sequencing
- POFA-like structures must never be treated as one universal family; examples include `Inicial`, `Primaria`, `Secundaria`, `Tecnica`, `Especial`, `Psicologia`, `Adultos`, `Artistica`, and `Educacion Fisica`
