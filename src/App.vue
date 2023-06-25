<template>
  <div>
    <MapContainer></MapContainer>
    <MyMenu class="menu"></MyMenu>
    <MyPanel class="panel" v-show="showSearchResult"></MyPanel>
  </div>
</template>

<script>

import MapContainer from "@/components/MapContainer";
import MyMenu from "@/components/MyMenu";
import MyPanel from "@/components/MyPanel";

import {mapState} from "vuex"

export default {
  name: 'App',
  components: {
    MapContainer, MyMenu, MyPanel
  },
  computed:{
    ...mapState(["showSearchResult"])
  }

}
</script>

<style>
.menu {
  position: absolute;
  left: 10px;
  top: 15px
}

.panel {
  position: absolute;
  background-color: white;
  max-height: 100%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 500px;
}
</style>
