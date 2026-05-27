# Structure-Only Spreadsheet Read (Governed)

This module provides a governed scaffold for structure-only inspection of Google Sheets.

## Allowed Operations
- Read sheet names
- Read row and column counts (structure only)
- Inspect first-row headers only

## Prohibited Operations
- Reading any data rows beyond the header
- Accessing or processing personal data
- Using getValues() beyond the header row
- Any write operations
- Any trigger creation

## Governance
- All reads must use SHEET_ID_PLACEHOLDER
- No real Sheet IDs or credentials
- No sensitive data extraction
- All code and comments must explain governance boundaries
