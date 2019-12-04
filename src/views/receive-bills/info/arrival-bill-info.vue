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
        <el-breadcrumb-item>{{$t('acceptBill.arrivalmanage')}}</el-breadcrumb-item>
        <el-breadcrumb-item to="/receive-manage/arrival-bill-list">{{$t('acceptBill.arrivalList')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('acceptBill.arrivalInfo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bill">
      <div class="bill-title">签收单</div>
      <div class="bill-head">
        <el-form class="bill-head-form" label-position="right" label-width="80px" :inline="true">
          <el-form-item class="field left" label="揽收单号:">
            <span>RCB-TRSH-20190712-0012</span>
          </el-form-item>
          <el-form-item class="field right" label="揽收时间:">
            <span>2019-07-12</span>
          </el-form-item>
          <el-form-item class="field left" label="返修工单:"></el-form-item>
          <el-form-item class="field right" label="揽收人:">
            <span>王大锤</span>
          </el-form-item>
        </el-form>
        <el-form class="bill-head-form" label-position="right" label-width="80px" :inline="true">
          <el-form-item class="field left" label="包裹数量:">
            <span class="value">3</span>
          </el-form-item>
          <el-form-item class="field right" label="揽收数量:">
            <span class="value">3</span>
          </el-form-item>
        </el-form>
        <el-form class="bill-head-form" label-position="right" label-width="80px" :inline="true">
          <el-form-item class="field" label="揽收备注:">
            <span class="value">无</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Hamburger from '@/components/Hamburger'

  export default {
    name: "receive-bill-info",
    computed: {
      ...mapGetters(["sidebar"]),
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
    },
    components: {
      Hamburger
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
