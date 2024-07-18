


// import * as excelXlsx from 'xlsx';
// import * as excelXlsx from 'exceljs';
import * as exceljs from 'exceljs';

// export const excel = {
//     exportAsExcelWithJsonData: async <T>(jsonData: T[], filename: string) => {
//         const workbook = excelXlsx.utils.book_new();
//         const worksheet = excelXlsx.utils.json_to_sheet(jsonData);
//         excelXlsx.utils.book_append_sheet(workbook, worksheet);
//         await excelXlsx.writeFile( workbook, `${filename}.xlsx`);

//     }
// }

export const excel = {
    exportAsExcelWithJsonData: async <T>(jsonData: T[], filename: string) => { },
    exportAsExcel: async<T>(json: T[], filename: string) => {
        const workbook = new exceljs.Workbook();
        workbook.created = new Date();
        const sheet = workbook.addWorksheet('sheet1', { properties: { tabColor: { argb: '#304' } } })
        

    }
}

