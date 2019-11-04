// 汇总录入项配置
const config = [
  { label: "机构", name: "jkorgid", hide: false },
  { label: "车牌号", name: "platenumber", hide: false },
  { label: "收费员", name: "tollid", hide: false },
  { label: "车道号", name: "laneid", hide: false },
  { label: "出口站", name: "exitstation", hide: false },
  { label: "出口所属路段", name: "exitroad", hide: false },
  { label: "出口站所属单位", name: "exitorgan", hide: false },
  { label: "出口时间", name: "exitdate", hide: false },
  { label: "入口站", name: "enterstation", hide: false },
  { label: "入口所属路段", name: "enterroad", hide: false },
  { label: "入口站所属单位", name: "enterorgan", hide: false },
  { label: "车型", name: "vehicletypeid", hide: false },
  { label: "实际车重", name: "vehicleweight", hide: false },
  { label: "超限比例", name: "overweightratio", hide: false },
  { label: "应缴金额", name: "revpayment", hide: false },
  { label: "实缴金额", name: "payment", hide: true },
  { label: "补缴金额", name: "afterpayment", hide: false },
  { label: "入口车道", name: "enterlaneid", hide: false },
  { label: "卡号", name: "cardnumber", hide: false },
  { label: "是否稽查数据", name: "jcflag", hide: false },
  { label: "处理说明", name: "handledesc", hide: false }
];

export default config;
