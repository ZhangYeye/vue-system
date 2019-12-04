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
        <el-breadcrumb-item v-if="type === 'role'" to="/setting/role-setting">{{$t('setting.roleManagement')}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('btn.update')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <editOrganization v-if="type === 'org'"/>
    <editSite v-if="type === 'site'"/>
    <editAccount v-if="type === 'account'"/>
    <editRole v-if="type === 'role'"/>
  </div>
</template>

<script>
  import Hamburger from '@/components/Hamburger'
  import editOrganization from '../components/edit-organization'
  import editSite from '../components/edit-site'
  import editAccount from '../components/edit-account'
  import editRole from '../components/edit-role'
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        type: '',
      };
    },
    computed: {
      ...mapGetters(["sidebar"]),

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
      editOrganization,
      editSite,
      editAccount,
      editRole
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
