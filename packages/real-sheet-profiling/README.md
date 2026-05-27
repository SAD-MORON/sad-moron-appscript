# Governed Controlled Real-Sheet Profiling Readiness Scaffold

This module defines a governed readiness scaffold for the first authorized real Google Sheet profiling workflow.

The purpose is to move from synthetic testing to controlled real-sheet structural profiling under governance, without storing real Sheet IDs, credentials, sensitive data, or extracted rows in Git.

## Purpose

Controlled real-sheet profiling is not extraction. It is a gated structural-readiness layer used to confirm whether an authorized spreadsheet is ready for metadata registration, fingerprinting, taxonomy classification, semantic inference, and drift baseline review.

## Allowed Outputs

- active spreadsheet metadata
- tab names
- structural fingerprint reference
- layout family classification
- semantic inference status
- drift baseline status
- authorization status
- profiling readiness status

## Prohibited Behaviors

- real Sheet IDs in Git
- credentials
- personal data extraction
- row exports
- full table reads
- writes to source sheets
- triggers
- production deployment
- unauthorized profiling

## Governance Boundary

- Documentation plus scaffold only
- Use `SpreadsheetApp.getActiveSpreadsheet()` for controlled authorized tests
- No `openById`
- No `getRange` or `getValues`
- No real identifiers in committed artifacts
- Readiness is a governance checkpoint, not extraction approval
