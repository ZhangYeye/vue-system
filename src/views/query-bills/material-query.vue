<template>
  <div class="main">
    <div class="filter">
      <div class="field">
        <el-select class="input" v-model="orgid">
          <el-option key="0" label="所有维修点" value="0"></el-option>
          <el-option v-for="org in orgs" :key="org.orgid" :label="org.name" :value="org.orgid"></el-option>
        </el-select>
      </div>
      <div class="field">
        <el-input v-model="search" placeholder="按编码或名称查找" suffix-icon="el-icon-search"></el-input>
      </div>
      <div class="search-button">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="data-list">
      <el-table :stripe="true" :data="materialInventory">
        <el-table-column prop="org" label="维修点" width="160px"></el-table-column>
        <el-table-column prop="bomItem.code" label="BOM编码" width="200px"></el-table-column>
        <el-table-column prop="bomItem.name" label="BOM描述"></el-table-column>
        <el-table-column prop="count" label="库存量" align="right"></el-table-column>
        <el-table-column prop="oper" label="操作" width="300px" align="center">
          <template slot-scope="materialInventory">
            <el-button type="small" icon="el-icon-view">查看明细</el-button>
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
</template>

<script>
  export default {
    name: "material-query",
    data() {
      return {
        orgid: "0",
        orgs: [
          {
            orgid: 1,
            name: "深圳天任顺华"
          }
        ],
        search: ""
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
