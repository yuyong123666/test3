// 引入vuex
import {createStore} from 'vuex'

// 准备actions——响应组件动作
const actions = {}

// 准备mutations——用于操作数据(state)
const mutations = {
    // 设置map
    setMap(state, value) {
        state.map = value
    },

    // 修改搜索地点
    setToSearchPlace(state, value) {
        state.toSearchPlace = value
    },
    // 修改搜索结果
    setSearchResult(state, value) {
        state.searchResult = value
    },

    // 修改搜索结果显示状态
    changeShowSearchResult(state) {
        state.showSearchResult = !state.showSearchResult
    },

    // 设置搜索结果的Marker
    setSearchResultMark(state, value) {
        state.searchResultMark = value
    },

    setCurrentPage(state, value) {
        state.currentPage = value
    }
}


// 准备state——用于存储数据(state)
const state = {
    // 地图对象
    map: null,
    //工具条
    toolbar: {
        domain: null,
        isShow: false
    },
    // 鹰眼图
    hawkEye: {
        domain: null,
        isShow: true
    },
    // 比例尺
    scale: {
        domain: null,
        isShow: false
    },
    // 搜索地方
    toSearchPlace: "",

    // 交通图
    traffic: {
        domain: null,
        isShow: false
    },

    // 搜索结果列表
    searchResult: null,

    // 搜索结果是否呈现
    showSearchResult: false,

    // 选中的搜索结果
    searchResultMark: null,

    // 分页结果信息

    currentPage: 1,

}

// 创建Store
export default createStore({
    actions,
    mutations,
    state
})
