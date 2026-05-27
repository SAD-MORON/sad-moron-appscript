// Governed Semantic Field Inference Scaffold
// Governed by SAD-MORON-FRAMEWORK
// No real Sheet IDs, credentials, or sensitive persistence
// No writes, triggers, exports, or extraction engine behavior

/**
 * Builds a bounded semantic field inference profile for the active spreadsheet.
 *
 * Semantic field inference:
 *   - Uses a small, governed structural context to infer likely field roles.
 *
 * Structural evidence:
 *   - Limits output to field categories, coordinates, confidence, and bounded
 *     evidence summaries rather than copied content.
 *
 * Governance:
 *   - This is documentation plus scaffold only.
 *   - It must not become a row extraction pipeline.
 *
 * Constraints:
 *   - Use SpreadsheetApp.getActiveSpreadsheet()
 *   - Never log or return sampled cell values
 *   - Never read full tables or worksheet bodies
 *   - Never write, trigger, export, or deploy
 */
function inferSemanticFields_Scaffold() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var inferenceProfile = {
    spreadsheetName: ss.getName(),
    sheetCount: sheets.length,
    sheetInferences: sheets.map(inferSemanticFieldsForSheet_Scaffold_)
  };

  Logger.log(JSON.stringify(inferenceProfile, null, 2));
  return inferenceProfile;
}

/**
 * Creates a bounded field-inference summary for a single sheet.
 */
function inferSemanticFieldsForSheet_Scaffold_(sheet) {
  var rowCount = sheet.getMaxRows();
  var colCount = sheet.getMaxColumns();
  var context = sampleFieldInferenceContext_Scaffold_(sheet, rowCount, colCount);

  return {
    sheetName: sheet.getName(),
    rowCount: rowCount,
    colCount: colCount,
    candidateHeaderRows: detectCandidateHeaderRows_Scaffold_(context),
    inferredFieldCategories: inferFieldCategories_Scaffold_(context),
    ambiguityClassification: classifyInferenceAmbiguity_Scaffold_(context)
  };
}

/**
 * Samples a bounded top-left region for controlled inference only.
 * Sampled text is normalized transiently and never returned verbatim.
 */
function sampleFieldInferenceContext_Scaffold_(sheet, rowCount, colCount) {
  var scanRowCount = Math.min(rowCount, 8);
  var scanColCount = Math.min(colCount, 12);
  var values = [];

  if (scanRowCount > 0 && scanColCount > 0) {
    values = sheet.getRange(1, 1, scanRowCount, scanColCount).getDisplayValues();
  }

  return {
    scanRowCount: scanRowCount,
    scanColCount: scanColCount,
    rowSignals: buildInferenceRowSignals_Scaffold_(values)
  };
}

/**
 * Detects likely header rows from dense upper-band structural patterns.
 */
function detectCandidateHeaderRows_Scaffold_(context) {
  var candidates = [];

  context.rowSignals.forEach(function(signal) {
    if (signal.nonEmptyCount >= Math.max(2, Math.ceil(context.scanColCount / 3))) {
      candidates.push(signal.rowIndex);
    }
  });

  return candidates.slice(0, 4);
}

/**
 * Infers likely field categories from transient normalized header-like tokens.
 * Returned data is categorical only and never includes copied labels.
 */
function inferFieldCategories_Scaffold_(context) {
  var categories = [];

  context.rowSignals.forEach(function(signal) {
    signal.columnSignals.forEach(function(columnSignal) {
      if (columnSignal.fieldCategory) {
        categories.push({
          rowIndex: signal.rowIndex,
          columnIndex: columnSignal.columnIndex,
          fieldCategory: columnSignal.fieldCategory,
          confidence: columnSignal.confidence,
          structuralEvidence: columnSignal.structuralEvidence
        });
      }
    });
  });

  return dedupeFieldCategories_Scaffold_(categories);
}

