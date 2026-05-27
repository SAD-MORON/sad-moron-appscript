// Governed Semantic Layout Profiling Scaffold for Institutional Spreadsheets
// Governed by SAD-MORON-FRAMEWORK
// No real Sheet IDs, credentials, or sensitive persistence
// No writes, triggers, exports, or extraction pipelines

/**
 * Profiles institutional spreadsheet layout semantically without extracting
 * row-level records or personal data.
 *
 * Allowed scope:
 *   - Merge coordinates
 *   - Zone-type detection
 *   - Row/column bounds
 *   - Confidence levels
 *   - Possible data table starts
 *
 * Constraints:
 *   - Use SpreadsheetApp.getActiveSpreadsheet() for bound-sheet tests
 *   - Never log or return sampled cell values
 *   - Never read full tables or worksheet bodies
 *   - Never write, trigger, export, or deploy
 */
function profileInstitutionalSemanticLayout_Scaffold() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var profile = {
    spreadsheetName: ss.getName(),
    sheetCount: sheets.length,
    sheetProfiles: sheets.map(profileInstitutionalSheet_Scaffold_)
  };

  Logger.log(JSON.stringify(profile, null, 2));
  return profile;
}

/**
 * Builds a governed zone profile for a single institutional sheet.
 */
function profileInstitutionalSheet_Scaffold_(sheet) {
  var rowCount = sheet.getMaxRows();
  var colCount = sheet.getMaxColumns();
  var semanticContext = sampleInstitutionalContext_Scaffold_(sheet, rowCount, colCount);
  var mergeZones = detectMergedTitleAndHeaderZones_Scaffold_(sheet);
  var semanticZones = detectSemanticZonesFromSample_Scaffold_(semanticContext);
  var repeatedBlocks = detectRepeatedAdministrativeBlocks_Scaffold_(semanticContext);
  var visualRegions = estimateVisualRegions_Scaffold_(semanticContext, rowCount, colCount);

  return {
    sheetName: sheet.getName(),
    rowCount: rowCount,
    colCount: colCount,
    isHidden: sheet.isSheetHidden(),
    frozenRows: sheet.getFrozenRows(),
    frozenColumns: sheet.getFrozenColumns(),
    mergeCoordinates: mergeZones.mergeCoordinates,
    detectedZones: mergeZones.zones
      .concat(semanticZones)
      .concat(repeatedBlocks)
      .concat(visualRegions),
    possibleDataTableStarts: detectPossibleDataTableStarts_Scaffold_(semanticContext),
    ambiguityClassification: classifyAmbiguity_Scaffold_(
      mergeZones.zones,
      semanticZones,
      repeatedBlocks
    )
  };
}

/**
 * Samples a bounded top-left institutional context for structural inference only.
 * Sampled text is used transiently and never returned verbatim.
 */
function sampleInstitutionalContext_Scaffold_(sheet, rowCount, colCount) {
  var scanRowCount = Math.min(rowCount, 18);
  var scanColCount = Math.min(colCount, 12);
  var values = [];

  if (scanRowCount > 0 && scanColCount > 0) {
    values = sheet.getRange(1, 1, scanRowCount, scanColCount).getDisplayValues();
  }

  return {
    scanRowCount: scanRowCount,
    scanColCount: scanColCount,
    rowSignals: buildRowSignals_Scaffold_(values, scanColCount)
  };
}

/**
 * Detects merged title and header blocks using merge geometry only.
 */
function detectMergedTitleAndHeaderZones_Scaffold_(sheet) {
  var mergedRanges = sheet.getDataRange().getMergedRanges();
  var mergeCoordinates = [];
  var zones = [];

  mergedRanges.slice(0, 20).forEach(function(range) {
    var coordinate = {
      rowStart: range.getRow(),
      rowEnd: range.getLastRow(),
      columnStart: range.getColumn(),
      columnEnd: range.getLastColumn()
    };
    mergeCoordinates.push(coordinate);

    if (coordinate.rowStart <= 4 && coordinate.columnEnd - coordinate.columnStart >= 2) {
      zones.push(buildZone_Scaffold_(
        "merged-title-block",
        coordinate.rowStart,
        coordinate.rowEnd,
        coordinate.columnStart,
        coordinate.columnEnd,
        "high"
      ));
    } else if (coordinate.rowStart <= 8) {
      zones.push(buildZone_Scaffold_(
        "institutional-header-zone",
        coordinate.rowStart,
        coordinate.rowEnd,
        coordinate.columnStart,
        coordinate.columnEnd,
        "medium"
      ));
    }
  });

  return {
    mergeCoordinates: mergeCoordinates,
    zones: dedupeZones_Scaffold_(zones)
  };
}

/**
 * Detects institutional semantic zones from bounded sampled rows.
 * Raw sampled values are normalized transiently and never returned.
 */
