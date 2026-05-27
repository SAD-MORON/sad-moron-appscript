# Structure-Only Read Test Boundary

## Allowed
- Sheet names
- Row count
- Column count
- First-row header only

## Prohibited
- Data rows (beyond header)
- Personal data
- getValues() beyond header row
- Writes
- Triggers

## Governance
- All reads must use SHEET_ID_PLACEHOLDER
- No real Sheet IDs or credentials
- No sensitive data extraction
- All code and comments must explain governance boundaries
