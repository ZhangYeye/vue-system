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
        <el-form class="detail-form" label-position="left" :inline="true">
          <el-form-item class="detail-form-item" label="销售编码:">
            <span class="value">102001014</span>
          </el-form-item>
          <el-form-item class="detail-form-item" label="产品名称:">
            <span class="value">蚂蚁矿机 S9k (14T) EMC</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="examine-area">
      <el-form class="examine-form" label-position="left" :inline="true" @submit.native.prevent>
        <el-form-item class="examine-form-item" label="不良代码">
          <el-select class="field" v-model="issuecode">
            <el-option
              v-for="issueCode in issueCodes"
              :key="issueCode.code"
              :label="issueCode.name"
              :value="issueCode.code"
            >
              <span style="float:left;width:60px;">{{issueCode.code}}</span>
              <span style="float:left;padding-right:20px;">{{issueCode.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="examine-form-item">
          <el-button class="add" type="primary" style="width:100px;">
            <i class="el-icon-download"></i>
            <span>添加</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-table height="300" :stripe="true" :data="adata">
        <el-table-column prop="sn" label="SN" width="200px"></el-table-column>
        <el-table-column prop="code" label="销售编码" width="200px"></el-table-column>
        <el-table-column prop="name" label="产品名称" width="300px"></el-table-column>
        <el-table-column prop="issuecode" label="不良代码"></el-table-column>
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
    name: "examine-bill-edit",
    data() {
      return {
        sn: "",
        issuecode: "",
        issueCodes: [
          {
            code: "00000",
            name: "测试通过"
          },
          {
            code: "F001",
            name: "00号芯片不运行"
          },
          {
            code: "F002",
            name: "掉芯片"
          },
          {
            code: "F005",
            name: "掉板"
          },
          {
            code: "F102",
            name: "算力低"
          },
          {
            code: "F103",
            name: "温度异常"
          },
          {
            code: "F104",
            name: "风扇异常"
          },
          {
            code: "F105",
            name: "检测不到IP"
          },
          {
            code: "F106",
            name: "无配置信息"
          },
          {
            code: "F109",
            name: "其他"
          }
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .examine-area {
    padding: 0 10px;
  }

  .examine-form {
    padding: 10px 0;
    .examine-form-item {
      margin: 0px 0 0 0;
      .field {
        width: 240px;
      }
    }
  }
</style>
