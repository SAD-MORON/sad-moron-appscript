# POFA Structural Diff Template

- testName:
- timestamp:
- evidenceType: pofa-structural-diff
- previousFingerprintId:
- currentFingerprintId:
- previousLevelDimension:
- currentLevelDimension:
- previousModalityDimension:
- currentModalityDimension:
- previousYearVersionDimension:
- currentYearVersionDimension:
- layoutFamilyComparisonMode: LIKE_FOR_LIKE | HUMAN_OVERRIDE
- compatibilityScore:
- levelSpecificCompatibilityScore:
- driftSeverity: LOW | MEDIUM | HIGH | CRITICAL
- changedSheets:
- changedTopologies:
- detectedZoneChanges:
- result: PASS | REVIEW | BLOCKED
- notes:

## Evidence Rules

- Do not include Sheet IDs
- Do not include sampled or copied cell text
- Do not include credentials
- Do not include personal or sensitive data
- Do not compare unlike levels or modalities as standard `PASS` without explicit override
- Describe structure-only differences