/**
 * Reduces sampled rows into bounded structural signals for field inference.
 */
function buildInferenceRowSignals_Scaffold_(values) {
  var rowSignals = [];

  values.forEach(function(rowValues, rowOffset) {
    var normalized = rowValues.map(normalizeCellToken_Scaffold_);

    rowSignals.push({
      rowIndex: rowOffset + 1,
      nonEmptyCount: countNonEmptyCells_Scaffold_(normalized),
      columnSignals: buildColumnInferenceSignals_Scaffold_(normalized)
    });
  });

  return rowSignals;
}

/**
 * Maps transient normalized tokens to governed field categories.
 */
function buildColumnInferenceSignals_Scaffold_(normalizedValues) {
  var signals = [];

  normalizedValues.forEach(function(value, columnOffset) {
    signals.push({
      columnIndex: columnOffset + 1,
      fieldCategory: classifyFieldCategory_Scaffold_(value),
      confidence: classifyFieldConfidence_Scaffold_(value),
      structuralEvidence: classifyStructuralEvidence_Scaffold_(value)
    });
  });

  return signals;
}

function classifyFieldCategory_Scaffold_(value) {
  if (value === "") {
    return null;
  }
  if (containsAnyToken_Scaffold_(value, ["fecha", "periodo", "mes", "anio"])) {
    return "date-or-period-field";
  }
  if (containsAnyToken_Scaffold_(value, ["cargo", "materia", "espacio", "asignatura"])) {
    return "role-or-subject-field";
  }
  if (containsAnyToken_Scaffold_(value, ["horas", "cantidad", "total", "carga"])) {
    return "quantity-or-metric-field";
  }
  if (containsAnyToken_Scaffold_(value, ["observacion", "nota", "comentario"])) {
    return "observation-field";
  }
  if (containsAnyToken_Scaffold_(value, ["codigo", "id", "identificador"])) {
    return "possible-identifier-field";
  }
  if (containsAnyToken_Scaffold_(value, ["curso", "turno", "division", "nivel", "modalidad"])) {
    return "administrative-descriptor-field";
  }
  return "unclassified-structural-field";
}

function classifyFieldConfidence_Scaffold_(value) {
  if (value === "") {
    return null;
  }
  if (value.length <= 4) {
    return "low";
  }
  if (value.split(" ").length >= 2) {
    return "high";
  }
  return "medium";
}

function classifyStructuralEvidence_Scaffold_(value) {
  if (value === "") {
    return null;
  }
  if (value.indexOf("/") !== -1 || value.indexOf("-") !== -1) {
    return "compound-label-pattern";
  }
  if (value.split(" ").length >= 3) {
    return "multi-token-label-pattern";
  }
  return "simple-label-pattern";
}

function classifyInferenceAmbiguity_Scaffold_(context) {
  var classifiedCount = 0;
  var unclassifiedCount = 0;

  context.rowSignals.forEach(function(signal) {
    signal.columnSignals.forEach(function(columnSignal) {
      if (!columnSignal.fieldCategory) {
        return;
      }
      if (columnSignal.fieldCategory === "unclassified-structural-field") {
        unclassifiedCount += 1;
      } else {
        classifiedCount += 1;
      }
    });
  });

  if (classifiedCount === 0) {
    return "BLOCKED";
  }
  if (unclassifiedCount > classifiedCount) {
    return "REVIEW";
  }
  return "PASS";
}

function dedupeFieldCategories_Scaffold_(categories) {
  var seen = {};
  return categories.filter(function(category) {
    var key = [
      category.rowIndex,
      category.columnIndex,
      category.fieldCategory
    ].join(":");

    if (seen[key]) {
      return false;
    }

    seen[key] = true;
    return true;
  });
}

function normalizeCellToken_Scaffold_(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function containsAnyToken_Scaffold_(value, tokens) {
  return tokens.some(function(token) {
    return value.indexOf(token) !== -1;
  });
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
