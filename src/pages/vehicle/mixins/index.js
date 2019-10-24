const vehicleMixins = {
  methods: {
    enterStationFilter(e) {
      this.enterFilterStationList = [];
      if (!isNaN(Number(e))) {
        // 判断是数字字符串去id中比较 enterFilterStationList
        this.stationList.forEach(item => {
          if (item.id.includes(e)) {
            this.enterFilterStationList.push(item);
          }
        });
      } else {
        // 非数字去stationname中比较
        this.stationList.forEach(item => {
          if (item.stationname.includes(e)) {
            this.enterFilterStationList.push(item);
          }
        });
      }
    },
    exitStationFilter(e) {
      this.exitFilterStationList = [];
      if (!isNaN(Number(e))) {
        // 判断是数字字符串去id中比较 exitFilterStationList
        this.stationList.forEach(item => {
          if (item.id.includes(e)) {
            this.exitFilterStationList.push(item);
          }
        });
      } else {
        // 非数字去stationname中比较
        this.stationList.forEach(item => {
          if (item.stationname.includes(e)) {
            this.exitFilterStationList.push(item);
          }
        });
      }
    }
  }
};

export { vehicleMixins };
