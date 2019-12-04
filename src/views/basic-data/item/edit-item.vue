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
        <el-breadcrumb-item>{{$t('basicData.basicData')}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="type === 'ship'" to="/basic-data/logistics-management">{{$t('basicData.logistics')}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="type === 'warranty'" to="/basic-data/maintain-deadline-list">{{$t('basicData.warranty')}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('btn.update')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <editLogistics v-if="type === 'ship'"/>
    <editWarranty v-if="type === 'warranty'"/>
  </div>
</template>

<script>
  import Hamburger from '@/components/Hamburger'
  import editLogistics from '../components/edit-logistics'
  import editWarranty from '../components/edit-warranty'
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
      editLogistics,
      editWarranty
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
