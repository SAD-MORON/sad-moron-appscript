// Governed POFA Layout Taxonomy and Structural Drift Scaffold
// Governed by SAD-MORON-FRAMEWORK
// No real Sheet IDs, credentials, or sensitive persistence
// No writes, triggers, exports, or production deployment

/**
 * Builds a structural fingerprint for the active spreadsheet and classifies it
 * into a governed layout family.
 *
 * Fingerprinting:
 *   - Converts sheet geometry, merge topology, header topology, and detected
 *     structural zones into stable signatures and hashes.
 *
 * Taxonomy classification:
 *   - Uses bounded structural cues to assign a provisional layout family and
 *     modality/level hints without extracting row-level records.
 *
 * Drift detection:
 *   - Designed to pair with previously captured structural fingerprints for
 *     structure-only comparison and compatibility scoring.
 *
 * Constraints:
 *   - Use SpreadsheetApp.getActiveSpreadsheet()
 *   - Never log or return sampled cell values
 *   - Never read full tables or worksheet bodies
 *   - Never write, trigger, export, or deploy
 */
function fingerprintPofaLayout_Scaffold() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var fingerprint = {
    spreadsheetName: ss.getName(),
    sheetCount: sheets.length,
    layoutFamilyClassification: null,
    modalityLevelHints: [],
    sheetFingerprints: sheets.map(buildSheetFingerprint_Scaffold_)
  };

  fingerprint.layoutFamilyClassification = classifyLayoutFamily_Scaffold_(
    fingerprint.sheetFingerprints
  );
  fingerprint.modalityLevelHints = inferModalityLevelHints_Scaffold_(
    fingerprint.sheetFingerprints
  );
  fingerprint.fingerprintId = buildFingerprintId_Scaffold_(fingerprint);

  Logger.log(JSON.stringify(fingerprint, null, 2));
  return fingerprint;
}

/**
 * Performs a structure-only comparison between two fingerprints.
 * The arguments are expected to be previously captured structural objects.
 */
function comparePofaFingerprints_Scaffold(previousFingerprint, currentFingerprint) {
  var comparison = {
    previousFingerprintId: previousFingerprint ? previousFingerprint.fingerprintId : null,
    currentFingerprintId: currentFingerprint ? currentFingerprint.fingerprintId : null,
    compatibilityScore: calculateCompatibilityScore_Scaffold_(
      previousFingerprint,
      currentFingerprint
    ),
    driftSeverity: classifyDriftSeverity_Scaffold_(previousFingerprint, currentFingerprint),
    changedSheets: compareSheetFingerprints_Scaffold_(previousFingerprint, currentFingerprint)
  };

  Logger.log(JSON.stringify(comparison, null, 2));
  return comparison;
}

/**
 * Builds a structural fingerprint for a single sheet.
 */
function buildSheetFingerprint_Scaffold_(sheet) {
  var rowCount = sheet.getMaxRows();
  var colCount = sheet.getMaxColumns();
  var topologySample = sampleTopologySignals_Scaffold_(sheet, rowCount, colCount);
  var mergeTopology = buildMergeTopology_Scaffold_(sheet);
  var headerTopology = buildHeaderTopology_Scaffold_(topologySample);
  var detectedZones = detectTaxonomyZones_Scaffold_(topologySample, mergeTopology);

  return {
    sheetName: sheet.getName(),
    rowCount: rowCount,
    colCount: colCount,
    hidden: sheet.isSheetHidden(),
    frozenRows: sheet.getFrozenRows(),
    frozenColumns: sheet.getFrozenColumns(),
    mergeDensity: mergeTopology.mergeDensity,
    mergeCoordinates: mergeTopology.mergeCoordinates,
    structuralTopology: buildStructuralTopology_Scaffold_(
      rowCount,
      colCount,
      topologySample,
      mergeTopology
    ),
    headerTopology: headerTopology,
    detectedZones: detectedZones,
    topologyHash: buildTopologyHash_Scaffold_(
      rowCount,
      colCount,
      mergeTopology,
      headerTopology,
      detectedZones
    )
  };
}

/**
 * Samples only a bounded top-left region for topology inference.
 * Sampled text is normalized transiently and never returned.
 */
function sampleTopologySignals_Scaffold_(sheet, rowCount, colCount) {
  var scanRowCount = Math.min(rowCount, 20);
  var scanColCount = Math.min(colCount, 14);
  var values = [];

  if (scanRowCount > 0 && scanColCount > 0) {
    values = sheet.getRange(1, 1, scanRowCount, scanColCount).getDisplayValues();
  }

  return {
    scanRowCount: scanRowCount,
    scanColCount: scanColCount,
    rowSignals: buildRowSignals_Scaffold_(values),
    columnOccupancy: buildColumnOccupancy_Scaffold_(values, scanColCount)
  };
}

