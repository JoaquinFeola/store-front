


import excelJs from 'exceljs';
import { saveAs } from 'file-saver';

// export const excel = {
//     exportAsExcelWithJsonData: async <T extends Object>(jsonData: T[], filename: string) => {
//         const workbook = excelXlsx.utils.book_new();
//         const worksheet = excelXlsx.utils.json_to_sheet(jsonData);
//         excelXlsx.utils.book_append_sheet(workbook, worksheet);

//         const sheet = workbook.
//         await excelXlsx.writeFile(workbook, `${filename}.xlsx`);

//     },
//     readExcel: async<T>(data?: T) => {
//         const workbook =  excelXlsx.read(data, { type: 'array' });

//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = excelXlsx.utils.sheet_to_json(worksheet);

//         return jsonData
//     }
// }

const worksheetToJson = <T extends Object,>(worksheet: excelJs.Worksheet) => {
    const json: T[] = [];
    let headers: string[] = [];



    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) {
            headers = row.values as string[];
        }
        else {
            const newJsonValue = {} as T;
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const header = headers[colNumber];
                newJsonValue[header] = cell.value
            })
            json.push(newJsonValue)
        }

    });

    
    return json

}


export const excel = {
    exportAsExcelWithJsonData: async <T extends Object>(jsonData: T[], filename: string) => {
        try {
            const workbook = new excelJs.Workbook();
            const worksheet = workbook.addWorksheet('Hoja 1');


            const columns = Object.keys(jsonData[0] || {}).map(key => ({
                header: key,
                key: key,
                width: 10
            }));
            worksheet.columns = columns;
            worksheet.addRows(jsonData);

            const maxColumnWidths = columns.map((column) => {
                const columnData = jsonData.map(row => row[column.key]);
                const maxLength = columnData.reduce((max, cell) => {
                    const cellLength = String(cell).length;
                    return Math.max(max, cellLength);
                }, column.header.length);

                return maxLength + 2;
            });

            // Aplicar el ancho calculado a cada columna
            maxColumnWidths.forEach((width, index) => {
                worksheet.getColumn(index + 1).width = width;
            });
            const buffer = await workbook.xlsx.writeBuffer();
            const blobFile = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            await saveAs(blobFile, `${filename}.xlsx`)
        }
        catch (error) {

        }

    },
    readExcel: async<T extends Uint8Array>(file: T,) => {

        const workbook = new excelJs.Workbook();
        await workbook.xlsx.load(file);

        // Obtener el nombre de la primera hoja
        const worksheet = workbook.worksheets[0]; // Obtener la primera hoja de cálculo

        // Convertir la hoja a JSON
        const jsonData = worksheetToJson(worksheet);

        return jsonData;
    }
}