function detectSemanticZonesFromSample_Scaffold_(context) {
  var zones = [];

  context.rowSignals.forEach(function(signal) {
    if (signal.hasInstitutionalMarker) {
      zones.push(buildZone_Scaffold_(
        "institutional-header-zone",
        signal.rowIndex,
        signal.rowIndex,
        1,
        context.scanColCount,
        signal.nonEmptyCount >= 4 ? "high" : "medium"
      ));
    }

    if (signal.hasCuadroMarker) {
      zones.push(buildZone_Scaffold_(
        "cuadro-label-zone",
        signal.rowIndex,
        signal.rowIndex,
        1,
        context.scanColCount,
        "medium"
      ));
    }

    if (signal.hasObservationMarker) {
      zones.push(buildZone_Scaffold_(
        "observation-zone",
        signal.rowIndex,
        signal.rowIndex + 1,
        1,
        context.scanColCount,
        "medium"
      ));
    }
  });

  zones = zones.concat(detectMultiRowHeaders_Scaffold_(context));
  return dedupeZones_Scaffold_(zones);
}

/**
 * Estimates repeated administrative blocks from recurring bounded row signatures.
 */
function detectRepeatedAdministrativeBlocks_Scaffold_(context) {
  var signatureCounts = {};
  var blockZones = [];

  context.rowSignals.forEach(function(signal) {
    if (signal.nonEmptyCount === 0) {
      return;
    }

    var signature = signal.signature;
    signatureCounts[signature] = (signatureCounts[signature] || 0) + 1;

    if (signatureCounts[signature] === 2 && signal.hasAdministrativeMarker) {
      blockZones.push(buildZone_Scaffold_(
        "repeated-administrative-block",
        Math.max(1, signal.rowIndex - 1),
        signal.rowIndex,
        1,
        context.scanColCount,
        "medium"
      ));
    }
  });

  return blockZones;
}

/**
 * Detects likely multi-row headers from consecutive dense rows near the top.
 */
function detectMultiRowHeaders_Scaffold_(context) {
  var zones = [];

  for (var index = 0; index < context.rowSignals.length - 1; index += 1) {
    var current = context.rowSignals[index];
    var next = context.rowSignals[index + 1];

    if (current.rowIndex > 8) {
      break;
    }

    if (current.nonEmptyCount >= 3 && next.nonEmptyCount >= 3) {
      zones.push(buildZone_Scaffold_(
        "multi-row-header-zone",
        current.rowIndex,
        next.rowIndex,
        1,
        context.scanColCount,
        current.hasInstitutionalMarker || next.hasInstitutionalMarker ? "high" : "medium"
      ));
    }
  }

  return zones;
}

/**
 * Estimates broad visual layout regions from transitions between dense and empty rows.
 */
function estimateVisualRegions_Scaffold_(context, rowCount, colCount) {
  var zones = [];
  var currentStart = null;

  context.rowSignals.forEach(function(signal) {
    if (signal.nonEmptyCount > 0 && currentStart === null) {
      currentStart = signal.rowIndex;
    }

    if (signal.nonEmptyCount === 0 && currentStart !== null) {
      zones.push(buildZone_Scaffold_(
        "visual-layout-region",
        currentStart,
        signal.rowIndex - 1,
        1,
        Math.min(colCount, context.scanColCount),
        "low"
      ));
      currentStart = null;
    }
  });

  if (currentStart !== null) {
    zones.push(buildZone_Scaffold_(
      "visual-layout-region",
      currentStart,
      Math.min(context.scanRowCount, rowCount),
      1,
      Math.min(colCount, context.scanColCount),
      "low"
    ));
  }

  return zones;
}

/**
 * Detects possible table starts from dense rows below title/header patterns.
 */
function detectPossibleDataTableStarts_Scaffold_(context) {
  var starts = [];

  context.rowSignals.forEach(function(signal) {
    if (signal.rowIndex < 3) {
      return;
    }

    if (signal.nonEmptyCount >= Math.max(3, Math.ceil(context.scanColCount / 3))) {
      starts.push({
        rowStart: signal.rowIndex,
        confidence: signal.hasCuadroMarker ? "high" : "medium"
      });
    }
  });

  return starts.slice(0, 6);
}

/**
 * Reduces sampled rows to structural signals and transient markers.
 */
function buildRowSignals_Scaffold_(values, scanColCount) {
  var signals = [];

  values.forEach(function(rowValues, rowOffset) {
    var normalized = rowValues.map(normalizeCellToken_Scaffold_);
    var nonEmptyCount = countNonEmptyCells_Scaffold_(normalized);

    signals.push({
      rowIndex: rowOffset + 1,
      nonEmptyCount: nonEmptyCount,
      signature: buildRowSignature_Scaffold_(normalized),
      hasInstitutionalMarker: containsAnyToken_Scaffold_(
        normalized,
        ["escuela", "institucion", "establecimiento", "jurisdiccion", "servicio"]
      ),
      hasAdministrativeMarker: containsAnyToken_Scaffold_(
        normalized,
        ["anio", "turno", "seccion", "curso", "division", "modalidad"]
      ),
      hasCuadroMarker: containsAnyToken_Scaffold_(
        normalized,
        ["cuadro", "tabla", "planilla", "resumen"]
      ),
      hasObservationMarker: containsAnyToken_Scaffold_(
        normalized,
        ["observacion", "observaciones", "nota", "notas"]
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

function buildRowSignature_Scaffold_(values) {
  return values.map(function(value) {
    return value === "" ? "0" : "1";
  }).join("");
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

function classifyAmbiguity_Scaffold_(mergeZones, semanticZones, repeatedBlocks) {
  if (mergeZones.length === 0 && semanticZones.length === 0) {
    return "REVIEW";
  }

  if (repeatedBlocks.length > 2) {
    return "REVIEW";
  }

  return "PASS";
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
