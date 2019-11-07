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
        "北三县(207 019)",
        "承朝处(162)",
        "承赤处(164)",
        "承唐承德处(161)",
        "衡大处(005)",
        "京承处(160)",
        "京衡处(004)",
        "京沪处(003)",
        "廊诼处(032)",
        "青银处(023)",
        "荣乌处(026)",
        "石安处(002 031 0240011)",
        "石黄处(021 028)",
        "邢汾处(027)",
        "邢衡衡水(006)",
        "邢衡邢台(035)",
        "宣大处(121)",
        "张承承德处(165)",
        "张承张家口处(125)",
        "张涿保定处(007 036)",
        "张涿张家口处(126)"
      ],
      arr2: [
        "保沧高速(025)",
        "保阜高速(034)",
        "保津高速(022)",
        "承秦承德段(163)",
        "衡德高速(010)",
        "衡德故城支线(011)",
        "京石高速(001)",
        "京张高速(120)",
        "曲港高速(038)",
        "石太高速(020)",
        "太行山邯郸(044)",
        "太行山京蔚(042)",
        "太行山涞曲段(040)",
        "太行山西阜保定(041)",
        "太行山邢台(043)",
        "邢临高速(024)",
        "张石保定(013)"
      ],
      arr3: [
        "丹拉高速(122)",
        "邯大高速(037)",
        "津讪高速(008)",
        "京化高速(124)",
        "京昆高速石家庄段(012)",
        "京昆高速石太段(009)",
        "京台高速(017)",
        "廊沧高速沧州段(014)",
        "廊沧高速廊坊段(015)",
        "廊沧高速千童段(018)",
        "青红高速(029)",
        "青红高速二期(030)",
        "太行山平赞(045)",
        "太行山西阜石家庄(039)",
        "西柏坡高速(033)",
        "沿海高速沧州段(016)",
        "张石高速一期(123)"
      ],
      arr4: ["二秦高速(046)", "共享路段(096 098 099)"],
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
      console.log(result);
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
