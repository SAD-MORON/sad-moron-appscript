# Governed Real-Sheet Onboarding and Registry Scaffold

This module defines a governed sheet registry scaffold for transitioning from synthetic spreadsheet tests to authorized real Google Sheets structural onboarding.

The sheet registry is not extraction. It is a governance onboarding layer used to track authorized spreadsheet references, workflow associations, sensitivity classifications, and structural readiness without storing real Sheet IDs, credentials, or sensitive data in Git.

## Purpose

Before any real institutional spreadsheet can be structurally profiled, semantically classified, or reviewed for extraction eligibility, it must first be onboarded through a metadata-only governance registry.

## Registry Principles

- Real planillas must be authorized before profiling
- Registry entries must not contain real Sheet IDs
- Registry entries must not contain sensitive data
- Registry tracks governance and workflow state, not extracted content
- Local-only Sheet ID use is allowed outside Git-controlled artifacts

## Allowed Outputs

- spreadsheet name
- sheet count
- sheet names
- workflow mapping
- sensitivity classification
- authorization status
- fingerprint status
- onboarding status

## Prohibited Behaviors

- storing real Sheet IDs in the repository
- storing credentials
- reading personal data
- exporting rows
- writing to source sheets
- creating triggers
- bulk processing
- production deployment

## Governance Boundary

- Documentation plus scaffold only
- Use `SpreadsheetApp.getActiveSpreadsheet()` for controlled onboarding tests
- No cell value reads
- No source-sheet writes
- No registry content should expose identifiers or sensitive information
