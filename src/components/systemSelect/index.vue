<template>
  <el-dropdown class="system-container right-menu-item hover-effect" trigger="click">
    <div class="system-wrapper">
      <span>{{name}}</span>
      <i class="el-icon-caret-bottom" />
    </div>
    <el-dropdown-menu slot="dropdown" v-for="(item,key) in systemList" :key="key">
      <router-link to="/">
        <el-dropdown-item>{{item.name}}</el-dropdown-item>
      </router-link>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { system } from "@/store/attr";
export default {
  name: "index",
  data() {
    return {
      systemList: "",
      name: "system"
    };
  },
  mounted() {
    // this.systemList = JSON.parse(localStorage.getItem("systemMenu"));
    //
    // var list = this.systemList;
    // for (var i = 0; i < list.length; i++) {
    //   if (system === list[i].code) {
    //     this.name = list[i].name;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.system-container {
  .system-wrapper {
    color: $black100;
  }
}
</style>
