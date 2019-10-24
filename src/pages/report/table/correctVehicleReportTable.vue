<template>
  <div class="" style="display: block">
    <el-table :height="height" :data="listByParse" style="width: 100%">
      <el-table-column align="center" label="时间">
        <el-table-column align="center" prop="year" label="年" width="70">
        </el-table-column>
        <el-table-column align="center" prop="month" label="月" width="50">
        </el-table-column>
        <el-table-column align="center" prop="day" label="日" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="出口纠正车型">
        <el-table-column align="center" prop="orgname" label="单位" width="120">
        </el-table-column>
        <el-table-column
          prop="vehicleAllCount"
          label="辆次"
          align="center"
          width="75"
        >
        </el-table-column>
        <el-table-column
          prop="vehicleAllPayment"
          label="金额"
          align="center"
          width="75"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="入口发卡差错单位">
        <el-table-column align="center" label="局属高速及编码">
          <el-table-column label="合计">
            <el-table-column
              prop="vehiclesCount1"
              label="辆次"
              align="center"
              width="75"
            >
            </el-table-column>
            <el-table-column
              prop="vehiclesPayment1"
              label="金额"
              align="center"
              width="75"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in arr1"
            :key="index"
            :label="item"
            align="center"
            width="150"
          >
            <el-table-column
              :prop="'vehicles1' + index"
              label="辆次"
              align="center"
              width="75"
            >
            </el-table-column>
            <el-table-column
              :prop="'payment1' + index"
              label="金额"
              align="center"
              width="75"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="交投集团及编码">
          <el-table-column label="合计">
            <el-table-column
              prop="vehiclesCount2"
              label="辆次"
              align="center"
              width="75"
            >
            </el-table-column>
            <el-table-column
              prop="vehiclesPayment2"
              label="金额"
              align="center"
              width="75"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in arr2"
            :key="index"
            :label="item"
            align="center"
            width="150"
          >
            <el-table-column
              :prop="'vehicles2' + index"
              label="辆次"
              align="center"
              width="75"
            >
            </el-table-column>
            <el-table-column
              :prop="'payment2' + index"
              align="center"
              label="金额"
              width="75"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="市属高速及编码">
          <el-table-column label="合计">
            <el-table-column
              prop="vehiclesCount3"
              label="辆次"
              align="center"
              width="75"
            >
            </el-table-column>
            <el-table-column
              prop="vehiclesPayment3"
              label="金额"
              align="center"
              width="75"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in arr3"
            :key="index"
            :label="item"
            align="center"
            width="150"
          >
            <el-table-column
              :prop="'vehicles3' + index"
              align="center"
              label="辆次"
              width="75"
            >
            </el-table-column>
            <el-table-column
              :prop="'payment3' + index"
              align="center"
              label="金额"
              width="75"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="其他高速及编码">
          <el-table-column label="合计">
            <el-table-column
              prop="vehiclesCount4"
              label="辆次"
              align="center"
              width="75"
            >
            </el-table-column>
            <el-table-column
              prop="vehiclesPayment4"
              label="金额"
              align="center"
              width="75"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in arr4"
            :key="index"
            align="center"
            :label="item"
            width="150"
          >
            <el-table-column
              :prop="'vehicles4' + index"
              label="辆次"
              align="center"
              width="75"
            >
            </el-table-column>
            <el-table-column
              :prop="'payment4' + index"
              label="金额"
              align="center"
              width="75"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    height: {
      type: Number,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      // 二级菜单
      arr1: [
        "沧黄高速公路",
        "承朝高速公路",
        "承赤高速公路",
        "承唐高速公路",
        "大广高速衡大段",
        "大广高速京衡段",
        "邯长高速公路",
        "京承高速公路",
        "京沪高速公路",
        "京昆高速公路北延段",
        "廊诼高速公路",
        "密涿高速公路",
        "青银高速公路",
        "荣乌高速公路",
        "石安高速公路",
        "石黄高速公路",
        "邢汾高速公路",
        "邢衡高速公路衡水段",
        "邢衡高速公路邢台段",
        "宣大高速公路",
        "张承高速承德段",
        "张承高速张家口段",
        "张涿高速保定段",
        "张涿高速张家口段"
      ],
      arr2: [
        "保沧高速公路",
        "保阜高速公路",
        "保津高速公路",
        "承秦高速公路",
        "衡德高速公路",
        "衡德高速公路故城支线",
        "京昆高速公路保定段",
        "京石高速公路",
        "京张高速公路",
        "曲港高速公路",
        "石太高速公路",
        "太行山高速邯郸段",
        "太行山高速京蔚段",
        "太行山高速涞曲段",
        "太行山高速邢台段",
        "西阜高速保定段",
        "邢临高速公路"
      ],
      arr3: [
        "丹拉高速公路",
        "邯大高速公路",
        "津讪高速公路",
        "京化高速公路",
        "京昆高速公路石家庄段",
        "京昆高速公路石太段",
        "廊沧高速沧州段",
        "廊沧高速廊坊段",
        "廊沧高速千童段",
        "青红高速公路",
        "青红高速公路二期",
        "太行山高速平赞段",
        "西柏坡高速公路",
        "西阜高速石家庄段",
        "沿海高速沧州段",
        "张石高速一期"
      ],
      arr4: [
        "二秦高速公路",
        "共享路段2",
        "共享路段3",
        "共享路段4",
        "共享路段5"
      ],
      listByParse: []
    };
  },
  components: {},
  methods: {
    getKeys(arr) {
      const result = Array.from({
        length: arr.length
      });
      let index = 0;
      arr.forEach(i => {
        result[index] = {};
        Object.keys(i).forEach(j => {
          if (typeof i[j] === "string") {
            const obj = Object.create(
              {},
              {
                [j]: {
                  value: i[j],
                  enumerable: true
                }
              }
            );
            Object.assign(result[index], obj);
          } else {
            if (i[j] instanceof Array) {
              i[j].forEach(k => {
                switch (k.company) {
                  case "局属":
                    Object.assign(result[index], this.caseFunc(k, "1"));
                    break;
                  case "交投":
                    Object.assign(result[index], this.caseFunc(k, "2"));
                    break;
                  case "市属":
                    Object.assign(result[index], this.caseFunc(k, "3"));
                    break;
                  case "其他":
                    Object.assign(result[index], this.caseFunc(k, "4"));
                    break;
                  default:
                    break;
                }
              });
            }
          }
        });
        index++;
      });
      return result;
    },
    caseFunc(o, key) {
      const result = {};
      const vp1 = Object.create(
        {},
        {
          ["vehiclesPayment" + key]: {
            value: o.vehiclesPayment,
            enumerable: true
          }
        }
      );
      const vc1 = Object.create(
        {},
        {
          ["vehiclesCount" + key]: {
            value: o.vehiclesCount,
            enumerable: true
          }
        }
      );
      Object.assign(result, vp1);
      Object.assign(result, vc1);
      let index = 0;
      o.vehicleInfos.forEach(i => {
        const vp = Object.create(
          {},
          {
            ["vehicles" + key + index]: {
              value: i.vehicles,
              enumerable: true
            }
          }
        );
        const vc = Object.create(
          {},
          {
            ["payment" + key + index]: {
              value: i.payment,
              enumerable: true
            }
          }
        );
        Object.assign(result, vp);
        Object.assign(result, vc);
        index++;
      });
      return result;
    }
  },
  watch: {
    list: {
      handler: function(e) {
        this.listByParse = this.getKeys(e);
        this.$emit("parseList", this.listByParse);
      },
      deep: true
    }
  }
};
</script>

<style scoped></style>
