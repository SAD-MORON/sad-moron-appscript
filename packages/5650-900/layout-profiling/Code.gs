// Governed Layout Profiling Scaffold for Irregular Google Sheets
// Governed by SAD-MORON-FRAMEWORK
// No real Sheet IDs, credentials, or sensitive persistence
// No writes, triggers, exports, or extraction pipelines

/**
 * Profiles spreadsheet layout without performing semantic extraction.
 *
 * Allowed scope:
 *   - Sheet metadata and dimensions
 *   - Hidden sheet detection
 *   - Frozen rows/columns
 *   - Merged range counts
 *   - Sparse occupancy inference
 *   - Possible header row detection
 *   - Structural block estimation
 *
 * Constraints:
 *   - Use SHEET_ID_PLACEHOLDER only
 *   - Never persist or log sampled cell content
 *   - Never read full rows or bulk worksheet bodies
 *   - Never write, trigger, export, or deploy
 */
function profileSpreadsheetLayout_Scaffold() {
  var ss = SpreadsheetApp.openById("SHEET_ID_PLACEHOLDER");
  var sheets = ss.getSheets();

  return {
    spreadsheetName: ss.getName(),
    sheetCount: sheets.length,
    sheetProfiles: sheets.map(profileSheetLayout_Scaffold_)
  };
}

/**
 * Builds a bounded structural profile for a single sheet.
 */
function profileSheetLayout_Scaffold_(sheet) {
  var rowCount = sheet.getMaxRows();
  var colCount = sheet.getMaxColumns();
  var occupancy = inferSparseOccupancy_Scaffold_(sheet, rowCount, colCount);

  return {
    sheetName: sheet.getName(),
    isHidden: sheet.isSheetHidden(),
    tabColor: getTabColor_Scaffold_(sheet),
    rowCount: rowCount,
    colCount: colCount,
    frozenRows: sheet.getFrozenRows(),
    frozenColumns: sheet.getFrozenColumns(),
    mergedRangeCount: getMergedRangeCount_Scaffold_(sheet),
    occupiedRowEstimate: occupancy.occupiedRowEstimate,
    emptyRowEstimate: occupancy.emptyRowEstimate,
    occupiedColumnEstimate: occupancy.occupiedColumnEstimate,
    emptyColumnEstimate: occupancy.emptyColumnEstimate,
    possibleHeaderRows: detectPossibleHeaderRows_Scaffold_(sheet, colCount),
    inferredStructureZones: estimateStructureZones_Scaffold_(occupancy)
  };
}

/**
 * Performs bounded sparse sampling for occupancy inference only.
 * Sampled values are converted to booleans immediately and never returned.
 */
function inferSparseOccupancy_Scaffold_(sheet, rowCount, colCount) {
  var sampledRows = buildSampleIndexes_Scaffold_(rowCount, 12);
  var sampledColumns = buildSampleIndexes_Scaffold_(colCount, 8);
  var occupiedRows = 0;
  var occupiedColumns = 0;

  sampledRows.forEach(function(rowIndex) {
    if (rowLooksOccupied_Scaffold_(sheet, rowIndex, sampledColumns)) {
      occupiedRows += 1;
    }
  });

  sampledColumns.forEach(function(colIndex) {
    if (columnLooksOccupied_Scaffold_(sheet, sampledRows, colIndex)) {
      occupiedColumns += 1;
    }
  });

  return {
    sampledRowIndexes: sampledRows,
    sampledColumnIndexes: sampledColumns,
    occupiedRowEstimate: occupiedRows,
    emptyRowEstimate: sampledRows.length - occupiedRows,
    occupiedColumnEstimate: occupiedColumns,
    emptyColumnEstimate: sampledColumns.length - occupiedColumns
  };
}

/**
 * Samples one row across sparse columns to infer whether the row is mostly empty.
 */
function rowLooksOccupied_Scaffold_(sheet, rowIndex, sampledColumns) {
  return sampledColumns.some(function(colIndex) {
    return cellHasDisplayContent_Scaffold_(sheet, rowIndex, colIndex);
  });
}

/**
 * Samples one column across sparse rows to infer whether the column is mostly empty.
 */
function columnLooksOccupied_Scaffold_(sheet, sampledRows, colIndex) {
  return sampledRows.some(function(rowIndex) {
    return cellHasDisplayContent_Scaffold_(sheet, rowIndex, colIndex);
  });
}

/**
 * Allowed bounded sampling helper.
 * Reads one cell at a time for structure inference and does not persist content.
 */
function cellHasDisplayContent_Scaffold_(sheet, rowIndex, colIndex) {
  var value = sheet.getRange(rowIndex, colIndex, 1, 1).getDisplayValues()[0][0];
  return value !== "";
}

/**
 * Detects candidate header rows using only a small bounded prefix of the sheet.
 * Returned output is structural metadata about row positions, not cell contents.
 */
function detectPossibleHeaderRows_Scaffold_(sheet, colCount) {
  var scanRowCount = Math.min(5, sheet.getMaxRows());
  var scanColCount = Math.min(colCount, 12);
  var candidates = [];

  if (scanRowCount === 0 || scanColCount === 0) {
    return candidates;
  }

  var sample = sheet.getRange(1, 1, scanRowCount, scanColCount).getValues();
  for (var rowOffset = 0; rowOffset < sample.length; rowOffset += 1) {
    var nonEmptyCount = countNonEmptyCells_Scaffold_(sample[rowOffset]);
    if (nonEmptyCount > 0 && nonEmptyCount >= Math.ceil(scanColCount / 3)) {
      candidates.push(rowOffset + 1);
    }
  }

  return candidates;
}

/**
 * Estimates broad structural zones from sparse occupancy rather than content.
 */
function estimateStructureZones_Scaffold_(occupancy) {
  var zones = [];

  if (occupancy.occupiedRowEstimate === 0) {
    zones.push("mostly-empty");
  } else if (occupancy.occupiedRowEstimate <= 2) {
    zones.push("light-structure");
  } else {
    zones.push("multi-row-structure");
  }

  if (occupancy.occupiedColumnEstimate <= 2) {
    zones.push("narrow-activity");
  } else {
    zones.push("wide-activity");
  }

  return zones;
}

/**
 * Counts merged ranges as a structural signal without reading their contents.
 */
function getMergedRangeCount_Scaffold_(sheet) {
  return sheet.getDataRange().getMergedRanges().length;
}

/**
 * Returns tab color when available, otherwise null.
 */
function getTabColor_Scaffold_(sheet) {
  if (typeof sheet.getTabColor === "function") {
    return sheet.getTabColor();
  }
  return null;
}

/**
 * Builds evenly spaced 1-based indexes for sparse sampling.
 */
function buildSampleIndexes_Scaffold_(size, maxSamples) {
  if (size <= 0 || maxSamples <= 0) {
    return [];
  }

  if (size <= maxSamples) {
    return buildSequentialIndexes_Scaffold_(size);
  }

  var step = Math.max(1, Math.floor(size / maxSamples));
  var indexes = [];
  for (var index = 1; index <= size && indexes.length < maxSamples; index += step) {
    indexes.push(index);
  }

  if (indexes[indexes.length - 1] !== size && indexes.length < maxSamples) {
    indexes.push(size);
  }

  return indexes;
}

function buildSequentialIndexes_Scaffold_(size) {
  var indexes = [];
  for (var index = 1; index <= size; index += 1) {
    indexes.push(index);
  }
  return indexes;
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
