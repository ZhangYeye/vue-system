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
        <el-breadcrumb-item to="/work-order/work-order">{{$t('workList.workManage')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('workList.billInfo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bill">
      <div class="bill-title">返修工单</div>
      <div class="bill-head">
        <el-form class="bill-head-form" label-position="right" label-width="80px" :inline="true">
          <el-form-item class="field" label="工单号:">
            <span class="value">033201806111043348315jfk3J7b067A</span>
          </el-form-item>
          <el-form-item class="field" label="运单号:">
            <span class="value">1000203045（顺丰）</span>
          </el-form-item>
          <el-form-item class="field" label="工单日期:">
            <span class="value">2019-07-12</span>
          </el-form-item>
          <el-form-item class="field" label="维修点:">
            <span class="value">天任顺华</span>
          </el-form-item>
          <el-form-item class="field" label="工单状态:">
            <span class="value">待收货</span>
          </el-form-item>
          <el-form-item class="field" label="官网账号:">
            <span class="value">WangDachui</span>
          </el-form-item>
          <el-form-item class="field" label="客户姓名:">
            <span class="value">王大锤</span>
          </el-form-item>
          <el-form-item class="field" label="电话:">
            <span class="value">13443448989</span>
          </el-form-item>
          <el-form-item class="field" label="国家:">
            <span class="value">中国</span>
          </el-form-item>
          <el-form-item class="field" label="省份:">
            <span class="value">广东省</span>
          </el-form-item>
          <el-form-item class="field" label="城市:">
            <span class="value">深圳市</span>
          </el-form-item>
          <el-form-item class="field" label="详细地址:">
            <span class="value">某某街道</span>
          </el-form-item>
          <el-form-item class="field" label="邮政编码:">
            <span class="value">741000</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="bill-body">
        <el-table height="460" :stripe="true" :data="billLines" :row-class-name="billLineClass">
          <el-table-column type="expand">
            <template slot-scope="billLine">
              <el-table :border="true" :data="billLine.row.details">
                <el-table-column prop="sn" label="SN" width="200px">
                  <template slot-scope="detail">
                    <el-link href="./product-query-detail.html" target="_blank">{{detail.row.sn}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="maintainStatus" label="保修状态" width="80px" align="center"></el-table-column>
                <el-table-column prop="secondHand" label="二手机" width="70px" align="center"></el-table-column>
                <el-table-column prop="maintainess" label="二返" width="80px" align="center"></el-table-column>
                <el-table-column label="收货信息" width="80px">
                  <template slot-scope="detail">
                    <el-link href="./accept-bill-info.html" target="_blank">{{detail.row.acceptBill.info}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column label="故障判定">
                  <template slot-scope="detail">
                    <el-link href="./check-bill-info.html" target="_blank">{{detail.row.checkBill.info}}</el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="dealMode" label="处理方式" width="100px" align="center"></el-table-column>
                <el-table-column prop="payed" label="付款状态" width="80px" align="center"></el-table-column>
                <el-table-column prop="returned" label="是否退回" width="80px" align="center"></el-table-column>
                <el-table-column prop="kfRemark" label="客服备注"></el-table-column>
                <el-table-column label="发货信息" width="80px" align="center">
                  <template slot-scope="detail">
                    <el-link v-if="detail.row.deliverBill" href="./deliver-bill-info.html" target="_blank">已发货</el-link>
                    <span v-else>未发货</span></template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="deviceType" label="设备类型" width="120px" align="center"></el-table-column>
          <el-table-column prop="productType.code" label="销售编码" width="140px" align="center"></el-table-column>
          <el-table-column prop="productType.name" label="产品名称"></el-table-column>
          <el-table-column prop="lineCount" label="工单数量" width="100px" align="center"></el-table-column>
          <el-table-column prop="acceptCount" label="已收数量" width="100px" align="center"></el-table-column>
          <el-table-column prop="deliverCount" label="已发数量" width="100px" align="center"></el-table-column>
          <el-table-column prop="scrapCount" label="报废数量" width="100px" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="bill-foot">
        <el-form class="bill-foot-form" label-position="right" label-width="120px" :inline="true">
          <el-form-item class="field" label="单据行数:">
            <span class="value">2</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import Hamburger from '@/components/Hamburger'

  export default {
    data() {
      return {
        dateRange: "",
        code: "",
        show: false,
        billLines: [{
          deviceType: '整机',
          productType: {code: '101801112', name: '蚂蚁矿机S9 SE 16T EMC'},
          lineCount: 5,
          acceptCount: 5,
          deliverCount: 0,
          scrapCount: 0,
          details: [{
            sn: 'CHDZ19DAGJAJI0100',
            maintainStatus: 'DOA',
            secondHand: '否',
            maintainess: '否',
            acceptBill: {info: '正常收货'},
            checkBill: {info: '控制板不良'},
            dealMode: 'DOA换新机',
            payed: '无需付款',
            returned: '否',
            kfRemark: '',
            deliverBill: {}
          }, {
            sn: 'CHDZ19DAGJAJI0100',
            maintainStatus: '保内',
            secondHand: '否',
            maintainess: '否',
            acceptBill: {info: '正常收货'},
            checkBill: {info: '6板无算力'},
            dealMode: '维修',
            payed: '无需付款',
            returned: '否',
            kfRemark: '',
            deliverBill: null
          }, {
            sn: 'CHDZ19DAGJAJI0100',
            maintainStatus: '保外',
            secondHand: '否',
            maintainess: '二返',
            acceptBill: {info: '正常收货'},
            checkBill: {info: '9板无算力'},
            dealMode: '维修',
            payed: '无需付款',
            returned: '否',
            kfRemark: '',
            deliverBill: null
          }, {
            sn: 'CHDZ19DAGJAJI0100',
            maintainStatus: '保外',
            secondHand: '否',
            maintainess: '否',
            acceptBill: {info: '正常收货'},
            checkBill: {info: '6板无算力'},
            dealMode: '维修',
            payed: '已付款',
            returned: '否',
            kfRemark: '',
            deliverBill: null
          }, {
            sn: 'CHDZ19DAGJAJI0100',
            maintainStatus: '保外',
            secondHand: '否',
            maintainess: '否',
            acceptBill: {info: '烧板报废'},
            checkBill: {info: '烧板报废'},
            dealMode: '退回',
            payed: '未付款',
            returned: '是',
            kfRemark: '',
            deliverBill: null
          }]
        }, {
          deviceType: '配件',
          productType: {code: '101801112', name: '风扇'},
          lineCount: 3,
          acceptCount: 3,
          deliverCount: 0,
          scrapCount: 0,
          details: []
        }]
      };
    },
    computed: {
      ...mapGetters(["sidebar"])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
      billLineClass: function (e) {
        if (!e.row.details || !e.row.details.length) {
          return 'none-expand';
        }
        return '';
      },
    },
    components: {
      Hamburger
    }
  };
</script>

<style lang="scss" scoped>
</style>
