# Governed Semantic Field Inference Scaffold

This module defines a governed scaffold for semantic field inference in heterogeneous institutional spreadsheets.

Semantic field inference is a pre-extraction governance step. Its purpose is to infer likely field categories from bounded structural context without extracting records, persisting sampled content, or building an operational ingestion engine.

## Purpose

Institutional spreadsheets often label similar concepts in different ways across years, modalities, and visual layouts. This scaffold helps estimate likely field roles so later governed mapping work can be reviewed with better structural context.

## What This Scaffold May Infer

- likely field categories
- possible identifier fields
- possible administrative descriptor fields
- possible date-like fields
- possible quantity or metric fields
- possible observation or note fields
- confidence levels
- structural evidence summaries

## What This Scaffold Must Not Do

- extract rows or records
- persist sampled values
- log copied personal data
- infer personal profiles
- process DNI, CUIL, names, or docente records
- write to spreadsheets or external systems
- create triggers
- handle credentials
- use real Sheet IDs
- act as a production extraction engine

## Governance Boundary

- Documentation and scaffold only
- Use `SpreadsheetApp.getActiveSpreadsheet()` for controlled bound-sheet testing
- Output must remain categorical and confidence-based
- Structural evidence must never include copied cell content
- Ambiguity should be escalated for review instead of widening read scope
