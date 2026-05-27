# Governed Semantic Layout Profiling for Institutional Spreadsheets

This module defines a governed semantic layout-profiling scaffold for POFA-like or institutional spreadsheet structures.

Semantic layout profiling is a pre-extraction governance step. The goal is to identify structural zones and institutional layout patterns without extracting row-level records or personal data.

## Purpose

Many institutional spreadsheets are visually organized rather than cleanly normalized. Titles, merged headers, administrative note areas, repeated blocks, and table sections may coexist in the same tab. This scaffold helps identify those zones so later governed mapping work can be scoped safely.

## Allowed Outputs

- Spreadsheet name and tab inventory
- Row and column dimensions
- Merge coordinates
- Structural row and column bounds
- Detected zone types
- Confidence levels
- Possible data table start rows
- Visual region summaries

## Target Zone Types

- `merged-title-block`
- `institutional-header-zone`
- `cuadro-label-zone`
- `multi-row-header-zone`
- `observation-zone`
- `repeated-administrative-block`
- `visual-layout-region`
- `possible-data-table-start`

## Prohibited Behaviors

- Personal data extraction
- Full table reads
- Row-level docente data access
- DNI, CUIL, or name extraction
- Logging sampled cell values
- Writes of any kind
- Trigger creation
- Credential handling or persistence
- Real Sheet IDs
- Extraction pipelines, exports, or downstream persistence of sampled content

## Governance Boundary

- Use `SpreadsheetApp.getActiveSpreadsheet()` for bound-sheet testing only
- Sample text may be read transiently in a bounded region for zone classification, but must never be returned verbatim
- Output must remain structural and confidence-based
- Sensitive data boundaries remain active during all profiling steps
- The synthetic workbook reference is conceptual only and must not be treated as a production source
