<template>
  <div class="container">
    <div class="tabs">
      <v-card>
        <v-tabs background-color="#474747" left color="#474747">
          <v-tab class="white--text" active-class="grey darken-1"
            >场景管理</v-tab
          >
          <v-tab class="white--text" active-class="grey darken-1"
            >水深查询</v-tab
          >
          <v-tab class="white--text" active-class="grey darken-1"
            >流速查询</v-tab
          >
          <v-tab class="white--text" active-class="grey darken-1"
            >管网查询</v-tab
          >
          <v-tab class="white--text" active-class="grey darken-1"
            >雷达降雨</v-tab
          >
          <v-tab class="white--text" active-class="grey darken-1"
            >数据驱动</v-tab
          >
          <v-tab-item>
            <v-container
              fluid
              style="user-select: none; height: 100px"
              class="d-flex align-center"
            >

              <!-- <v-btn class="ma-2" elevation="2" @click="recentView"
                >当前视图
              </v-btn>
              <span>底图切换:</span>
              <v-btn-toggle v-model="toggle_exclusive" mandatory>
                <v-btn class="ma-auto"> osm </v-btn>
                <v-btn> esri </v-btn>
                <v-btn> 天地图 </v-btn>
                <v-btn> some </v-btn>
              </v-btn-toggle> -->
              <SceneManagement></SceneManagement>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid style="user-select: none; height: 100px">
              <v-btn elevation="2" @click="query">水深查询 </v-btn>
              <DepthQuery></DepthQuery>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid style="user-select: none; height: 100px">
              <div class="white--text pa-md-5">测试3</div>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid style="user-select: none; height: 100px">
              <div class="white--text pa-md-5">测试4</div>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid style="user-select: none; height: 100px">
              <div class="white--text pa-md-5">测试5</div>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid style="user-select: none; height: 100px">
              <div class="white--text pa-md-5">测试6</div>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
    <!--    cesium视图-->
    <div class="viewer">
      <vc-viewer
        ref="vcViewer"
        @ready="ready"
        :baseLayerPicker="baseLayerPicker"
      >
      </vc-viewer>
      <div class="left-float-box" v-if='left_box_flag'>
        <div class="left-top">
          图层管理
          <span  @click='left_main_flag=!left_main_flag' :class="[left_main_flag?'':'model-arrow-trans','model-arrow']"></span>
          <span class="model-close" @click='left_box_flag=false'></span>
        </div>
        <div class="left-main" :style="{height:left_main_flag?'calc(100% - 40px)':0}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import DepthQuery from "../views/DepthQuery";
import SceneManagement from "../views/SceneManagement";

