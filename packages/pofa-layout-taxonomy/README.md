# Governed POFA Layout Taxonomy and Structural Drift Scaffold

This module defines a governed taxonomy and structural fingerprinting scaffold for heterogeneous institutional spreadsheets with POFA-like layouts.

POFAs are semi-structured institutional documents. Their layouts often vary across educational levels, modalities, years, and institutional formats, which means topology matters more than fixed coordinates.

## Purpose

The scaffold provides a governance-first way to:

- fingerprint spreadsheet structure
- classify layout families
- register level and modality context
- compare structural versions
- detect drift before any extraction design begins

The goal is structure-aware readiness assessment, not content extraction or semantic profiling of personal data.

## Why Topology Matters

Institutional spreadsheets may preserve the same business meaning while changing:

- educational level
- modality
- year or version
- institutional format
- merge patterns
- header depth
- cuadro placement
- repeated administrative blocks
- table start locations
- visual segmentation

A fixed-coordinate parser would be brittle in those conditions. This scaffold treats layout as topology: a structural arrangement of blocks, merges, headers, and regions.

## Core Concepts

- `layout fingerprint`: a stable structural signature derived from dimensions, merge geometry, header topology, and detected zones
- `level dimension`: the educational level context associated with a layout family when available
- `modality dimension`: the modality context associated with a layout family when available
- `year/version dimension`: the temporal version context used to avoid false drift comparisons
- `institutional format dimension`: the form-style or organizational variant of an otherwise similar POFA
- `structural topology`: row and column organization independent of personal content
- `merge topology`: arrangement and density of merged regions
- `header topology`: depth, concentration, and likely start positions of headers
- `cuadro detection`: bounded detection of label-like structural zones
- `institutional block detection`: repeated or clustered administrative structures
- `layout family registry`: a governed registry of comparable POFA families
- `modality-specific fingerprint baseline`: the baseline used for same-modality comparison
- `level-specific compatibility scoring`: compatibility scoring that respects educational level context
- `structural compatibility score`: percentage estimate of whether two layouts can share a governed mapping strategy
- `drift classification`: severity label for changes between versions
- `layout family classification`: broad family label for similar institutional structures
- `modality/level hints`: low-risk structural hints, never authoritative semantic extraction
- `version comparison`: structure-only diffing between fingerprints

## Example Dimensions

- `Inicial`
- `Primaria`
- `Secundaria`
- `Tecnica`
- `Especial`
- `Psicologia`
- `Adultos`
- `Artistica`
- `Educacion Fisica`

## Allowed Outputs

- structural metadata
- merge coordinates
- row and column geometry
- zone classifications
- structural signatures
- compatibility percentages
- topology hashes and fingerprints

## Prohibited Behaviors

- docente extraction
- DNI, CUIL, or personal identifier handling
- full table export
- semantic personal profiling
- writes of any kind
- trigger creation
- credential handling or persistence
- production deployment logic
- persistence of sampled values

## Governance Philosophy

- Use `SpreadsheetApp.getActiveSpreadsheet()` for bound synthetic or controlled test contexts
- Read only what is needed for structural classification
- Never return sampled cell text verbatim
- Keep fingerprints structural, reproducible, and auditable
- No POFA parser may assume a universal structure
- Fingerprints must include level and modality context when available
- Structural diff must compare like-with-like unless an explicit human override is documented
- Unknown modality must produce `REVIEW`, not `PASS`
- Extraction eligibility requires level/modality classification or explicit human override
- Treat ambiguity as a governance signal for review, not a reason to widen read scope
