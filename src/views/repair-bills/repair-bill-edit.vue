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
      <div class="scrap-area">
        <el-button type="danger" icon="el-icon-error">申请报废</el-button>
      </div>
    </div>
    <div class="repair-area">
      <el-form class="repair-form" label-position="left" :inline="true" @submit.native.prevent>
        <el-form-item class="repair-form-item board-type" label="单板类型">
          <el-select class="field" v-model="bdtype">
            <el-option
              v-for="boardType in boardTypes"
              :key="boardType.id"
              :label="boardType.text"
              :value="boardType.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="repair-form-item issue-codes" label="不良代码">
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
        <el-form-item class="repair-form-item repair-mode" label="维修方法">
          <el-select class="field" v-model="repairmode">
            <el-option
              v-for="repairMode in repairModes"
              :key="repairMode.id"
              :label="repairMode.name"
              :value="repairMode.id"
            >
              <span style="float:left;width:80px;">{{repairMode.name}}</span>
              <span style="float:left;padding-right:20px;">{{repairMode.enname}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form class="repair-form" label-position="left" :inline="true" @submit.native.prevent>
        <el-form-item class="repair-form-item replace-item" label="更换元件">
          <el-input
            class="field"
            v-model="replaceitem"
            placeholder="请选择更换元件"
            suffix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
        <el-form-item class="repair-form-item site" label="不良位置">
          <el-input class="field" v-model="site" placeholder="请输入不良位置，如：U1,R1"></el-input>
        </el-form-item>
        <el-form-item class="repair-form-item replace-count" label="更换数量">
          <el-input class="field" v-model="replacecount" placeholder="请输入更换数量，如：1,1"></el-input>
        </el-form-item>
        <el-form-item class="repair-form-item">
          <el-button type="primary" icon="el-icon-download">添加</el-button>
          <el-button icon="el-icon-refresh-left" style="width:100px;">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table height="260" :stripe="true" :data="adata">
        <el-table-column prop="boardType" label="单板类型" width="140"></el-table-column>
        <el-table-column prop="issueCode" label="不良代码" width="140"></el-table-column>
        <el-table-column prop="replaceItem" label="更换元件"></el-table-column>
        <el-table-column prop="site" label="不良位置" width="260"></el-table-column>
        <el-table-column prop="replaceCount" label="更换数量" width="260"></el-table-column>
      </el-table>
      <el-form class="repair-form" label-position="left" :inline="true" @submit.native.prevent>
        <el-form-item class="repair-form-item remark" label="备注">
          <el-input class="field" type="textarea" v-model="remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="b-buttons">
      <el-button class="b-button">暂存</el-button>
      <el-button class="b-button" type="primary" icon="el-icon-finished">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "repair-bill-edit"
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .el-form {
    .el-form-item {
      margin-top: 0;
    }
  }

  .repair-area {
    padding: 0 10px;
  }

  .repair-form {
    padding: 10px 0;
    .repair-form-item {
      margin-bottom: 0;
    }
    .board-type {
      .field {
        width: 200px;
      }
    }
    .replace-item {
      .field {
        width: 200px;
      }
    }
    .issue-codes {
      .field {
        width: 240px;
      }
    }
    .site {
      .field {
        width: 240px;
      }
    }
    .repair-mode {
      .field {
        width: 200px;
      }
    }
    .replace-count {
      .field {
        width: 200px;
      }
    }
    .remark {
      .field {
        width: 828px;
      }
    }
  }
</style>
