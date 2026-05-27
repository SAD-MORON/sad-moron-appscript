# First Controlled Google Sheets Connection Test Plan

## 1. Source Owner
To be assigned by institutional data governance lead.

## 2. Institutional Purpose
Validate governance-compliant, read-only access to Google Sheets for institutional reporting. No personal or sensitive data will be accessed.

## 3. Target Spreadsheet Placeholder
SHEET_ID_PLACEHOLDER

## 4. Expected Tabs
- summary

## 5. Allowed Fields
- Sheet metadata (title, sheetId, tab name)
- Declared tab: summary

## 6. Excluded Fields
- All cell values
- All user data
- Any non-summary tab

## 7. Read-Only Test Scope
- Read spreadsheet metadata
- Read the name of the declared tab (summary) only
- No cell data, no write, no triggers

## 8. Evidence Expected
- Log of metadata fields read
- Confirmation of summary tab presence

## 9. Rollback/Safe-Stop Rule
- Immediately halt and report if any non-metadata or non-summary tab data is accessed or if any write/trigger action is attempted.
