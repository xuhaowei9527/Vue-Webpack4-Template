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
  "北三县(207 019)",
  "",
  "承朝处(162)",
  "",
  "承赤处(164)",
  "",
  "承唐承德处(161)",
  "",
  "衡大处(005)",
  "",
  "京承处(160)",
  "",
  "京衡处(004)",
  "",
  "京沪处(003)",
  "",
  "廊诼处(032)",
  "",
  "青银处(023)",
  "",
  "荣乌处(026)",
  "",
  "石安处(002 031 0240011)",
  "",
  "石黄处(021 028)",
  "",
  "邢汾处(027)",
  "",
  "邢衡衡水(006)",
  "",
  "邢衡邢台(035)",
  "",
  "宣大处(121)",
  "",
  "张承承德处(165)",
  "",
  "张承张家口处(125)",
  "",
  "张涿保定处(007 036)",
  "",
  "张涿张家口处(126)"
];
const header2 = [
  "",
  "合计",
  "",
  "保沧高速(025)",
  "",
  "保阜高速(034)",
  "",
  "保津高速(022)",
  "",
  "承秦承德段(163)",
  "",
  "衡德高速(010)",
  "",
  "衡德故城支线(011)",
  "",
  "京石高速(001)",
  "",
  "京张高速(120)",
  "",
  "曲港高速(038)",
  "",
  "石太高速(020)",
  "",
  "太行山邯郸(044)",
  "",
  "太行山京蔚(042)",
  "",
  "太行山涞曲段(040)",
  "",
  "太行山西阜保定(041)",
  "",
  "太行山邢台(043)",
  "",
  "邢临高速(024)",
  "",
  "张石保定(013)"
];
const header3 = [
  "",
  "合计",
  "",
  "丹拉高速(122)",
  "",
  "邯大高速(037)",
  "",
  "津讪高速(008)",
  "",
  "京化高速(124)",
  "",
  "京昆高速石家庄段(012)",
  "",
  "京昆高速石太段(009)",
  "",
  "京台高速(017)",
  "",
  "廊沧高速沧州段(014)",
  "",
  "廊沧高速廊坊段(015)",
  "",
  "廊沧高速千童段(018)",
  "",
  "青红高速(029)",
  "",
  "青红高速二期(030)",
  "",
  "太行山平赞(045)",
  "",
  "太行山西阜石家庄(039)",
  "",
  "西柏坡高速(033)",
  "",
  "沿海高速沧州段(016)",
  "",
  "张石高速一期(123)"
];
const header4 = ["", "合计", "", "二秦高速(046)", "", "共享路段(096 098 099)"];
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
    worksheet.mergeCells(2, 7, 2, 128);
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
    for (let j = 7; j <= 128; j = j + 2) {
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
    worksheet.getCell("G2").value = "出口纠正车型";
    worksheet.getCell("D2").value = "入口发卡差错单位";
    worksheet.getCell("G3").value = "局属高速及编码";
    worksheet.getCell("AY3").value = "交投集团及编码";
    worksheet.getCell("CI3").value = "市属高速及编码";
    worksheet.getCell("DS3").value = "其他高速及站代码";
    for (let m = 0; m < header.length; m++) {
      worksheet.getCell(String.fromCharCode(65 + m) + "3").value = header[m];
    }
    const rowsix = worksheet.getRow(6);
    for (let a = 7; a <= 128; a = a + 2) {
      let index = 0;
      header5.forEach(b => {
        rowsix.getCell(a + index).value = b;
        index++;
      });
    }
    worksheet.columns = columns;
    // 数据列表
    worksheet.addRows(dataList);
    console.log(worksheet);
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
    worksheet.mergeCells("A1:DX1");
  });
  workbook.xlsx
    .writeBuffer()
    .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${title}.xlsx`))
    .catch(err => console.log("Error writing excel export", err));
}
