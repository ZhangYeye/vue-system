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
        <el-breadcrumb-item>{{$t('btn.addTo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <addLogistics v-if="type === 'ship'"/>
    <addWarranty v-if="type === 'warranty'"/>
  </div>
</template>

<script>
  import Hamburger from '@/components/Hamburger'
  import addLogistics from '../components/add-logistics'
  import addWarranty from '../components/add-warranty'
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
      addLogistics,
      addWarranty
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
