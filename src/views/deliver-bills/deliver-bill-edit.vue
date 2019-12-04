<template>
  <div class="main">
    <div class="edit-container">
      <div class="source-area">
        <div class="source-input">
          <el-form label-width="80px" :inline="true" @submit.native.prevent>
            <el-form-item class="field" label="返修工单">
              <el-input
                class="field"
                v-model="billCode"
                placeholder="请选择返修工单"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
            <el-form-item class="field" label="运单号">
              <el-input
                class="field"
                v-model="deliverCode"
                placeholder="请输入发货运单号"
                :clearable="true"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="bill-input">
          <el-form label-width="80px" :inline="true">
            <template v-if="deliverMode=='by-product-instance'">
              <el-form-item class="field" label="SN">
                <el-input v-model="sn" placeholder="扫描或录入设备SN" :clearable="true"></el-input>
              </el-form-item>
              <el-form-item class="field">
                <el-button type="primary" icon="el-icon-download">添加</el-button>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item class="field" label="销售编码">
                <el-input v-model="productCode" placeholder="选择销售编码" suffix-icon="el-icon-search"></el-input>
              </el-form-item>
              <el-form-item class="field" label="发货数量">
                <el-input-number v-model="count" controls-position="right" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item class="field">
                <el-button class="add" type="primary" icon="el-icon-download">添加</el-button>
              </el-form-item>
            </template>
          </el-form>
        </div>
      </div>
      <div class="bill-area">
        <el-tabs class="tab" value="by-product-instance" @tab-click="clickDeliverMode">
          <el-tab-pane class="tab-panel" label="条码发货" name="by-product-instance">
            <div class="source-display data-list">
              <el-table :stripe="true" :data="sourceProductInstanceList1">
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="deviceType" label="类型" width="80" align="center"></el-table-column>
                <el-table-column prop="product" label="销售编码">
                  <template slot-scope="item">
                    <span>{{item.row.product.code}} {{item.row.product.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sn" label="SN" width="220" align="center">
                  <template slot-scope="item">
                    <el-link href="./product-query-detail.html" target="_blank">{{item.row.sn}}</el-link>
                    <i v-if="item.row.picked" class="el-icon-success" style="color:#13ce66;"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bill-display data-list">
              <el-table :stripe="true" :data="sourceProductInstanceList2">
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="product" label="销售编码">
                  <template slot-scope="item">
                    <span>{{item.row.product.code}} {{item.row.product.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sn" label="SN" width="220" align="center">
                  <template slot-scope="item">
                    <el-link href="./product-query-detail.html" target="_blank">{{item.row.sn}}</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tab-panel" label="配件发货" name="by-product">
            <div class="source-display data-list">
              <el-table :stripe="true" :data="sourceProductList">
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="deviceType" label="类型" width="80" align="center"></el-table-column>
                <el-table-column prop="product" label="销售编码">
                  <template slot-scope="item">
                    <span>{{item.row.product.code}} {{item.row.product.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="billCount" label="单据数量" width="120" align="center"></el-table-column>
                <el-table-column prop="deliverableCount" label="可发数量" width="120" align="center"></el-table-column>
              </el-table>
            </div>
            <div class="bill-display data-list">
              <el-table :stripe="true" :data="sourceProductList">
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="product" label="销售编码">
                  <template slot-scope="item">
                    <span>{{item.row.product.code}} {{item.row.product.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="deliverCount" label="发货数量" width="120" align="center"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="b-buttons">
        <el-button class="b-button">暂存</el-button>
        <el-button class="b-button submit" type="primary" icon="el-icon-finished">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "deliver-bill-edit",
    data() {
      return {
        billCode: "",
        deliverCode: "",
        sn: "",
        productCode: "",
        count: "",
        deliverMode: "by-product-instance"
      };
    },
    methods: {
      clickDeliverMode: function (tab) {
        if (tab.index == 0) {
          this.deliverMode = "by-product-instance";
        } else {
          this.deliverMode = "by-product";
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
