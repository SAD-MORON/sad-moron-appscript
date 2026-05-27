# Local Identifier Governance

## Script ID vs Credentials

An Apps Script ID is not the same thing as a credential. A Script ID identifies a specific Apps Script project, while credentials grant access or authority.

## Why Script IDs Still Matter

Even though Script IDs are not secrets in the same way as tokens or keys, they are still sensitive governance metadata because they point to real operational assets. In a governance-first repository, those identifiers should be treated as local-only references.

## Local-Only Operational References

- Real Script IDs must remain local-only
- Real identifiers must not be committed to Git
- Local operational mappings may exist outside the repository or in ignored local files

## Repository Hygiene Rules

- No production identifiers in committed code
- No production identifiers in README files, reports, or governance notes
- No credentials in local or committed files
- No deployment artifacts committed from local Apps Script workflows

## Onboarding Safety Rules

- Use placeholders in governance scaffolds
- Record authorization and workflow state without recording real identifiers
- Treat identifier cleanup as a governance event that must be auditable
- Escalate before introducing any real operational reference into version control
