<template>
  <div class="main">
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
        <div class="field">
          <el-input v-model="sn" placeholder="SN" clearable></el-input>
        </div>
        <div class="search-button">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
      <div class="data-list">
        <el-table :stripe="true" :data="assembleBillList">
          <el-table-column prop="org" label="维修点" width="80px"></el-table-column>
          <el-table-column prop="date" label="日期" width="140px" align="center"></el-table-column>
          <el-table-column prop="code" label="单据编号" width="240px" align="center"></el-table-column>
          <el-table-column prop="product" label="SN" width="200px" align="center">
            <template slot-scope="assembleBillList">
              <el-link>
                <router-link
                  to="device-query/product-query-detail"
                >{{assembleBillList.row.product.sn}}
                </router-link>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="销售编码">
            <template slot-scope="assembleBillList">
              <span>{{assembleBillList.row.productType.code}} {{assembleBillList.row.productType.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="parts" label="子件数量" width="160px" align="center"></el-table-column>
          <el-table-column prop="oper" label="操作" width="120px" align="center">
            <template slot-scope="data">
              <el-button type="small" icon="el-icon-view">
                <router-link to="assemble-bill-info">查看</router-link>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <!--
                <el-pagination layout="prev,pager,next,total" :background="true" :page-size="50" :current-page="index" :total="total"></el-pagination>
        -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "assemble-bill-list",
    data() {
      return {
        orgid: "0",
        orgs: [
          {
            orgid: 1,
            name: "深圳天任顺华"
          }
        ],
        dateRange: "",
        sn: ""
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
