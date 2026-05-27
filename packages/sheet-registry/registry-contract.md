# Sheet Registry Contract

This contract defines the required governance fields for a real-sheet onboarding registry entry.

## Required Fields

- `registryId`
- `sourceAlias`
- `sourceType`
- `institutionalOwner`
- `workflowReference`
- `connectorReference`
- `appscriptPackageReference`
- `sensitivityClassification`
- `authorizationStatus`
- `allowedAccessMode`
- `fingerprintReference`
- `driftReviewStatus`
- `extractionEligibility`
- `notes`

## Contract Rules

- Do not store real Sheet IDs in Git
- Do not store credentials
- Do not store copied cell content
- Keep entries metadata-only until authorization and structural review are complete
- Treat extraction eligibility as a governance decision, not an automatic consequence of registration
