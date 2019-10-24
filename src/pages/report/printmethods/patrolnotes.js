// import Excel from 'exceljs/modern.browser'
/* eslint-disable-next-line */
import Excel from 'exceljs/dist/es5/exceljs.browser'
import FileSaver from "file-saver";
const header = ["室温", "湿度", "记录时间", "值班记录", "记录人员", "机构"];
const header2 = ["巡查异常项目", "项目描述", "是否良好", "故障描述", "备注"];
const columns = [
  { key: "roomtemp", width: 15 },
  { key: "roomhum", width: 15 },
  { key: "redate", width: 30 },
  { key: "remark", width: 60 },
  { key: "username", width: 20 },
  { key: "orgname", width: 20 }
];
const columns2 = [
  { key: "patrolitemid", width: 15 },
  { key: "rpdesc", width: 60 },
  { key: "patrolstate", width: 20 },
  { key: "faultdesc", width: 45 },
  { key: "remark", width: 20 }
];

export default function toXlsx(title, dataList) {
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
  const sheetDataList = [];
  dataList.forEach(i => {
    // 添加工作表
    workbook.addWorksheet(i.redate.replace(/:*/g, ""));
    sheetDataList.push({
      id: i.redate.replace(/:*/g, ""),
      info: i
    });
  });
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
    worksheet.columns = columns;
    // 数据列表
    worksheet.addRows([
      sheetDataList.filter(item => item.id === worksheet.name)[0].info
    ]);

    worksheet.getRow(4).values = header2;
    worksheet.getRow(4).font = { family: 4, size: 14, bold: true };
    worksheet.getRow(4).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    worksheet.columns = columns2;
    worksheet.addRows(
      sheetDataList.filter(item => item.id === worksheet.name)[0].info
        .patrolitems
    );
    // 处理行高
    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
      if (rowNumber > 2) {
        row.height = 30;
        row.alignment = { vertical: "middle", horizontal: "center" };
      }
    });

    // 标题
    worksheet.getRow(1).values = [title];
    worksheet.getRow(1).height = 22.5;
    worksheet.getRow(1).font = { family: 4, size: 18, bold: true };
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    // 并单元格
    worksheet.mergeCells("A1:F1");
  });
  workbook.xlsx
    .writeBuffer()
    .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${title}.xlsx`))
    .catch(err => console.log("Error writing excel export", err));
}