/**
 * Builds merge topology from geometry only.
 */
function buildMergeTopology_Scaffold_(sheet) {
  var dataRange = sheet.getDataRange();
  var mergedRanges = dataRange.getMergedRanges();
  var mergeCoordinates = mergedRanges.slice(0, 30).map(function(range) {
    return {
      rowStart: range.getRow(),
      rowEnd: range.getLastRow(),
      columnStart: range.getColumn(),
      columnEnd: range.getLastColumn()
    };
  });
  var area = Math.max(1, sheet.getMaxRows() * sheet.getMaxColumns());

  return {
    mergeCount: mergedRanges.length,
    mergeDensity: roundPercent_Scaffold_((mergedRanges.length / area) * 100),
    mergeCoordinates: mergeCoordinates
  };
}

/**
 * Builds a header topology summary from dense upper rows.
 */
function buildHeaderTopology_Scaffold_(topologySample) {
  var headerRows = [];

  topologySample.rowSignals.forEach(function(signal) {
    if (signal.rowIndex <= 8 && signal.nonEmptyCount >= 3) {
      headerRows.push(signal.rowIndex);
    }
  });

  return {
    headerDepth: headerRows.length,
    candidateHeaderRows: headerRows.slice(0, 6),
    upperBandDensity: roundPercent_Scaffold_(
      calculateUpperBandDensity_Scaffold_(topologySample.rowSignals)
    )
  };
}

/**
 * Summarizes structural topology so downstream diffing can ignore raw content.
 */
function buildStructuralTopology_Scaffold_(rowCount, colCount, topologySample, mergeTopology) {
  return {
    sizeBand: classifySizeBand_Scaffold_(rowCount, colCount),
    rowPattern: topologySample.rowSignals.map(function(signal) {
      return signal.nonEmptyCount === 0 ? "0" : "1";
    }).join(""),
    columnPattern: topologySample.columnOccupancy.join(""),
    mergeBand: classifyMergeBand_Scaffold_(mergeTopology.mergeCount),
    upperRegionActivity: classifyUpperRegionActivity_Scaffold_(topologySample.rowSignals)
  };
}

/**
 * Detects taxonomy zones from bounded structural signals.
 */
function detectTaxonomyZones_Scaffold_(topologySample, mergeTopology) {
  var zones = [];

  mergeTopology.mergeCoordinates.forEach(function(coordinate) {
    if (coordinate.rowStart <= 4 && coordinate.columnEnd - coordinate.columnStart >= 2) {
      zones.push(buildZone_Scaffold_(
        "merged-title-block",
        coordinate.rowStart,
        coordinate.rowEnd,
        coordinate.columnStart,
        coordinate.columnEnd,
        "high"
      ));
    }
  });

  topologySample.rowSignals.forEach(function(signal) {
    if (signal.hasInstitutionalMarker) {
      zones.push(buildZone_Scaffold_(
        "institutional-block",
        signal.rowIndex,
        signal.rowIndex,
        1,
        topologySample.scanColCount,
        "medium"
      ));
    }

    if (signal.hasCuadroMarker) {
      zones.push(buildZone_Scaffold_(
        "cuadro-zone",
        signal.rowIndex,
        signal.rowIndex,
        1,
        topologySample.scanColCount,
        "medium"
      ));
    }

    if (signal.nonEmptyCount >= 4 && signal.rowIndex >= 3) {
      zones.push(buildZone_Scaffold_(
        "possible-data-table-start",
        signal.rowIndex,
        signal.rowIndex,
        1,
        topologySample.scanColCount,
        signal.hasCuadroMarker ? "high" : "low"
      ));
    }
  });

  return dedupeZones_Scaffold_(zones);
}

/**
 * Classifies the overall layout family using structural topology only.
 */
function classifyLayoutFamily_Scaffold_(sheetFingerprints) {
  var mergedTitleCount = 0;
  var repeatedCuadroCount = 0;

  sheetFingerprints.forEach(function(sheetFingerprint) {
    sheetFingerprint.detectedZones.forEach(function(zone) {
      if (zone.zoneType === "merged-title-block") {
        mergedTitleCount += 1;
      }
      if (zone.zoneType === "cuadro-zone") {
        repeatedCuadroCount += 1;
      }
    });
  });

  if (mergedTitleCount >= 2 && repeatedCuadroCount >= 2) {
    return "institutional-multi-cuadro";
  }

  if (mergedTitleCount >= 1) {
    return "institutional-header-led";
  }

  return "generic-semi-structured";
}

