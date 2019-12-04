<template>
  <div class="main">
    <div class="product">
      <div class="sn-area">
        <el-form
          class="sn-form"
          label-width="80px"
          label-align="right"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item class="sn" label="设备条码">
            <el-input class="field" v-model="sn" placeholder="请输入或扫描设备条码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="detail-area">
        <el-form class="detail-form" label-width="80px" label-position="right" :inline="true">
          <el-form-item class="detail-form-item" label="销售编码:">
            <span class="value">102001014</span>
          </el-form-item>
          <el-form-item class="detail-form-item" label="产品名称:">
            <span class="value">蚂蚁矿机 S9k (14T) EMC</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="assemble-area">
      <el-form
        class="assemble-form"
        label-width="80px"
        label-align="right"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item class="assemble-form-item" label="组装子件">
          <el-input class="field" v-model="item1" placeholder="请输入或扫描子件条码"></el-input>
          <el-form-item class="detail-form-item" label="销售编码:">
            <span class="value">102dfdf014</span>
          </el-form-item>
          <el-form-item class="detail-form-item" label="产品名称:">
            <span class="value">BEZ10601运算板,BEZ10601_HashBoard_4_V1.0010(150*125mm)</span>
          </el-form-item>
        </el-form-item>
      </el-form>
      <el-form
        class="assemble-form"
        label-width="80px"
        label-align="right"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item class="assemble-form-item" label="组装子件">
          <el-input class="field" v-model="item2" placeholder="请输入或扫描子件条码"></el-input>
          <el-form-item class="detail-form-item" label="销售编码:">
            <span class="value">102001014</span>
          </el-form-item>
          <el-form-item class="detail-form-item" label="产品名称:">
            <span class="value">APW3-12-1600-B2</span>
          </el-form-item>
        </el-form-item>
      </el-form>
      <el-form
        class="assemble-form"
        label-width="80px"
        label-align="right"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item class="assemble-form-item" label="组装子件">
          <el-input class="field" v-model="item3" placeholder="请输入或扫描子件条码"></el-input>
          <el-form-item class="detail-form-item" label="销售编码:">
            <span class="value">102001014</span>
          </el-form-item>
          <el-form-item class="detail-form-item" label="产品名称:">
            <span class="value">A3运算板,A3_MainBoard_60_V2.10(222.6*156.7mm)</span>
          </el-form-item>
        </el-form-item>
      </el-form>
      <el-form
        class="assemble-form"
        label-width="80px"
        label-align="right"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item class="assemble-form-item" label="组装子件">
          <el-input class="field" v-model="item4" placeholder="请输入或扫描子件条码"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        class="assemble-form"
        label-width="80px"
        label-align="right"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item class="assemble-form-item" label=" ">
          <el-button class="b-button" type="primary" icon="el-icon-plus">添加</el-button>
          <el-button class="b-button" type="primary" icon="el-icon-finished">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "assemble-bill-edit",
    data() {
      return {
        sn: "",
        item1: "",
        item2: "",
        item3: "",
        item4: ""
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .assemble-area {
    padding: 0 10px;
  }

  .assemble-form {
    .assemble-form-item {
      margin: 20px 0 0 0;
      .field {
        width: 240px;
        margin-right: 27px;
      }
    }
  }
</style>
