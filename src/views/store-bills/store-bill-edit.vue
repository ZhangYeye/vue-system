<template>
  <div class="main">
    <div class="product">
      <div class="sn-area">
        <el-form class="sn-form" label-position="left" :inline="true" @submit.native.prevent>
          <el-form-item class="sn" label="设备条码">
            <el-input class="field" v-model="sn" placeholder="请输入或扫描设备条码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="detail-area">
        <el-button class="add" type="primary" style="width:100px;">
          <i class="el-icon-download"></i>
          <span>添加</span>
        </el-button>
      </div>
    </div>
    <div class="store-area">
      <el-table height="300" :stripe="true" :data="adata">
        <el-table-column prop="sn" label="SN" width="200px"></el-table-column>
        <el-table-column prop="code" label="销售编码" width="200px"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
      </el-table>
    </div>
    <div class="b-buttons">
      <el-button class="b-button">暂存</el-button>
      <el-button class="b-button submit" type="primary" icon="el-icon-finished">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "store-bill-edit",
    data() {
      return {
        sn: ""
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .sn-area {
    .sn-form {
      .el-form-item {
        margin-top: 0;
      }
    }
  }

  .store-area {
    padding: 0 10px;
  }
</style>