/**
 * Produces low-risk hints about likely modality or level using only bounded
 * structural labels and upper-band markers.
 */
function inferModalityLevelHints_Scaffold_(sheetFingerprints) {
  var hints = [];

  sheetFingerprints.forEach(function(sheetFingerprint) {
    if (sheetFingerprint.headerTopology.headerDepth >= 3) {
      hints.push("multi-row-administrative-header");
    }
    if (sheetFingerprint.detectedZones.some(hasCuadroZone_Scaffold_)) {
      hints.push("cuadro-driven-layout");
    }
    if (sheetFingerprint.mergeDensity > 0.05) {
      hints.push("merge-heavy-presentation");
    }
  });

  return uniqueStrings_Scaffold_(hints);
}

/**
 * Generates a stable fingerprint id from structural-only components.
 */
function buildFingerprintId_Scaffold_(fingerprint) {
  var basis = fingerprint.sheetFingerprints.map(function(sheetFingerprint) {
    return sheetFingerprint.sheetName +
      "|" + sheetFingerprint.topologyHash +
      "|" + sheetFingerprint.headerTopology.headerDepth;
  }).join("::");

  return simpleHash_Scaffold_(basis);
}

/**
 * Computes a structure-only compatibility percentage between two fingerprints.
 */
function calculateCompatibilityScore_Scaffold_(previousFingerprint, currentFingerprint) {
  if (!previousFingerprint || !currentFingerprint) {
    return 0;
  }

  var previousSheets = previousFingerprint.sheetFingerprints || [];
  var currentSheets = currentFingerprint.sheetFingerprints || [];
  var comparableCount = Math.min(previousSheets.length, currentSheets.length);

  if (comparableCount === 0) {
    return 0;
  }

  var score = 0;
  for (var index = 0; index < comparableCount; index += 1) {
    if (previousSheets[index].topologyHash === currentSheets[index].topologyHash) {
      score += 100;
      continue;
    }

    score += calculateSheetCompatibility_Scaffold_(
      previousSheets[index],
      currentSheets[index]
    );
  }

  return roundPercent_Scaffold_(score / comparableCount);
}

/**
 * Produces a drift severity label for governance review.
 */
function classifyDriftSeverity_Scaffold_(previousFingerprint, currentFingerprint) {
  var compatibility = calculateCompatibilityScore_Scaffold_(
    previousFingerprint,
    currentFingerprint
  );

  if (compatibility >= 85) {
    return "LOW";
  }
  if (compatibility >= 65) {
    return "MEDIUM";
  }
  if (compatibility >= 40) {
    return "HIGH";
  }
  return "CRITICAL";
}

/**
 * Summarizes sheet-level structural changes for version comparison.
 */
function compareSheetFingerprints_Scaffold_(previousFingerprint, currentFingerprint) {
  var previousSheets = previousFingerprint && previousFingerprint.sheetFingerprints
    ? previousFingerprint.sheetFingerprints
    : [];
  var currentSheets = currentFingerprint && currentFingerprint.sheetFingerprints
    ? currentFingerprint.sheetFingerprints
    : [];
  var changedSheets = [];
  var comparableCount = Math.min(previousSheets.length, currentSheets.length);

  for (var index = 0; index < comparableCount; index += 1) {
    var previousSheet = previousSheets[index];
    var currentSheet = currentSheets[index];
    if (previousSheet.topologyHash !== currentSheet.topologyHash) {
      changedSheets.push({
        sheetName: currentSheet.sheetName,
        previousTopologyHash: previousSheet.topologyHash,
        currentTopologyHash: currentSheet.topologyHash,
        compatibilityScore: calculateSheetCompatibility_Scaffold_(
          previousSheet,
          currentSheet
        )
      });
    }
  }

  return changedSheets;
}

function calculateSheetCompatibility_Scaffold_(previousSheet, currentSheet) {
  var score = 0;

  if (previousSheet.rowCount === currentSheet.rowCount) {
    score += 25;
  }
  if (previousSheet.colCount === currentSheet.colCount) {
    score += 25;
  }
  if (previousSheet.headerTopology.headerDepth === currentSheet.headerTopology.headerDepth) {
    score += 25;
  }
  if (previousSheet.structuralTopology.mergeBand === currentSheet.structuralTopology.mergeBand) {
    score += 25;
  }

  return score;
}

