<template>
  <div class="" style="display: block">
    <el-table :height="height" :data="list" style="width: 100%">
      <el-table-column prop="orgname" label="单位" width="100">
      </el-table-column>
      <el-table-column prop="year" label="年" width="70"> </el-table-column>
      <el-table-column prop="month" label="月" width="50"> </el-table-column>
      <el-table-column prop="day" label="日" width="50"> </el-table-column>
      <el-table-column label="换卡车">
        <el-table-column prop="vehicles1" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment1" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="伪卡车">
        <el-table-column prop="vehicles2" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment2" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="出口闯关车">
        <el-table-column prop="vehicles3" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment3" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="计重设备逃费">
        <el-table-column prop="vehicles4" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment4" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="绿通治理">
        <el-table-column prop="vehicles5" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment5" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="假证">
        <el-table-column prop="vehicles6" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment6" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="超时车">
        <el-table-column prop="vehicles7" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment7" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="假冒集装箱车">
        <el-table-column prop="vehicles8" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment8" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="ETC逃费">
        <el-table-column prop="vehicles9" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment9" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="J转">
        <el-table-column prop="vehicles10" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment10" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="倒货">
        <el-table-column prop="vehicles11" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment11" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="纠正车型">
        <el-table-column prop="vehicles12" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment12" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="其他">
        <el-table-column prop="vehicles13" label="辆次" width="50">
        </el-table-column>
        <el-table-column prop="payment13" label="金额" width="50">
        </el-table-column>
      </el-table-column>
      <el-table-column label="汇总">
        <el-table-column prop="vehiclesall" label="辆次" width="90">
        </el-table-column>
        <el-table-column prop="paymentall" label="金额" width="90">
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
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style scoped></style>
