<template>
  <div class="main">
    <div class="return-area">
      <el-tabs value="by-product">
        <el-tab-pane class="by-product" label="备品退料" name="by-product">
          <el-form :inline="true">
            <el-form-item style="padding-right:40px;">
              <el-radio-group v-model="byProduct.pickMode">
                <el-radio :label="1">按产品条码</el-radio>
                <el-radio :label="2">按销售编码</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="产品条码" v-if="byProduct.pickMode==1">
              <el-input v-model="byProduct.product.code" placeholder="输入或扫描产品条码"></el-input>
            </el-form-item>
            <el-form-item label="销售编码" v-if="byProduct.pickMode==2">
              <el-input
                v-model="byProduct.productType.name"
                placeholder="选择销售编码"
                :clearable="true"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
            <el-form-item label="数量" v-if="byProduct.pickMode==2">
              <el-input-number v-model="byProduct.count" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100px;" icon="el-icon-download">添加</el-button>
            </el-form-item>
          </el-form>
          <el-table height="300" :stripe="true" :data="byProduct.dataList">
            <el-table-column prop="productType.code" label="销售编码" width="200px"></el-table-column>
            <el-table-column prop="productType.name" label="名称" width="400px"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column label="产品明细" align="center">
              <el-button size="mini">查看</el-button>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">
              <el-button size="mini">修改</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane class="by-material" label="物料退料" name="by-material">
          <el-form :inline="true">
            <el-form-item label="物料BOM">
              <el-input v-model="byMaterial.bomItem.name" placeholder="选择物料"></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number v-model="byMaterial.count" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button class="add" type="primary" style="width:100px;" icon="el-icon-download">添加</el-button>
            </el-form-item>
          </el-form>
          <el-table height="300" :stripe="true" :data="byMaterial.dataList">
            <el-table-column prop="bomItem.code" label="物料编码" width="200px"></el-table-column>
            <el-table-column prop="bomItem.name" label="物料名称" width="400px"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
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
    name: "return-bill-edit",
    data() {
      return {
        byProduct: {
          pickMode: 1,
          product: {
            prdid: "",
            code: "",
            name: ""
          },
          productType: {
            pdtid: "",
            code: "",
            name: ""
          },
          count: 0,
          dataList: [
            {
              mode: 1,
              productType: {
                pdtid: "",
                code: "1018011112",
                name: "101801112（蚂蚁矿机S9 SE 16T EMC）"
              },
              count: 12,
              products: [
                {
                  prdid: "",
                  code: "",
                  name: ""
                }
              ]
            }
          ]
        },
        byMaterial: {
          bomItem: {
            bmiid: "",
            code: "",
            name: ""
          },
          count: 0,
          dataList: [
            {
              bomItem: {
                bmiid: "",
                code: "100103201",
                name: "PCBA,P2X-1_V1.01(91.6*37mm)"
              },
              count: 2000
            }
          ]
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .return-area {
    padding: 0 10px;
  }
</style>
