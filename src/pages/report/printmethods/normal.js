// import Excel from 'exceljs/modern.browser'
/* eslint-disable-next-line */
import Excel from 'exceljs/dist/es5/exceljs.browser'
import FileSaver from "file-saver";

export default function toXlsx(
  title,
  dataList,
  header,
  columns,
  wrap,
  height,
  marge
) {
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
    worksheet.getRow(2).values = header;
    worksheet.getRow(2).font = { family: 4, size: 14, bold: true };
    worksheet.getRow(2).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    columns.forEach(item => {
      item.style = {
        font: {
          name: "Arial Black",
          alignment: { vertical: "middle", horizontal: "center" }
        }
      };
    });
    worksheet.columns = columns;
    // 数据列表
    worksheet.addRows(dataList);
    // 处理行高
    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
      if (rowNumber > 2) {
        row.height = height;
        row.alignment = { vertical: "middle", horizontal: "center" };
      }
    });
    // 备注列
    if (wrap && wrap instanceof String) {
      var nameCol = worksheet.getColumn(wrap);
      nameCol.alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true
      };
    } else if (wrap && wrap instanceof Array) {
      for (let k = 0; k < wrap.length; k++) {
        worksheet.getColumn(wrap[k]).alignment = {
          vertical: "middle",
          horizontal: "left",
          wrapText: true
        };
      }
    } else {
      console.log("啥类型呢");
    }

    // 标题
    worksheet.getRow(1).values = [title];
    worksheet.getRow(1).height = 22.5;
    worksheet.getRow(1).font = { family: 4, size: 18, bold: true };
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    // 并单元格
    worksheet.mergeCells(marge);
  });
  workbook.xlsx
    .writeBuffer()
    .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${title}.xlsx`))
    .catch(err => console.log("Error writing excel export", err));
}
