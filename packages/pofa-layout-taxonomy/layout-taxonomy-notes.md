# POFA Layout Taxonomy Notes

These notes describe the intended taxonomy vocabulary for governed structural classification of POFA-like spreadsheets.

## Layout Families

- `institutional-multi-cuadro`
- `institutional-header-led`
- `generic-semi-structured`

## Level Dimension

- `Inicial`
- `Primaria`
- `Secundaria`
- `Tecnica`
- `Especial`
- `Psicologia`
- `Adultos`
- `Artistica`
- `Educacion Fisica`

## Modality and Format Dimensions

- modality dimension must be tracked separately from layout family
- year/version dimension must be tracked separately from modality
- institutional format dimension must capture local form variants
- unknown modality or unknown level must trigger `REVIEW`

## Structural Dimensions

- merge topology
- header topology
- row density pattern
- column occupancy pattern
- repeated institutional blocks
- cuadro-driven sectioning
- visual segmentation

## Fingerprint Components

- fingerprint id
- topology hash
- level dimension
- modality dimension
- year/version dimension
- institutional format dimension
- merge density
- header depth
- detected zones
- size band
- upper-region activity

## Compatibility Rules

- compare like-with-like by default
- do not compare `Tecnica` against `Inicial` as if they were the same family
- do not compare different modalities as directly compatible without explicit override
- use modality-specific baselines and level-specific compatibility scoring

## Drift Classification

- `LOW`: highly compatible structural change
- `MEDIUM`: moderate structural change requiring review
- `HIGH`: significant topology drift likely to affect mapping
- `CRITICAL`: major incompatibility or family change

## Governance Notes

- Topology is more durable than exact coordinates
- Similar-looking sheets may still drift structurally between years
- Modality or level hints must remain bounded and non-authoritative
- No POFA parser may assume a universal structure
- Extraction eligibility requires level/modality classification or explicit human override
- Ambiguity is a review signal, not a justification for broader reads
