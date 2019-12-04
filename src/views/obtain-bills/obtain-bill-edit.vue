<template>
  <div class="main">
    <div class="abtain-area">
      <el-tabs value="by-product">
        <el-tab-pane class="by-product" label="备品申请" name="by-product">
          <el-form :inline="true">
            <el-form-item label="销售编码">
              <el-input
                v-model="product.productType.name"
                placeholder="选择销售编码"
                :clearable="true"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
            <el-form-item label="申请数量">
              <el-input-number v-model="product.count" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100px;" icon="el-icon-download">添加</el-button>
            </el-form-item>
          </el-form>
          <el-table height="300" :stripe="true" :data="product.dataList">
            <el-table-column prop="productType.code" label="销售编码" width="200px"></el-table-column>
            <el-table-column prop="productType.name" label="产品名称" width="400px"></el-table-column>
            <el-table-column prop="count" label="申请数量"></el-table-column>
            <el-table-column label="操作" align="center" width="200px">
              <el-button size="mini">修改</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane class="by-material" label="物料申请" name="by-material">
          <el-form :inline="true">
            <el-form-item label="机型">
              <el-input
                v-model="material.productType.name"
                placeholder="选择机型"
                :clearable="true"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
            <el-form-item label="物料">
              <el-input
                v-model="material.bomItem.name"
                placeholder="选择BOM物料"
                :clearable="true"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
            <el-form-item label="位号">
              <el-input v-model="material.sites" placeholder="输入位号，以逗号分隔"></el-input>
            </el-form-item>
            <el-form-item label="申请数量">
              <el-input-number v-model="material.count" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button class="add" type="primary" style="width:100px;" icon="el-icon-download">添加</el-button>
            </el-form-item>
          </el-form>
          <el-table height="300" :stripe="true" :data="material.dataList">
            <el-table-column prop="productType.name" label="机型" width="200px"></el-table-column>
            <el-table-column prop="bomItem.code" label="物料编码" width="200px"></el-table-column>
            <el-table-column prop="bomItem.name" label="物料名称" width="300px"></el-table-column>
            <el-table-column prop="sites" label="位号" width="200px"></el-table-column>
            <el-table-column prop="count" label="申请数量"></el-table-column>
            <el-table-column label="操作" align="center" width="200px">
              <el-button size="mini">修改</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="b-buttons">
      <el-button class="b-button">暂存</el-button>
      <el-button class="b-button submit" type="primary" icon="el-icon-finished">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        product: {
          productType: {
            pdtid: "",
            name: ""
          },
          count: "",
          dataList: []
        },
        material: {
          productType: {
            pdtid: "",
            name: ""
          },
          bomItem: {
            bmiid: "",
            name: ""
          },
          sites: "",
          count: "",
          dataList: []
        }
      };
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .abtain-area {
    padding: 0 10px;
  }
</style>
