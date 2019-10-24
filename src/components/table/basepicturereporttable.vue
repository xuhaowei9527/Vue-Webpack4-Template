<template>
  <div class="" style="display: block">
    <div
      class="preview"
      v-if="imagePreview"
      :style="{ backgroundImage: 'url(' + currentUrl + ')' }"
    >
      <i class="el-icon-close" @click="closePreview"></i>
      <i
        class="el-icon-download"
        @click="
          getUrlBase64(currentUrl, currentUrl.substring(currentUrl.length - 8))
        "
      ></i>
    </div>
    <el-table :data="list" :height="height" border stripe style="width: 100%">
      <el-table-column fixed type="index" label="序号" width="70">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="图片预览">
              <div
                class="pic-click-section"
                @click="previewImg(item)"
                v-for="(item, index) in props.row.photofilename
                  .slice(0, -1)
                  .split(';')"
                :key="index"
                :style="{ backgroundImage: 'url(' + item + ')' }"
              ></div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in propLabel"
        :key="index"
        :prop="item.propkey"
        :label="item.proplabel"
        :width="item.wh"
      >
        <template slot-scope="scope">
          <div v-html="reparse(item.propkey, scope.row[item.propkey])"></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const FileSaver = require("file-saver");
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    propLabel: {
      type: Array,
      default: function() {
        return {};
      }
    },
    parseItem: {
      type: Array,
      default: function() {
        return [];
      }
    },
    height: {
      type: Number,
      default: function() {
        return 100;
      }
    }
  },
  data() {
    return {
      imagePreview: false,
      currentUrl: ""
    };
  },
  components: {},
  methods: {
    handleEdit(e) {
      this.$emit("handleEdit", e);
    },
    handleDelete(e) {
      this.$emit("handleDelete", e);
    },
    closePreview() {
      this.imagePreview = false;
      this.currentUrl = "";
    },
    previewImg(e) {
      this.imagePreview = true;
      this.currentUrl = e;
    },
    downLoad(href, name) {
      const eleLink = document.createElement("a");
      eleLink.download = name;
      eleLink.href = href;
      eleLink.click();
      eleLink.remove();
    },
    getUrlBase64(url, name) {
      FileSaver.saveAs(url, name);
    },
    reparse(name, value) {
      //  对于对应字段做特殊处理
      const flag = this.parseItem.includes(name);
      if (flag) {
        return `<div style='white-space: pre-wrap'>${value.trim()}</div>`;
      } else {
        return value;
      }
    }
  }
};
</script>

<style scoped>
.pic-click-section {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  float: left;
  margin: 0 10px 10px 0;
  background: #f8f8f8;
  border-radius: 4px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  border: 1px solid #d7d7d7;
  overflow: hidden;
}
.preview {
  position: fixed;
  z-index: 99;
  border: 1px solid #e0e0e0;
  padding: 10px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  font-size: 48px;
  color: #fff;
  background-size: auto;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  background-color: rgba(55, 55, 55, 0.5);
}
.el-icon-close {
  font-size: 32px;
  float: right;
  top: 20px;
  right: 20px;
}
.el-icon-download {
  font-size: 32px;
  float: right;
  padding-right: 20px;
  top: 20px;
  right: 20px;
}
</style>
