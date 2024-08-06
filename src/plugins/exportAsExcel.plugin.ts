


import * as excelXlsx from 'xlsx';

export const excel = {
    exportAsExcelWithJsonData: async <T>(jsonData: T[], filename: string) => {
        const workbook = excelXlsx.utils.book_new();
        const worksheet = excelXlsx.utils.json_to_sheet(jsonData);
        excelXlsx.utils.book_append_sheet(workbook, worksheet);
        await excelXlsx.writeFile(workbook, `${filename}.xlsx`);

    },
    readExcel: async<T>(data?: T) => {
        const workbook =  excelXlsx.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = excelXlsx.utils.sheet_to_json(worksheet);
        
        return jsonData
    }
}



