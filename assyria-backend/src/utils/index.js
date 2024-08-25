import xl from 'excel4node'; // For write xlsx files
import xlsx from 'xlsx'; // For read xlsx files

const write = (wb, data, sheetName) => {
  const ws = wb.addWorksheet(sheetName);

  data.forEach((i, row) => {
    // Header
    if (row < 1)
      Object.keys(i).forEach((j, column) =>
        ws.cell(row + 1, column + 1).string(j)
      );

    // Records
    Object.values(i).forEach((k, column) =>
      ws.cell(row + 2, column + 1).string(String(k))
    );
  });
};

const read = (file) => {
  const wb = xlsx.readFile(file);
  const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
    header: 1, // Gera um array de arrays ("Matriz 2D")
    defval: '', // Usa o valor especificado no lugar de nulo ou indefinido
    blankrows: false, // Inclui linhas em branco na saída **
  });

  return data.slice(1);
};

export { read, write, xl };
