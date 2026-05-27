# Governance Inheritance

## Framework Authority
This repository is governed by the sad-moron-framework, which defines all governance, compliance, and operational boundaries for Apps Script implementations.

It inherits governance principles from Janus Core through the SAD Framework.

This repository does not depend on the full Janus runtime ecosystem.

## Connector Contract Inheritance
Connector contracts are inherited from sad-moron-connectors. All package implementations must conform to these contracts without modification.

## Inheritance Chain

Janus Core
-> SAD Framework
-> SAD-MORON-APPSCRIPT

## Implementation Handoff Discipline
Implementation handoff between packages and shared utilities must be explicit and documented. No implicit or undocumented handoff is permitted.

## No Governance Override by Package Logic
No package or implementation may override, bypass, or redefine governance rules established by the framework or connectors.
