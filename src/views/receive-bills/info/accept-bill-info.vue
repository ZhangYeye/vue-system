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
        <el-breadcrumb-item to="/receive-manage/accept-bill-list">{{$t('acceptBill.acceptList')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('acceptBill.acceptInfo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bill">
      <div class="bill-title">收货单</div>
      <div class="bill-head">
        <el-form class="bill-head-form" label-position="right" label-width="80px" :inline="true">
          <el-form-item class="field left" label="收货单号:">
            <span>ATB-TRSH-20190712-0012</span>
          </el-form-item>
          <el-form-item class="field right" label="收货时间:">
            <span>2019-07-12</span>
          </el-form-item>
          <el-form-item class="field left" label="返修工单:">
            <router-link to="maintain-bill-info" class="hover">03320181022191432413pm5YhCjr06E4</router-link>
          </el-form-item>
          <el-form-item class="field right" label="收货人:">
            <span>王大锤</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="bill-body">
        <el-tabs value="by-product">
          <el-tab-pane label="条码收货" name="by-product">
            <el-table height="400" :stripe="true" :data="acceptBillInfo">
              <el-table-column prop="sn" label="SN" width="200px">
                <template slot-scope="acceptBillInfo">
                  <el-link>
                    <!-- <router-link to="product-query-detail"  class="hover">{{acceptBillInfo.row.sn}}</router-link> -->
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column prop="code" label="销售编码" width="180px"></el-table-column>
              <el-table-column prop="name" label="产品名称"></el-table-column>
              <el-table-column prop="issueCode" label="不良代码"></el-table-column>
              <el-table-column prop="version" label="版本" width="100px" align="center"></el-table-column>
              <el-table-column prop="condition" label="成色" width="100px" align="center"></el-table-column>
              <el-table-column prop="imgs" label="图片" width="80px" align="center">
                <el-link type="primary">3张图片</el-link>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="配件收货" name="by-product-type"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="bill-foot">
        <el-form class="bill-foot-form" label-position="right" label-width="120px" :inline="true">
          <el-form-item class="field" label="条码收货行数:">
            <span class="value">12</span>
          </el-form-item>
          <el-form-item class="field" label="配件收货行数:">
            <span class="value">1</span>
          </el-form-item>
          <el-form-item class="field" label="单据总行数:">
            <span class="value">13</span>
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
    data() {
      return {
        activeIndex: "/"
      };
    },
    computed: {
      ...mapGetters(["sidebar", "acceptBillInfo"])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
      beforeUpdate: function () {
        this.activeIndex = this.$route.matched[1].path;
      }
    },
    components: {
      Hamburger
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
