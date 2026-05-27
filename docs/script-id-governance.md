# Script ID Governance

## Script IDs Are Not Credentials, But They Are Sensitive Governance Metadata
Script IDs are operational references to Apps Script projects. They are not credentials by themselves, but they still identify governed production or operational assets and must not be committed to identifier-safe repositories.

## Script Ownership Requirements
Each script must have a clearly defined owner. Ownership must be documented and traceable.

## Deployment Traceability
All deployments must be traceable to a specific script reference and package through local-only operational records. No undocumented deployments are permitted.

## Mapping Between Package and Script Reference
A clear mapping between each package and its associated operational script reference must be maintained locally and outside Git-controlled governance artifacts.

## No Undocumented Script Execution
No script may be executed without documentation and governance approval.

## Repository Safety Rule
Governance repositories must remain identifier-safe. Real Script IDs belong only in approved local operational files, not in committed documentation, reports, manifests, or code comments.
