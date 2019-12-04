<template>
  <div class="main">
    <div :class="{'fixed-header':true}" class="navList">
      <Hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <el-breadcrumb class="app-breadcrumb" separator=">">
        <el-breadcrumb-item>{{$t('setting.systemSetting')}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="type === 'org'" to="/setting/organization-setting">{{$t('setting.orgManagement')}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="type === 'site'" to="/setting/site-setting">{{$t('setting.siteManagement')}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="type === 'account'" to="/setting/account-setting">{{$t('setting.accountManagement')}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="type === 'role'" to="/setting/rol-setting">{{$t('setting.roleManagement')}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('btn.addTo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <addOrganization v-if="type === 'org'"/>
    <addSite v-if="type === 'site'"/>
    <addAccount v-if="type === 'account'"/>
    <addRole v-if="type === 'role'"/>
  </div>
</template>

<script>
  import Hamburger from '@/components/Hamburger'
  import {mapGetters} from "vuex";
  import addOrganization from '../components/add-organization'
  import addSite from '../components/add-site'
  import addAccount from '../components/add-account'
  import addRole from '../components/add-role'

  export default {
    data() {
      return {
        type: '',
      };
    },
    computed: {
      ...mapGetters(["sidebar"])
    },
    mounted() {
      let type = localStorage.getItem('type')
      this.type = type
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
    },
    components: {
      Hamburger,
      addOrganization,
      addSite,
      addAccount,
      addRole
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .list-input {
    width: 50%;
    .el-form {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      span {
        color: #909399;
      }
      .el-form-item {
        flex: 1;
        &.el-form-item--medium {
          .el-form-item__content {
            width: 50% !important;
            height: 50px;
          }
        }
      }
    }
  }

  .input {
    width: 35%;
    margin-bottom: 10px;
    display: block;
  }

  .error {
    position: absolute;
    top: 10px;
    left: 36%;
    color: #ff4949;
    font-size: 12px;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .el-textarea__inner {
    height: 80px;
  }
</style>
