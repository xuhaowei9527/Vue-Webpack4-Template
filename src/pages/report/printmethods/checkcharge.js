// import Excel from 'exceljs/modern.browser'
/* eslint-disable-next-line */
import Excel from 'exceljs/dist/es5/exceljs.browser'
import FileSaver from "file-saver";

export default function toXlsx(title, dataList, header1, header2, columns) {
  // 创建工作簿
  var workbook = new Excel.Workbook();
  // 工作簿属性
  workbook.creator = "xuhaowei";
  workbook.lastModifiedBy = "xuhaowei";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();
  // 工作簿视图
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible"
    }
  ];
  // 添加工作表
  workbook.addWorksheet(title);
  // 遍历工作表
  workbook.eachSheet(function(worksheet, sheetId) {
    worksheet.state = "visible";
    // 表头
    worksheet.getRow(2).values = header1;
    worksheet.getRow(3).values = header2;
    // 合并单元格
    worksheet.mergeCells(2, 0, 3, 0);
    let index = 2;
    for (let i = 0; i < 3; i++) {
      worksheet.mergeCells(2, index, 3, index);
      index = index + 1;
    }
    let jndex = 5;
    for (let j = 0; j < 14; j++) {
      worksheet.mergeCells(2, jndex, 2, jndex + 1);
      jndex = jndex + 2;
    }
    // 赋值header
    worksheet.columns = columns;
    // 数据列表
    worksheet.addRows(dataList);

    // 标题
    worksheet.getRow(1).values = [title];
    worksheet.getRow(1).height = 22.5;
    worksheet.getRow(1).font = { family: 4, size: 18, bold: true };
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    worksheet.getRow(2).height = 22.5;
    worksheet.getRow(2).font = { family: 4, size: 14, bold: true };
    worksheet.getRow(2).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    worksheet.getRow(3).height = 22.5;
    worksheet.getRow(3).font = { family: 4, size: 12, bold: true };
    worksheet.getRow(3).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
      if (rowNumber > 3) {
        row.alignment = { vertical: "middle", horizontal: "center" };
      }
    });
    // 并单元格
    worksheet.mergeCells("A1:AF1");
  });
  workbook.xlsx
    .writeBuffer()
    .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${title}.xlsx`))
    .catch(err => console.log("Error writing excel export", err));
}
