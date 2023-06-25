<template>
  <div>
    <el-button @click="close" class="close">
      关闭
    </el-button>
    <el-table
        :data="searchData"
        border
        @row-click="selectResult"
        style="width: 100%">
      <el-table-column
          prop="name"
          label="名称"
          width="250">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          width="250">
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="5"

          layout="total, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>


import {mapState, mapMutations} from "vuex";

export default {
  name: "MyPanel",
  data() {
    return {
      imgUrl: require("../assets/images/icon/位置.png"),
      // searchData:[]
      currentPage1: 1,
    }
  },
  computed: {
    ...mapState(["searchResult", "map", "showSearchResult", "toSearchPlace"]),
    searchData() {
      if (this.searchResult == null) {
        return []
      } else {
        return this.searchResult.pois
      }
    },

    total() {
      if(this.searchResult == null) {
        return 0
      } else {
        return this.searchResult.count
      }
    },

    searchResultMark:{
      get() {
        return this.$store.state.searchResultMark
      },
      set(value) {
        this.setSearchResultMark(value)
      }
    },

    currentPage: {
      get() {
        return this.$store.state.currentPage
      },
      set(value) {
        this.setCurrentPage(value)
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
  methods: {
    ...mapMutations({
      changeShowSearchResult: "changeShowSearchResult",
      setSearchResultMark: "setSearchResultMark",
      setCurrentPage:"setCurrentPage",
      setSearchResult:"setSearchResult"
    }),
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
          _this.searchResult = result.poiList
        })

        if(!this.showSearchResult) {
          this.changeShowSearchResult()
        }
      }
    },

    selectResult(row) {
      console.log(row.location)

      this.searchResultMark.setPosition(row.location)
      this.searchResultMark.show()
      console.log(this.searchResultMark)
      // this.map.add(this.searchResultMark)
      // this.map.setCenter(row.location)
      // this.map.setZoom(13)
      this.map.setZoomAndCenter(13, row.location,true, 1)
    },

    close() {
      if(this.showSearchResult) {
        this.changeShowSearchResult();
        this.searchResultMark.hide()
      }
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.searchPlace()
    },

  }
}
</script>

<style scoped>
.block {
  margin-left: 50px;
}

.close{
  margin: 5px;
}
</style>