export default {
  name: "Home",
  components: { DepthQuery, SceneManagement },
  data(){
    return{
        left_main_flag:true,
        loading: false,
        selection: 1,
        baseLayerPicker: true,
        toggle_exclusive: undefined,
        left_box_flag:true,
    }
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    // 初始化
    // 初始化
    ready(cesiumInstance) {
      this.cesiumInstance = cesiumInstance;
      const { Cesium, viewer } = cesiumInstance;
      // 初始化地图
      var tdt = new Cesium.WebMapTileServiceImageryProvider({
        //影像底图
        url:
          "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
          "46bbb53410bb568e5e94123f4dddd626",
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        layer: "tdtImgLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible", //使用谷歌的瓦片切片方式
        show: true,
      });
      viewer.imageryLayers.addImageryProvider(tdt);
      // 添加自定义底图
      var tdtModel = new Cesium.ProviderViewModel({
        name: "天地图",
        iconUrl: Cesium.buildModuleUrl(
          "./Widgets/Images/ImageryProviders/blueMarble.png"
        ),
        tooltip: "天地图服务",
        creationFunction: function () {
          return tdt;
        },
      });
      //定义ESRI ImageryProvider：
      var esriMap = new Cesium.ArcGisMapServerImageryProvider({
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        enablePickFeatures: false,
      });
      //设置ESRI ProviderViewModel：
      var esriMapModel = new Cesium.ProviderViewModel({
        name: "Esri Maps",
        iconUrl: Cesium.buildModuleUrl(
          "./Widgets/Images/ImageryProviders/esriWorldImagery.png"
        ),
        tooltip: "ArcGIS 地图服务",
        creationFunction: function () {
          return esriMap;
        },
      });
      // 定义OSM ImageryProvider
      let osmImageProvider = new Cesium.OpenStreetMapImageryProvider({
        url: "https://a.tile.openstreetmap.org/",
      });
      //设置OSM ProviderViewModel：
      let osmMapModel = new Cesium.ProviderViewModel({
        name: "OSM",
        iconUrl: Cesium.buildModuleUrl(
          "Widgets/Images/ImageryProviders/openStreetMap.png"
        ),
        tooltip: "OSM",
        creationFunction: function () {
          return osmImageProvider;
        },
      });
      //将自定义的一个个底图进行叠加
      var providerViewModels = [];
      providerViewModels.push(esriMapModel);
      // providerViewModels.push(gaodeMapModel);
      providerViewModels.push(osmMapModel);
      providerViewModels.push(tdtModel);
      viewer.baseLayerPicker.viewModel.imageryProviderViewModels =
        providerViewModels;
    },
    recentView() {
      this.$bus.$emit(
        "scene",
        this.$refs.vcViewer.Cesium,
        this.$refs.vcViewer.viewer
      );
    },
    toggleBaseMap() {
      // var viewer = this.$refs.vcViewer.viewer
      // var Cesium = this.$refs.vcViewer.Cesium
    },
    query() {
      var that = this;
      console.log(that.Cesium);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  position: relative;
  padding: 0px;
  background: #6b6b6b;
  /*保持宽度*/
  max-width: 100%;
}

.viewer {
  position: absolute;
  top: 148px;
  /*底部留有点空隙*/
  bottom: 30px;
  left: 0px;
  width: 100%;
}

.left-float-box {
  width: 300px;
  height: 480px;
  position: absolute;
  top: 0px;
  left: 5px;
  /*border-radius: 3px;*/
  overflow: hidden;
  z-index: 9;
}

.left-top {
  width: calc(100% - 10px);
  cursor: all-scroll;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  top: 0;
  left: 0;
  min-height: 40px;
  line-height: 40px;
  border-bottom: 4px solid rgba(0, 0, 0, 0.4);
  color: #ddd;
  font-size: 14px;
  font-family: \5fae\8f6f\96c5\9ed1;
  padding: 0 31px 0 18px;
  text-align: left;
  user-select: none;
  background: rgba(71,71,71,.8);
}

.left-main {
  position: relative;
  /* padding: 5px; */
  text-align: left;
  width: calc(100% - 10px);
  transition: all 0.5s linear;
  background: rgba(71,71,71,.8);
  /* height: calc(100% - 40px); */
  user-select: none;
}

.model-arrow {
  cursor: pointer;
  position: absolute;
  top: 50%;
  margin-top: -5px;
  right: 50px;
  width: 16px;
  height: 12px;
  line-height: 12px;
  background: url("../assets/model-arrow.png") no-repeat;
  background-size: contain;
  transition: all 0.5s linear;
}

.model-arrow:hover {
  background: url("../assets/model-arrow-active.png") no-repeat;
  background-size: contain;
}

.model-arrow-trans{
    transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
}
.model-close:hover {
  background: url("../assets/close-active.png") no-repeat;
  background-size: contain;
}
.model-close {
  cursor: pointer;
  position: absolute;
  top: 50%;
  margin-top: -6.5px;
  right: 20px;
  width: 13px;
  height: 13px;
  line-height: 13px;
  background: url("../assets/close.png") no-repeat;
  background-size: contain;
}
/*开启深层，进行样式覆盖*/
::v-deep .v-item-group {
  border-radius: 0px !important;
}

::v-deep .v-application--wrap {
  flex: 0 1 auto;
}
</style>