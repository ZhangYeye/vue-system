<template>
  <div class="header-container">
    <div class="header-title">
      MES售后管理系统
    </div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!--<systemSelect class="right-menu-item" />-->

        <error-log class="errLog-container right-menu-item hover-effect" />

        <lang-select class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span>{{name}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.personalCenter') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ErrorLog from "@/components/ErrorLog";
import LangSelect from "@/components/LangSelect";
// import systemSelect from "@/components/systemSelect";
import { account } from "@/store/attr";
export default {
  data() {
    return {
      name: account
    };
  },
  computed: {
    ...mapGetters(["device"])
  },
  components: {
    ErrorLog,
    LangSelect
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.header-container {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  display:flex;
  justify-content: space-between;
  padding: 0 10px;
  .header-title{
    color: $black100;
    font-size: $bigSize;
    font-weight: bold;
  }
  .right-menu {
    font-size: 14px;
    height: 100%;
    line-height: 50px;
    padding-right: 40px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 4px 10px;
      height: 100%;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: #ffffff;
        }
      }
    }
    .avatar-container {
      .avatar-wrapper {
        margin: -1px 10px;
        position: relative;
        color:$black100;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          padding-right: 5px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -17px;
          top: 20px;
          font-size: 14px;
        }
      }
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
  }
}


</style>
