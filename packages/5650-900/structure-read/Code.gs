// Governed Structure-Only Spreadsheet Read Scaffold
// Governed by SAD-MORON-FRAMEWORK
// No real Sheet IDs, credentials, or sensitive data
// No writes, triggers, or data extraction beyond headers

/**
 * Reads spreadsheet structure: sheet names, row/column counts, and first-row headers only.
 * Constraints:
 *   - Use SHEET_ID_PLACEHOLDER
 *   - No getValues() beyond header row
 *   - No writes or triggers
 *   - No personal data
 */
function getSpreadsheetStructure_Scaffold() {
  var ss = SpreadsheetApp.openById("SHEET_ID_PLACEHOLDER");
  var sheets = ss.getSheets();
  var structure = sheets.map(function(sheet) {
    var name = sheet.getName();
    var rowCount = sheet.getMaxRows();
    var colCount = sheet.getMaxColumns();
    // Only read header row (first row)
    var header = sheet.getRange(1, 1, 1, colCount).getValues()[0];
    return {
      sheetName: name,
      rowCount: rowCount,
      colCount: colCount,
      header: header
    };
  });
  return structure;
}
