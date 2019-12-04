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
        <el-breadcrumb-item>{{$t('acceptBill.arrivalList')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="list-container">
      <div class="filter">
        <div class="field">
          <el-select class="input" v-model="orgid">
            <el-option key="0" label="所有维修点" value="0"></el-option>
            <el-option v-for="org in orgs" :key="org.orgid" :label="org.name" :value="org.orgid"></el-option>
          </el-select>
        </div>
        <div class="field">
          <el-date-picker
            type="daterange"
            v-model="dateRange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="search-button">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
      <div class="data-list">
        <el-table :stripe="true" :data="arrivalList">
          <el-table-column prop="org" label="维修点" width="140px"></el-table-column>
          <el-table-column prop="date" label="日期" width="160px" align="center"></el-table-column>
          <el-table-column prop="code" label="单据编号" align="center"></el-table-column>
          <el-table-column prop="maintainBill" label="返修工单号" align="center">
            <template slot-scope="scope">
              <router-link class="routerLink" to="/work-order/bill-info">{{scope.row.maintainBill}}</router-link>
              <i
                v-if="scope.row.count==scope.row.total"
                class="el-icon-success"
                style="color:#13ce66;"
              ></i>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="包裹数量" width="100px" align="center"></el-table-column>
          <el-table-column prop="count" label="揽收数量" width="100px" align="center"></el-table-column>
          <el-table-column prop="oper" label="操作" width="140px" align="center">
            <template slot-scope="scope">
              <router-link to="arrival-bill-info">
                <el-button type="small" icon="el-icon-view">查看</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <!--<el-pagination layout="prev,pager,next,total" :background="true" :page-size="50" :current-page="index" :total="total"></el-pagination>-->
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
        dateRange: "",
        orgid: "0",
        orgs: [
          {
            orgid: 1,
            name: "深圳天任顺华"
          }
        ]
      };
    },
    computed: {
      ...mapGetters(["sidebar", "arrivalList"])
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
