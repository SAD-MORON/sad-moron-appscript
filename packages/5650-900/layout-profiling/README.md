# Governed Layout Profiling for Irregular Google Sheets

This module defines a governed layout-profiling scaffold for poorly structured or semi-structured Google Sheets.

Layout profiling is a pre-extraction governance step. The goal is structural understanding, not data mining, enrichment, or semantic interpretation of spreadsheet content.

## Purpose

The scaffold supports bounded inspection of spreadsheet layout to help determine whether a sheet is suitable for later governed mapping work. It is designed for situations where sheet structure may be irregular, fragmented, merged, partially hidden, or visually organized in blocks rather than clean tables.

## Allowed Structural Signals

- Spreadsheet name and visible metadata
- Tab inventory and hidden sheet status
- Row and column dimensions
- Occupied versus empty row detection
- Occupied versus empty column detection
- Possible header row detection
- Merged range detection
- Frozen row and frozen column detection
- Structural block estimation
- Tab color or related sheet metadata when available

## Prohibited Behaviors

- Full row extraction
- Bulk `getValues()` across worksheet bodies
- Personal data logging
- Writes of any kind
- Trigger creation
- Credential handling or persistence
- Exports or external data transfer
- Drive-wide indexing
- Extraction pipelines or downstream persistence of sampled content

## Governance Boundary

- All examples must use `SHEET_ID_PLACEHOLDER`
- Sparse sampling is allowed only for structure inference
- Sampled cell content must never be persisted, logged, committed, or exported
- Sensitive data boundaries remain active even during structural analysis
- No real Sheet IDs, production deployment logic, or operational automation belong in this scaffold
