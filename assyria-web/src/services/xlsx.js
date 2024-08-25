import xl from 'excel4node'; // For write xlsx files
import xlsx from 'xlsx'; // For read xlsx files

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

/**
 * Writes data to a specific workbook spreadsheet.
 * @param {Object} wb Workbook sheet.
 * @param {Array} data Data array.
 * @param {String} sheetName Sheet name.
 */
const write = (wb, data, sheetName) => {
  const ws = wb.addWorksheet(sheetName);

  data.forEach((i, row) => {
    // Header
    if (row < 1) {
      Object.keys(i).forEach((j, column) =>
        ws.cell(row + 1, column + 1).string(j),
      );
    }

    // Records
    Object.values(i).forEach((k, column) =>
      ws.cell(row + 2, column + 1).string(String(k)),
    );
  });
};

/**
 * Convert binary xlsx file to json data.
 * @param {Object} file Binary file.
 * @param {Number} sheet Sheet index.
 */
const read = (wb, sheet) => {
  const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[sheet]], {
    header: 1, // Generates an array of arrays ("2D Matrix")
    defval: '', // Use the specified value in place of null or undefined
    blankrows: false, // Includes blank lines in the output **
  });

  return data;
};

/**
 * Download file.
 * @param {*} data Binary data.
 * @param {String} fileName .xlsx file name.
 */
function download(data, fileName) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', `${fileName || 'data'}.xlsx`);
  document.body.appendChild(link);
  link.click();
}

export { read, write, download, sleep, xl };
