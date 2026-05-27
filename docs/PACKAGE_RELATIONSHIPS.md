# Package Relationships

## Primary Execution Order

`metadata-test`
-> `structure-read`
-> `layout-profiling`
-> `semantic-layout-profiling`
-> `pofa-layout-taxonomy`
-> `semantic-field-inference`
-> `sheet-registry`
-> `real-sheet-profiling`

## Dependency Map

- `metadata-test`:
  no upstream package dependency; establishes initial bounded access discipline
- `structure-read`:
  depends conceptually on metadata validation
- `layout-profiling`:
  depends on structural-read discipline and bounded sampling boundaries
- `semantic-layout-profiling`:
  depends on layout profiling and institutional zone interpretation boundaries
- `pofa-layout-taxonomy`:
  depends on structural and semantic layout signals for topology classification
- `semantic-field-inference`:
  depends on bounded semantic interpretation discipline
- `sheet-registry`:
  depends on governance onboarding, not on extraction logic
- `real-sheet-profiling`:
  depends on sheet authorization, registry readiness, and profiling gate controls

## Allowed Transitions

- `metadata-test` -> `structure-read`
- `structure-read` -> `layout-profiling`
- `layout-profiling` -> `semantic-layout-profiling`
- `semantic-layout-profiling` -> `pofa-layout-taxonomy`
- `pofa-layout-taxonomy` -> `semantic-field-inference`
- `semantic-field-inference` -> `sheet-registry`
- `sheet-registry` -> `real-sheet-profiling`

## Forbidden Coupling

- `sheet-registry` must not call extraction logic
- `real-sheet-profiling` must not skip authorization status
- `semantic-field-inference` must not depend on row-export behavior
- `pofa-layout-taxonomy` must not depend on person-level semantics
- `metadata-test` must not silently evolve into structure or semantic reads
- no package may bypass `audit/` or `reports/` evidence expectations through hidden automation

## Governance Checkpoints

- after `metadata-test`: confirm metadata-only behavior
- after `structure-read`: confirm header-row boundary
- after `layout-profiling`: confirm structure-only bounded sampling
- after `semantic-layout-profiling`: confirm zone-only output and ambiguity handling
- after `pofa-layout-taxonomy`: confirm topology-only fingerprinting and drift classification
- after `semantic-field-inference`: confirm field-level, not person-level, inference
- after `sheet-registry`: confirm authorization and identifier-safe onboarding
- after `real-sheet-profiling`: confirm readiness gate before controlled real profiling

## Audit Flow

- package execution -> evidence template selection
- evidence capture -> report generation when needed
- report review -> governance decision
- governance decision -> `PASS`, `REVIEW`, or `BLOCKED`

## Extraction Gates

- no extraction gate opens during synthetic-only packages
- no real-sheet profiling begins before registry authorization
- no extraction eligibility review begins until fingerprinting, semantic interpretation, and drift baseline are complete
- unresolved ambiguity or unresolved drift forces `REVIEW` or `BLOCKED`

## Relationship Rule

Execution order is directional and governed. Later packages may rely on the existence of earlier evidence, but they may not silently redefine earlier package boundaries or skip mandatory review stages.
