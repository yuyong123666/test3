<template>

  <div id="container"></div>

</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import {mapState, mapMutations} from "vuex"

window._AMapSecurityConfig = {
  securityJsCode: '502cb6df1a7992ae7a2040d38a74322f'
}


export default {
  name: "MapContainer",
  data() {
    return {

    }
  },

  methods: {

    ...mapMutations({
      setMap: "setMap",
      setSearchResultMark: "setSearchResultMark",
    }),
    // 初始化加载地图
    initMap() {
      AMapLoader.load({
        key: "55c01fded4b2a9ee33693b4667ec52f0",                // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",                                         // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.ToolBar', "AMap.HawkEye", "AMap.Scale", "AMap.PlaceSearch"],// 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map("container", {  //设置地图容器id
          viewMode: "3D",    //是否为3D地图模式
          zoom: 10,           //初始化地图级别
          center: [114.533199, 36.57169], //初始化地图中心点位置
        });

        // 设置工具条
        this.toolbar.domain = new AMap.ToolBar({
          position: {
            top: "10px",
            right: "10px"
          }
        });
        this.map.addControl(this.toolbar.domain);

        // 添加交通图
        this.traffic.domain = new AMap.TileLayer.Traffic({
          'autoRefresh': true,     //是否自动刷新，默认为false
          'interval': 180,         //刷新间隔，默认180s
        });
        this.map.add(this.traffic.domain); //通过add方法添加图层

        // 设置鹰眼图
        this.hawkEye.domain = new AMap.HawkEye();
        this.map.addControl(this.hawkEye.domain);

        // 设置比例尺
        this.scale.domain = new AMap.Scale()
        this.map.addControl(this.scale.domain)

        // 添加搜素结果点
        this.searchResultMark = new AMap.Marker()
        this.map.add(this.searchResultMark)

        // 隐藏
        this.toolbar.domain.hide();
        this.scale.domain.hide();
        this.traffic.domain.hide();
        this.searchResultMark.hide();

      }).catch(e => {
        console.log(e);
      });

    },

  },

  computed: {
    ...mapState(["map", "toolbar", "hawkEye", "scale", "toSearchPlace", "traffic"]),
    map: {
      get() {
        return this.$store.state.map
      },
      set(value) {
        this.setMap(value)
      }
    },
    searchResultMark: {
      get() {
        return this.$store.state.searchResultMark
      },
      set(value) {
        this.setSearchResultMark(value)
      }
    }
  },

  mounted() {
    this.initMap()
  },

}
</script>

<style scoped>
#container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 750px;
}


</style>
