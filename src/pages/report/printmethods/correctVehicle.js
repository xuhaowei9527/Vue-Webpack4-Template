// import Excel from 'exceljs/modern.browser'
/* eslint-disable-next-line */
import {columns} from './constant/index'
import Excel from "exceljs/dist/es5/exceljs.browser";
import FileSaver from "file-saver";
const header = ["年", "月", "日", "单位", "辆次", "金额"];
const header1 = [
  "年",
  "月",
  "日",
  "单位",
  "辆次",
  "金额",
  "合计",
  "",
  "沧黄高速公路",
  "",
  "承朝高速公路",
  "",
  "承赤高速公路",
  "",
  "承唐高速公路",
  "",
  "大广高速衡大段",
  "",
  "大广高速京衡段",
  "",
  "邯长高速公路",
  "",
  "京承高速公路",
  "",
  "京沪高速公路",
  "",
  "京昆高速公路北延段",
  "",
  "廊诼高速公路",
  "",
  "密涿高速公路",
  "",
  "青银高速公路",
  "",
  "荣乌高速公路",
  "",
  "石安高速公路",
  "",
  "石黄高速公路",
  "",
  "邢汾高速公路",
  "",
  "邢衡高速公路衡水段",
  "",
  "邢衡高速公路邢台段",
  "",
  "宣大高速公路",
  "",
  "张承高速承德段",
  "",
  "张承高速张家口段",
  "",
  "张涿高速保定段",
  "",
  "张涿高速张家口段"
];
const header2 = [
  "",
  "合计",
  "",
  "保沧高速公路",
  "",
  "保阜高速公路",
  "",
  "保津高速公路",
  "",
  "承秦高速公路",
  "",
  "衡德高速公路",
  "",
  "衡德高速公路故城支线",
  "",
  "京昆高速公路保定段",
  "",
  "京石高速公路",
  "",
  "京张高速公路",
  "",
  "曲港高速公路",
  "",
  "石太高速公路",
  "",
  "太行山高速邯郸段",
  "",
  "太行山高速京蔚段",
  "",
  "太行山高速涞曲段",
  "",
  "太行山高速邢台段",
  "",
  "西阜高速保定段",
  "",
  "邢临高速公路"
];
const header3 = [
  "",
  "合计",
  "",
  "丹拉高速公路",
  "",
  "邯大高速公路",
  "",
  "津讪高速公路",
  "",
  "京化高速公路",
  "",
  "京昆高速公路石家庄段",
  "",
  "京昆高速公路石太段",
  "",
  "廊沧高速沧州段",
  "",
  "廊沧高速廊坊段",
  "",
  "廊沧高速千童段",
  "",
  "青红高速公路",
  "",
  "青红高速公路二期",
  "",
  "太行山高速平赞段",
  "",
  "西柏坡高速公路",
  "",
  "西阜高速石家庄段",
  "",
  "沿海高速沧州段",
  "",
  "张石高速一期"
];
const header4 = [
  "",
  "合计",
  "",
  "二秦高速公路",
  "",
  "共享路段2",
  "",
  "共享路段3",
  "",
  "共享路段4",
  "",
  "共享路段5"
];
const header5 = ["辆次", "金额"];
export default function toXlsx(title, dataList) {
  console.log(columns);
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
    worksheet.mergeCells(2, 1, 2, 3);
    worksheet.mergeCells(2, 4, 2, 6);
    worksheet.mergeCells(2, 7, 2, 138);
    // worksheet.getRow(2).values = header
    // 制定表头
    for (let i = 1; i <= 6; i++) {
      worksheet.mergeCells(3, i, 6, i);
    }
    worksheet.mergeCells(3, 7, 3, 1 + header1.length);
    worksheet.mergeCells(
      3,
      2 + header1.length,
      3,
      1 + header1.length + header2.length
    );
    worksheet.mergeCells(
      3,
      2 + header1.length + header2.length,
      3,
      1 + header1.length + header2.length + header3.length
    );
    worksheet.mergeCells(
      3,
      2 + header1.length + header2.length + header3.length,
      3,
      1 + header1.length + header2.length + header3.length + header4.length
    );
    for (let j = 7; j <= 138; j = j + 2) {
      worksheet.mergeCells(4, j, 5, j + 1);
    }
    worksheet.getRow(4).values = [
      ...header1,
      ...header2,
      ...header3,
      ...header4
    ];
    // 表头
    const short = [2, 3, 4, 6];
    short.forEach(n => {
      worksheet.getRow(n).font = { family: 4, size: 14, bold: true };
      worksheet.getRow(n).alignment = {
        vertical: "middle",
        horizontal: "center"
      };
    });
    columns.forEach(item => {
      item.style = {
        font: {
          name: "Arial Black",
          alignment: { vertical: "middle", horizontal: "center" }
        }
      };
    });
    worksheet.getCell("A2").value = "时间";
    worksheet.getCell("D2").value = "出口纠正车型";
    worksheet.getCell("D2").value = "入口发卡差错单位";
    worksheet.getCell("G3").value = "局属高速及编码";
    worksheet.getCell("BE3").value = "交投集团及编码";
    worksheet.getCell("CO3").value = "市属高速及编码";
    worksheet.getCell("DW3").value = "其他高速及站代码";
    for (let m = 0; m < header.length; m++) {
      worksheet.getCell(String.fromCharCode(65 + m) + "3").value = header[m];
    }
    const rowsix = worksheet.getRow(6);
    for (let a = 7; a <= 138; a = a + 2) {
      let index = 0;
      header5.forEach(b => {
        rowsix.getCell(a + index).value = b;
        index++;
      });
    }
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
    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
      if (rowNumber > 6) {
        row.alignment = { vertical: "middle", horizontal: "center" };
      }
    });
    // 并单元格
    worksheet.mergeCells("A1:EH1");
  });
  workbook.xlsx
    .writeBuffer()
    .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${title}.xlsx`))
    .catch(err => console.log("Error writing excel export", err));
}
