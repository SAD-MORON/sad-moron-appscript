# Metadata-Only Test Boundary

## Allowed Operations
- Read spreadsheet metadata (name, sheet names, sheet count, last updated timestamp if available)
- Use only placeholder Sheet ID (SHEET_ID_PLACEHOLDER)
- Manual, non-production execution

## Prohibited Operations
- Reading any cell values or personal data
- Writing or modifying any spreadsheet or document
- Setting up or using triggers
- Persisting credentials or tokens
- Bulk extraction or export of data
- Deployment to production or automated environments
- Use of real Sheet IDs or credentials

## Metadata-Only Rule
- All actions must be limited to non-sensitive metadata
- No access to or processing of user or business data

## Rollback/Stop Condition
- Immediately stop and rollback if any data read, write, or trigger is attempted
- Evidence of any prohibited operation must be documented and reported

## Evidence Expectations
- Only metadata access logs
- No sensitive or personal data in logs or outputs

## Sensitive Data Exclusions
- No personal, confidential, or business data accessed, processed, or stored
- No credentials or tokens stored or reused
