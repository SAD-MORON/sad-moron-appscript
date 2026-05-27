# Pilot Context And Governance Primitives

## Purpose

This document explains the pilot context for `SAD-MORON-APPSCRIPT` and defines the minimum governance primitives that give stable meaning to this runtime-adjacent repository.

It exists to clarify why governance precedes runtime expansion, why scaffold code must remain bounded, and which minimum concepts must stay stable if future operational layers inherit from this repository.

## Pilot Context

This repository originated as a bounded Apps Script governance and scaffold layer associated with administrative workflow modernization in the educational domain.

It is a pilot governance/runtime-adjacent repository.

It does not claim official endorsement beyond its documented repository scope.

It is intended to support continuity, auditability, interoperability, bounded profiling, and responsible operational preparation without exposing protected operational details.

## Why This Repository Exists

Apps Script work can drift quickly into live operational behavior if governance boundaries are not declared first.

This repository exists so profiling, taxonomy, onboarding, and structural-readiness work can be documented and constrained before production-facing execution expands.

Governance must precede automation because runtime-adjacent scaffolds can silently widen read scope, identifier exposure, or operational assumptions unless boundaries remain explicit.

Human institutional authority remains central because governance review, evidence, and bounded classifications support decision-making but do not replace accountable authorization.

## Minimum Governance Primitives

### Boundary

A boundary is the declared limit of what a repository area, package, report, or scaffold may govern or execute.

### Declared Source

A declared source is an explicitly identified source that may support governance interpretation within a defined scope.

### Evidence

Evidence is the recorded basis for supporting or constraining a governance interpretation within a declared source, scope, and period.

Evidence supports review; it does not automatically authorize execution.

### Drift

Drift is unintended change in governance meaning, workflow interpretation, identifier posture, or execution scope that occurs without explicit review and approval.

### Append-Only Record

An append-only record preserves prior governance context by adding clarification, supersession, or later findings rather than silently erasing earlier reasoning when that traceability matters.

### PASS / REVIEW / BLOCKED

`PASS` means the declared governance minimum is satisfied for the relevant phase.

`REVIEW` means the repository, workflow, or scaffold is usable only with unresolved governance questions made explicit.

`BLOCKED` means progression should not continue until the blocking governance issue is resolved.

### Human Authority Gate

Governance findings, profiling signals, taxonomy hints, or readiness classifications do not become institutional decisions without accountable human review or authorization.

### Sensitive-Data Boundary

The sensitive-data boundary is the rule that production Sheet IDs, Script IDs, credentials, tokens, privileged mappings, and protected spreadsheet content must remain outside inappropriate repository surfaces.

### Public/Private Operational Boundary

The public/private operational boundary distinguishes what may remain public as governance, documentation, audit posture, taxonomy, and synthetic or bounded scaffolds from what may remain external/private as deployments, credentials, production mappings, and sensitive integrations.

## Janus Core Relation

`SAD-MORON-APPSCRIPT` inherits governance principles from Janus Core through the SAD Framework.

It does not depend on the full Janus runtime ecosystem.

It selectively applies governance principles derived from Janus Core to a bounded Apps Script layer for profiling, taxonomy, onboarding, and execution-readiness controls.

## Guidance For AI Agents Reading This Repository

AI agents reading this repository should observe the following rules:
- do not infer runtime permissions
- do not treat scaffold code as production
- do not expose Sheet IDs or Script IDs
- do not infer extraction eligibility
- do not run code without audit-before-execution posture
- do not treat old reports as current governance authority
- current authority lives in `docs/`, `packages/*/test-boundary.md`, `audit/`, and framework references
- when uncertain, classify `REVIEW` or `BLOCKED`

Governance documents define meaning and boundaries, not automatic permission to execute, bind, deploy, ingest, or operationalize.

## Institutional Neutrality

This repository should be read as an institutional governance and bounded scaffold artifact with pilot origins, not as a political statement, personal brand, or claim of official production endorsement.

Its intended value is continuity, bounded modernization, and reconstructable governance meaning.

## Summary

This repository is a pilot governance/runtime-adjacent layer that preserves a minimum set of governance primitives so future readers, packages, and AI agents can interpret it safely without widening operational scope by implication.
