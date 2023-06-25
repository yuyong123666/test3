<template>
  <div id="head">
    <el-button @click="openDrawer" type="primary" style="margin-left: 16px;">
      Menu
    </el-button>

    <!--抽屉-->
    <el-drawer title="Menu" v-model="drawer" :with-header="true" :direction="direction" :before-close="closeDrawer">

      <!--显示-->
      <div>
        <div style="margin-bottom: 5px">显示：</div>
        <el-checkbox v-model="toolbar.isShow" @click="changeToolbarShow">放大/缩小</el-checkbox>
        <el-checkbox v-model="hawkEye.isShow" @click="changeHawkEyeShow">鹰眼图</el-checkbox>
        <el-checkbox v-model="scale.isShow" @click="changeScaleShow">比例尺</el-checkbox>
      </div>
      <el-divider></el-divider>

      <!--图层-->
      <div>
        <div style="margin-bottom: 9px">路况：</div>
        <el-button @click="traffic.domain.show()">显示路况</el-button>
        <el-button @click="traffic.domain.hide()">隐藏路况</el-button>
      </div>
      <el-divider></el-divider>

      <!--搜索-->
      <div>
        <div style="margin-bottom: 7px">位置搜索</div>
        <el-input v-model="toSearchPlace" placeholder="请输入内容" style="width: 50%;"></el-input>
        <el-button @click="searchPlace" style="margin-left: 10px">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: "MyMenu",
  data() {
    return {
      // 抽屉是否打开
      drawer: false,
      // 抽屉打开方向
      direction: "ltr",
    }
  },
  methods: {
    ...mapMutations({
      setToSearchPlace: "setToSearchPlace",
      setSearchResult: "setSearchResult",
      changeShowSearchResult:"changeShowSearchResult",

    }),
    changeToolbarShow() {
      if (!this.toolbar.isShow) {
        this.toolbar.domain.show()

      } else {
        this.toolbar.domain.hide()
      }
    },

    changeHawkEyeShow() {
      if (!this.hawkEye.isShow) {
        this.hawkEye.domain.show()
      } else {
        this.hawkEye.domain.hide()
      }
    },

    changeScaleShow() {
      if (!this.scale.isShow) {
        this.scale.domain.show()
      } else {
        this.scale.domain.hide()
      }
    },

    searchPlace() {
      if (this.toSearchPlace == "") {
        this.$message.error('请输入地址');
      } else {
        const _this = this
        const placeSearch = new window.AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: _this.currentPage, // 页码
          // map: this.map, // 展现结果的地图实例
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });

        placeSearch.search(this.toSearchPlace, function (status, result) {
          console.log(result.poiList)
          _this.searchResult = result.poiList
        })

        if(!this.showSearchResult) {
          this.changeShowSearchResult()
        }
      }
    },

    closeDrawer() {
      this.drawer = false
    },
    openDrawer() {
      this.toSearchPlace = ""
      this.drawer = true
    }
  },

  computed: {
    ...mapState(["toolbar", "hawkEye", "scale", "traffic", "showSearchResult", "currentPage"]),
    toSearchPlace: {
      get() {
        return this.$store.state.toSearchPlace
      },
      set(value) {
        this.setToSearchPlace(value)
      }
    },
    searchResult: {
      get() {
        return this.$store.state.searchResult
      },
      set(value) {
        this.setSearchResult(value)
      }
    }
  },

}
</script>

<style scoped>

</style>
