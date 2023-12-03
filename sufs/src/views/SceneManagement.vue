<template>
  <div class="depth model-list">
    <!--  这里是场景管理-->
    <!-- 第一个板块 -->
    <div class="model-list-item">
      <span class="model-list-name">场景</span>
      <div class="model-btn-btnbox">
        <div class="model-btn saveBtn"></div>
        <span class="model-item-name">保存</span>
      </div>
    </div>
    <!-- 第二个板块 -->
    <div class="model-list-item">
      <span class="model-list-name">视角</span>
      <div class="model-btn-btnbox">
        <div class="model-btn globeBtn"></div>
        <span class="model-item-name">全球</span>
      </div>
      <div class="model-btn-btnbox">
        <div class="model-btn chinaBtn"></div>
        <span class="model-item-name">中国</span>
      </div>
      <div class="model-btn-btnbox">
        <div class="model-btn zdyBtn"></div>
        <span class="model-item-name">自定义</span>
      </div>
    </div>
    <!-- 第三个板块 -->
    <div class="model-list-item">
      <span class="model-list-name">搜索定位</span>
      <input type="text" class="model-search-box" />
      <div class="model-btn locationBtn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SceneManagement",
  methods: {
    recentView() {
      this.$bus.$emit("test", (e) => {
        console.log(e);
      });
    },
  },
  mounted() {
    this.$bus.$on("scene", (Cesium, viewer) => {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118.7342061, 32.059, 4500),
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north)
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)
          roll: 0.0, // default value
        },
      });
    });
  },
  beforeDestroy() {
    this.$bus.$off("test");
  },
};
</script>

<style scoped>
.model-list {
  width: 100%;
  height: 96px;
  display: flex;
  overflow-x: visible;
  overflow-y: hidden;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.model-list-item {
  width: auto;
  height: 72px;
  position: relative;
  margin: 12px 5px;
  border-right: 2px solid #474747;
  padding-right: 25px;
  padding-left: 12px;
  display: flex;
}
.model-list-name {
  display: inline-block;
  min-width: 57px;
  height: 18px;
  line-height: 18px;
  background: #474747;
  border-radius: 3px;
  font-size: 12px;
  color: #ddd;
  text-align: center;
  position: absolute;
  left: 16px;
  top: -2px;
}
.model-btn-btnbox {
  height: 72px;
  width: 60px;
  float: left;
  margin-top: 5px;
  margin-left: 5px;
  position: relative;
}
.model-btn {
  width: 34px;
  height: 34px;
  margin: 5px auto;
  margin-top: 20px;
  background-position: 50% !important;
  cursor: pointer;
}
.saveBtn {
  background: url("../assets/model-save.png") no-repeat;
  background-size: contain;
  cursor: pointer;
}
.saveBtn:hover {
  background: url("../assets/model-save-active.png") no-repeat;
  background-size: contain;
}
.globeBtn {
  background: url("../assets/model-globe.png") no-repeat;
  background-size: contain;
  cursor: pointer;
}
.globeBtn:hover {
  background: url("../assets/model-globe.png") no-repeat;
  background-size: contain;
}
.chinaBtn {
  background: url("../assets/model-china.png") no-repeat;
  background-size: contain;
  cursor: pointer;
}
.chinaBtn:hover {
  background: url("../assets/model-china.png") no-repeat;
  background-size: contain;
}
.zdyBtn {
  background: url("../assets/model-zdy.png") no-repeat;
  background-size: contain;
  cursor: pointer;
}
.zdyBtn:hover {
  background: url("../assets/model-zdy.png") no-repeat;
  background-size: contain;
}
.locationBtn {
  display: block;
  width: 20px;
  height: 19px;
  background: url('../assets/model-search.png') no-repeat;
  background-size: 100%;
  position: absolute;
  top: 16px;
  left: 42px;
}
.model-search-box {
  width: 260px !important;
  height: 30px;
  background: #474747;
  border: 2px solid #8a8a8a;
  padding-left: 30px !important;
  margin: 30px 10px;
  margin-left: 18px;
  color: #fff;
}
.model-item-name {
  position: absolute;
  color: #fff;
  bottom: -3px;
  display: inline-block;
  width: 100%;
  font-size: 12px;
  text-align: center;
}
</style>