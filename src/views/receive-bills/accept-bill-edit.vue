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
        <el-breadcrumb-item>{{$t('acceptBill.accept')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="edit-container">
      <div class="source-area">
        <div class="source-input">
          <el-form label-width="80px" :inline="true" @submit.native.prevent>
            <el-form-item class="field" label="返修工单">
              <el-input
                class="field"
                v-model="billcode"
                placeholder="按运单号查询"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="bill-area">
        <div class="source-display data-list">
          <el-table :stripe="true" :data="items">
            <el-table-column type="expand" width="30">
              <template slot-scope="scope">
                <el-table
                  :data="scope.row.children"
                  v-if="scope.row.deviceType === '整机' && scope.row.acceptCount > 0"
                  style="width: 90%;"
                  :border="true"
                >
                  <el-table-column prop="sn" label="sn" align="center"></el-table-column>
                  <el-table-column prop="code" label="销售编码" align="center"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column type="index" width="40"></el-table-column>
            <el-table-column prop="deviceType" label="类型" width="100" align="center"></el-table-column>
            <el-table-column prop="product" label="销售编码">
              <template slot-scope="scope">
                <span>{{scope.row.product.code}} {{scope.row.product.name}}</span>
                <i v-if="scope.row.accepted" class="el-icon-success" style="color:#13ce66;"></i>
              </template>
            </el-table-column>
            <el-table-column prop="billCount" label="单据数据" width="120" align="center"></el-table-column>
            <el-table-column prop="acceptCount" label="已收数据" width="120" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="bill-display data-list">
          <el-tabs class="tab" value="by-product-instance" @tab-click="clickDeliverMode">
            <el-tab-pane class="tab-panel" label="条码收货" name="by-product-instance">
              <div class="bill-display data-list">
                <el-form label-width="100px" :inline="true" @submit.native.prevent>
                  <el-form-item class="field" label="SN：">
                    <el-input
                      class="field"
                      v-model="sn"
                      placeholder="sn"
                      style="width: 300px;color: blue!important;"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class="field" label="销售编码：">
                    <el-input class="field" v-model="machineCode" placeholder style="width: 300px;"></el-input>
                  </el-form-item>
                  <el-form-item class="field" label="版型：">
                    <el-select
                      ref="select"
                      v-model="version"
                      placeholder="请选择"
                      style="width: 300px;"
                    >
                      <el-option
                        v-for="item in versionOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <!--<el-input class="field" v-model="billType" placeholder="" style="width: 300px;"></el-input>-->
                  </el-form-item>
                  <el-form-item class="field" label="成色：">
                    <el-select ref="select" v-model="color" placeholder style="width: 300px;">
                      <el-option
                        v-for="item in colorOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <!--<el-input class="field" v-model="billColor" placeholder="" style="width: 300px;"></el-input>-->
                  </el-form-item>
                  <el-form-item class="field" label="图片：">
                    <Upload :item="items"/>
                  </el-form-item>
                  <el-form-item class="field">
                    <el-button type="primary add" icon="el-icon-back" @click="addMachineList">添加</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane class="tab-panel" label="配件收货" name="by-product">
              <div class="bill-display data-list">
                <el-form label-width="100px" :inline="true" @submit.native.prevent>
                  <el-form-item class="field" label="销售编码：">
                    <el-input
                      class="field"
                      v-model="AccessoriesCode"
                      placeholder
                      style="width: 300px;"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class="field" label="收货数量：">
                    <el-input-number
                      type="number"
                      class="field"
                      v-model="AccessoriesCount"
                      controls-position="right"
                      placeholder
                      :min="0"
                      style="width: 300px;"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item class="field">
                    <el-button type="primary add" icon="el-icon-back" @click="addHouseList()">添加</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="b-buttons">
        <el-button class="b-button" type="primary" icon="el-icon-finished" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Hamburger from '@/components/Hamburger'
  import Upload from "@/components/UploadImg/Upload";

  export default {
    data() {
      return {
        billcode: "",
        //整机
        sn: "",
        machineCode: "",
        version: "",
        color: "",
        images: "",
        //配件
        AccessoriesCode: "",
        AccessoriesCount: "",

        billType: "",
        billColor: "",
        productCode: "",
        count: "",
        acceptMode: "by-product-instance",
        //版型
        versionOptions: [
          {
            value: 0,
            label: "大"
          },
          {
            value: 1,
            label: "小"
          }
        ],
        colorOption: [
          {
            value: 0,
            label: "新版"
          },
          {
            value: 1,
            label: "旧版"
          }
        ],
        items: []
      };
    },
    mounted() {
      if (localStorage.getItem("list") === null) {
        this.items = this.acceptList;
      } else {
        this.items = JSON.parse(localStorage.getItem("list"));
      }
    },
    computed: {
      ...mapGetters(["sidebar", "acceptList", "language"])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
      //tab切换
      clickDeliverMode: function (tab) {
        if (tab.index == 0) {
          this.acceptMode = "by-product-instance";
        } else {
          this.acceptMode = "by-product";
        }
      },
      //添加条码收货
      addMachineList() {
        var list = this.items;
        var machineCode = this.machineCode;
        var sn = this.sn;
        list.forEach(function (item, index) {
          if (machineCode === list[index].product.code) {
            list[index].acceptCount += 1;
            var children = [{sn: sn, code: machineCode}];
            list[index].children = children;
          }
        });
        this.sn = "";
        this.machineCode = "";
        this.version = "";
        this.color = "";
        this.images = "";
        console.log(list);
        //localStorage.setItem('list',JSON.stringify(list))
      },
      //添加配件收货
      addHouseList() {
        var list = this.items;
        var AccessoriesCode = this.AccessoriesCode;
        var AccessoriesCount = this.AccessoriesCount;
        list.forEach(function (item, index) {
          if (AccessoriesCode === list[index].product.name) {
            list[index].acceptCount += AccessoriesCount;
          }
        });
        this.AccessoriesCode = "";
        this.AccessoriesCount = "";
        localStorage.setItem("list", JSON.stringify(list));
      },
      //提交表单
      submit() {
        localStorage.removeItem("list");
        console.log(this.language);
      }
    },
    components: {
      Upload,
      Hamburger
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
  @import "~@/styles/variables.scss";

  .bill-area {
    border-top: 2px solid #e6e6e6;
    display: flex;
    .source-display {
      padding-right: 40px;
      width: 50%;
    }
    .bill-display {
      padding-left: 10px;
      flex: 1;
    }
  }

  .tab {
    .tab-panel {
      .data-list {
        padding-top: 15px;
        .field {
          display: block;
        }
      }
    }
  }

  .b-buttons {
    margin-top: 15px;
  }

  .add {
    margin: 30px 0 0 100px;
    width: 150px;
  }

  .hide-expand {
    visibility: hidden;
  }
</style>

