<template>
  <div class="">
    <div
      class="preview"
      v-if="imagePreview"
      :style="{ backgroundImage: 'url(' + currentUrl + ')' }"
    >
      <i class="el-icon-close" @click="closePreview"></i>
    </div>
    <div class="pic-container">
      <div
        class="pic-click-section"
        v-for="(item, index) in urlList"
        :key="index"
        @mouseenter="enter"
        @mouseleave="leave"
        :style="{ backgroundImage: 'url(' + item.url + ')' }"
      >
        <transition name="left-slide-fade">
          <svg
            v-if="show"
            @click="previewImg(item)"
            xmlns="http://www.w3.org/2000/svg"
            class="picdelete"
            version="1"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#fff"
              d="M451 835a386 386 0 1 1 0-771 386 386 0 0 1 0 771zm0-675a291 291 0 1 0 0 581 291 291 0 0 0 0-581zm450 798c-15 0-30-5-42-17L658 740a58 58 0 0 1 83-82l201 201a58 58 0 0 1-41 99"
            ></path>
          </svg>
        </transition>
        <transition name="right-slide-fade">
          <svg
            v-if="show"
            @click="deleteImg(item)"
            xmlns="http://www.w3.org/2000/svg"
            class="picpreview"
            version="1"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#fff"
              d="M512 70a439 439 0 0 1 442 442 439 439 0 0 1-442 442A439 439 0 0 1 70 512 439 439 0 0 1 512 70m0-40a482 482 0 1 0 0 964 482 482 0 0 0 0-964zm114 253v-1c0-21-17-38-38-38H436c-21 0-38 17-38 38v1H282v74h460v-74H626zM321 396v346c0 21 17 38 38 38h306c21 0 38-17 38-38V396H321zm114 306h-76V474h76v228zm115 0h-76V474h76v228zm115 0h-76V474h76v228z"
            ></path>
          </svg>
        </transition>
      </div>
      <div class="pic-click-section-select" @click="selectFile">
        <div class="iconfont"></div>
        <input
          ref="upload"
          v-on:change="changeFile"
          type="file"
          id="File"
          multiple
          style="visibility:hidden"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    pictureList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      uploadList: [],
      remainList: [],
      currentUrl: "",
      urlList: [],
      show: false,
      imagePreview: false
    };
  },
  components: {},
  methods: {
    resetInit() {
      this.uploadList = [];
      this.remainList = [];
      this.currentUrl = "";
      this.urlList = [];
    },
    selectFile() {
      // 每次选择初始化
      this.$refs.upload.value = "";
      this.$refs.upload.click();
    },
    changeFile(e) {
      if (e.target.files.length > 0) {
        if (this.uploadList.length > 0) {
          Array.from(e.target.files).forEach(item => {
            if (!this.uploadList.some(i => i.name === item.name)) {
              this.uploadList.push(item);
              this.urlList.push({
                name: item.name,
                url: URL.createObjectURL(item)
              });
            }
          });
        } else {
          this.uploadList = Array.from(e.target.files);
          this.uploadList.forEach(item => {
            this.urlList.push({
              name: item.name,
              url: URL.createObjectURL(item)
            });
          });
        }
      }
    },
    enter(e) {
      this.show = true;
    },
    leave(e) {
      this.show = false;
    },
    previewImg(e) {
      this.imagePreview = true;
      this.currentUrl = e.url;
    },
    closePreview() {
      this.imagePreview = false;
      this.currentUrl = "";
    },
    deleteImg(e) {
      // this.remainList = this.uploadList
      const uploadindex = this.uploadList.findIndex(
        item => item.name === e.name
      );
      const urlindex = this.urlList.findIndex(item => item.name === e.name);
      if (uploadindex && uploadindex !== -1) {
        this.uploadList.splice(uploadindex, 1);
        this.urlList.splice(urlindex, 1);
      } else {
        this.urlList.splice(urlindex, 1);
      }
      const reObj = [];
      this.urlList.forEach(item => {
        const ext = item.url.substring(item.url.length - 3, item.url.length);
        if (ext === "png" || ext === "jpg") {
          reObj.push(item);
        }
      });
      // 在forEach中使用push每一次push会触发watch的更新，更新的是for循环后的结果
      this.remainList = reObj;
      this.show = false;
    }
  },
  watch: {
    uploadList: {
      handler: function(e) {
        this.$emit("uploadFile", e);
      },
      immediate: true,
      deep: true
    },
    remainList: {
      handler: function(e) {
        console.log(e);
        this.$emit("deleteFile", e);
      },
      immediate: true,
      deep: true
    },
    pictureList: {
      handler: function(e) {
        this.urlList = e;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.pic-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.pic-click-section-select {
  display: block;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  margin: 10px 2px 10px 2px;
  width: 180px;
  height: 180px;
  background-color: #fff;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
}
.iconfont {
  position: relative;
  text-align: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 64px;
  width: 64px;
  display: block;
  background-size: auto;
  background-position-x: center;
  background-position-y: center;
  background-image: url("../../../static/image/upload.png");
}

.left-slide-fade-enter-active {
  transition: all 0.4s ease;
}
.left-slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.left-slide-fade-enter,
.left-slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
.right-slide-fade-enter-active {
  transition: all 0.4s ease;
}
.right-slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.right-slide-fade-enter,
.right-slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

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

.picdelete,
.picpreview {
  display: inline-block;
  cursor: pointer;
  margin: 0px 5px 0px 5px;
  height: 32px;
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
  float: right;
  top: 10px;
  right: 10px;
}
</style>
