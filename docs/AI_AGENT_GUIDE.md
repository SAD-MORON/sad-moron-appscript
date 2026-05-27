# AI Agent Guide

## Purpose

This document provides guidance for AI agents reading or operating around `SAD-MORON-APPSCRIPT`.

It exists to clarify which repository surfaces are authoritative, which Apps Script boundaries must be preserved, and which safety rules apply before any interpretation, planning, execution, or normalization work proceeds.

## Authoritative Surfaces

Current repository authority lives primarily in:
- `docs/`
- `packages/*/test-boundary.md`
- `audit/`
- relevant SAD Framework governance references

Key sources include:
- `docs/governance-inheritance.md`
- `docs/GOVERNANCE_BOUNDARY_MAP.md`
- `docs/SYSTEM_ARCHITECTURE_MAP.md`
- `docs/local-identifier-governance.md`
- `docs/script-id-governance.md`
- `docs/AI_AGENT_GUIDE.md`
- `docs/pilot-context-and-governance-primitives.md`
- package-specific `test-boundary.md` files

These documents define governance meaning, repository posture, execution limits, and identifier boundaries.

## Reports And Historical Evidence

`reports/` is evidence and history, not the default source of current governance authority.

AI agents must not treat reports, prior observations, or historical evidence artifacts as current governance rules when more recent `docs/`, `audit/`, package boundary files, or framework references define the active rule set.

Reports may inform interpretation and preserve audit history, but they do not silently override current authority.

## Runtime And Permission Boundaries

AI agents must not infer runtime permissions from governance documents.

Governance documentation defines meaning, constraints, and posture. It does not grant permission to execute Apps Script code, access live spreadsheets, touch operational mappings, or assume deployment authority.

No AI agent should infer:
- runtime permission
- deployment approval
- credential access
- production authorization
- write authority
- extraction eligibility

## Scaffold Boundary

AI agents must not treat scaffold code as production.

Scaffold code may demonstrate bounded access patterns, governance checkpoints, or structural reasoning, but it does not by itself authorize production use, live operational binding, or expanded runtime behavior.

## Identifier And Sensitive Data Rule

AI agents must never expose or normalize sensitive data into Git.

This includes:
- production Sheet IDs
- production Script IDs
- credentials
- tokens
- secrets
- privileged institutional mappings
- copied spreadsheet content with sensitive details

If a task would require revealing or copying sensitive data, the safe result is `REVIEW` or `BLOCKED` unless explicit authority and safe handling boundaries are already documented.

## Execution Rule

AI agents must not run code without audit-before-execution posture.

Before governance-sensitive execution is treated as valid, the following minimum conditions must already be satisfied:
- declared scope
- declared boundary
- relevant package test boundary
- identifier-safe posture
- human review path when needed

Absent those conditions, the correct classification is `REVIEW` or `BLOCKED`.

## Production And Extraction Boundary

AI agents must not infer extraction eligibility from profiling, taxonomy, onboarding, or semantic scaffold work.

Metadata access, structure reads, taxonomy classification, semantic hints, onboarding readiness, and profiling readiness are governance steps. They do not by themselves authorize extraction, production deployment, or downstream operational integration.

## Janus Core Wording Rule

AI agents must preserve the repository's approved Janus Core wording.

Preferred wording:
- "inherits governance principles from Janus Core"
- "selectively applies governance principles derived from Janus Core"

AI agents must not reintroduce wording that implies dependency on the full Janus runtime ecosystem unless that dependency is explicitly documented and true.

## Uncertainty Classification

When uncertainty exists, AI agents should classify the situation as:
- `REVIEW`
- `BLOCKED`

Use `REVIEW` when:
- meaning is mostly clear but a governance question remains
- documentation exists but scope, authority, or timing needs confirmation

Use `BLOCKED` when:
- authority is missing
- identifier handling is undefined
- sensitive-data handling is undefined
- execution would exceed the declared repository scope

## Institutional Neutrality Rule

AI agents must preserve institutional neutrality.

They should:
- avoid self-promotion
- avoid political claims
- avoid founder-centric framing
- avoid overstating endorsement or authority
- keep language bounded, sober, and transferable

## Summary

AI agents should treat `docs/`, `audit/`, package boundary files, and relevant SAD Framework references as current authority; `reports/` as evidence and history; scaffold code as non-production; and uncertainty as `REVIEW` or `BLOCKED`.