function buildColumnOccupancy_Scaffold_(values, scanColCount) {
  var occupancy = [];

  for (var columnIndex = 0; columnIndex < scanColCount; columnIndex += 1) {
    occupancy.push("0");
  }

  values.forEach(function(rowValues) {
    for (var columnIndex = 0; columnIndex < scanColCount; columnIndex += 1) {
      if (String(rowValues[columnIndex] || "").trim() !== "") {
        occupancy[columnIndex] = "1";
      }
    }
  });

  return occupancy;
}

function buildRowSignals_Scaffold_(values) {
  var signals = [];

  values.forEach(function(rowValues, rowOffset) {
    var normalized = rowValues.map(normalizeCellToken_Scaffold_);
    signals.push({
      rowIndex: rowOffset + 1,
      nonEmptyCount: countNonEmptyCells_Scaffold_(normalized),
      hasInstitutionalMarker: containsAnyToken_Scaffold_(
        normalized,
        ["escuela", "institucion", "establecimiento", "servicio", "jurisdiccion"]
      ),
      hasCuadroMarker: containsAnyToken_Scaffold_(
        normalized,
        ["cuadro", "tabla", "planilla", "resumen"]
      )
    });
  });

  return signals;
}

function normalizeCellToken_Scaffold_(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function containsAnyToken_Scaffold_(values, tokens) {
  return values.some(function(value) {
    return tokens.some(function(token) {
      return value.indexOf(token) !== -1;
    });
  });
}

function calculateUpperBandDensity_Scaffold_(rowSignals) {
  var upperSignals = rowSignals.slice(0, 6);
  if (upperSignals.length === 0) {
    return 0;
  }

  var activeRows = 0;
  upperSignals.forEach(function(signal) {
    if (signal.nonEmptyCount > 0) {
      activeRows += 1;
    }
  });

  return (activeRows / upperSignals.length) * 100;
}

function classifySizeBand_Scaffold_(rowCount, colCount) {
  if (rowCount <= 50 && colCount <= 12) {
    return "compact";
  }
  if (rowCount <= 150 && colCount <= 24) {
    return "standard";
  }
  return "expanded";
}

function classifyMergeBand_Scaffold_(mergeCount) {
  if (mergeCount === 0) {
    return "none";
  }
  if (mergeCount <= 5) {
    return "light";
  }
  if (mergeCount <= 15) {
    return "moderate";
  }
  return "heavy";
}

function classifyUpperRegionActivity_Scaffold_(rowSignals) {
  var denseRows = 0;

  rowSignals.slice(0, 8).forEach(function(signal) {
    if (signal.nonEmptyCount >= 3) {
      denseRows += 1;
    }
  });

  if (denseRows >= 5) {
    return "dense";
  }
  if (denseRows >= 2) {
    return "mixed";
  }
  return "light";
}

function buildTopologyHash_Scaffold_(rowCount, colCount, mergeTopology, headerTopology, detectedZones) {
  var basis = [
    rowCount,
    colCount,
    mergeTopology.mergeCount,
    headerTopology.headerDepth,
    detectedZones.map(function(zone) {
      return zone.zoneType + "@" + zone.rowStart + "-" + zone.rowEnd;
    }).join("|")
  ].join("::");

  return simpleHash_Scaffold_(basis);
}

function buildZone_Scaffold_(zoneType, rowStart, rowEnd, columnStart, columnEnd, confidence) {
  return {
    zoneType: zoneType,
    rowStart: rowStart,
    rowEnd: rowEnd,
    columnStart: columnStart,
    columnEnd: columnEnd,
    confidence: confidence
  };
}

function dedupeZones_Scaffold_(zones) {
  var seen = {};
  return zones.filter(function(zone) {
    var key = [
      zone.zoneType,
      zone.rowStart,
      zone.rowEnd,
      zone.columnStart,
      zone.columnEnd
    ].join(":");

    if (seen[key]) {
      return false;
    }

    seen[key] = true;
    return true;
  });
}

function uniqueStrings_Scaffold_(values) {
  var seen = {};
  return values.filter(function(value) {
    if (seen[value]) {
      return false;
    }
    seen[value] = true;
    return true;
  });
}

function hasCuadroZone_Scaffold_(zone) {
  return zone.zoneType === "cuadro-zone";
}

function countNonEmptyCells_Scaffold_(rowValues) {
  var count = 0;
  rowValues.forEach(function(value) {
    if (value !== "") {
      count += 1;
    }
  });
  return count;
}

function roundPercent_Scaffold_(value) {
  return Math.round(value * 100) / 100;
}

function simpleHash_Scaffold_(input) {
  var hash = 0;
  for (var index = 0; index < input.length; index += 1) {
    hash = ((hash << 5) - hash) + input.charCodeAt(index);
    hash |= 0;
  }
  return "fp-" + Math.abs(hash);
}
