# SAD-MORON-APPSCRIPT

`SAD-MORON-APPSCRIPT` is the SAD Framework operational Apps Script layer for bounded spreadsheet profiling, taxonomy, onboarding, and governance-adjacent scaffold work.

## Governance Posture

This repository is governance-first and documentation-first where governance meaning must stabilize before runtime-adjacent expansion.

It inherits governance principles from Janus Core through the SAD Framework and implements a bounded Apps Script layer within that inheritance chain.

This repository does not depend on the full Janus runtime ecosystem.

Current governance authority lives primarily in:
- [docs/](docs/)
- package boundary files in `packages/*/test-boundary.md`
- [audit/](audit/)
- relevant SAD Framework governance references

`reports/` is evidence and history, not the default source of current governance authority.

## Execution Boundary

- No credentials in Git
- No production Sheet IDs in Git
- No production Script IDs in Git
- No sensitive data in Git
- No hidden authority
- No unrestricted automation
- No production deployment configuration in this repository
- Scaffold code must not be treated as production runtime

Apps Script execution must remain bounded, auditable, and reviewable before any governance-sensitive execution expands.

## Public And Private Boundary

Apache License 2.0 applies to the governance, documentation, audit, taxonomy, and scaffold layers in this repository.

Production deployments, credentials, production Sheet IDs, institutional mappings, runtime integrations, and sensitive integrations may remain external/private or separately governed.

Public governance publication here does not imply publication of live connectors, privileged mappings, or production execution artifacts.

## Governance Inheritance

- Janus Core
- SAD Framework
- SAD-MORON-APPSCRIPT

Packages may specialize bounded workflow, taxonomy, profiling readiness, and onboarding scaffolds, but they may not redefine inherited governance meaning.

## Licensing And Related Docs

- [LICENSE](LICENSE)
- [NOTICE](NOTICE)
- [AI Agent Guide](docs/AI_AGENT_GUIDE.md)
- [Pilot Context And Governance Primitives](docs/pilot-context-and-governance-primitives.md)

## Attribution

Initial governance architecture:
Martín Nicolás Sánchez Morales
