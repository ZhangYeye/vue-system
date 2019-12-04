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
        <el-breadcrumb-item>{{$t('workList.workManage')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="list-container">
      <div class="filter">
        <div class="field">
          <el-date-picker
            type="daterange"
            v-model="dateRange"
            range-separator="至"
            :start-placeholder="$t('workList.startTime')"
            :end-placeholder="$t('workList.endTime')"
            @change="formatTime"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div class="field">
          <el-input v-model="code" :placeholder="$t('workList.workOrder')" clearable></el-input>
        </div>
        <div class="search-button">
          <el-button
            type="primary"
            icon="el-icon-search"
            class="search"
            @click="search"
          >{{$t('btn.search')}}
          </el-button>
        </div>
      </div>
      <div class="data-list">
        <el-table :stripe="true" :data="bills">
          <el-table-column type="expand" width="30">
            <template slot-scope="scope">
              <el-table
                :stripe="true"
                :data="scope.row.billLines"
                :row-class-name="billLineClass"
              >
                <el-table-column type="expand" width="30">
                  <template slot-scope="scope">
                    <el-table :border="true" :data="scope.row.items">
                      <el-table-column prop="mtlid" label="SN" width="180"></el-table-column>
                      <el-table-column
                        prop="receiveStatus"
                        :label="$t('workList.acceptInfo')"
                        width="80"
                      >
                        <template slot-scope="scope">
                          <span v-if="scope.row.receiveStatus === 0">{{$t('workList.normalAccept')}}</span>
                          <span
                            v-else="scope.row.receiveStatus === 1"
                          >{{$t('workList.abnormalAccept')}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="receiveTime" label="收货时间" align="center" width="100"></el-table-column>
                      <el-table-column prop="warranty" label="保修状态" width="80" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.warranty === 1">DOA</span>
                          <span v-else="scope.row.warranty ===2">保内</span>
                          <span v-else="scope.row.warranty === 4">保外</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="secodnHand" label="二手机" width="70" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.secodnHand === 0">是</span>
                          <span v-else="scope.row.secodnHand ===1">否</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="maintains" label="返修次数" width="80" align="center"></el-table-column>
                      <el-table-column prop="continues" label="二返" width="80" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.continues === 0">二返</span>
                          <span v-else="scope.row.continues ===1">三返</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="checkStatus" label="初测状态" width="80" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.checkStatus === 0">未判定故障</span>
                          <span v-else="scope.row.checkStatus ===1">已判定故障</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="checkTime" label="初测时间" width="100" align="center"></el-table-column>
                      <el-table-column prop="checkCode" label="初测不良代码" width="120" align="center"></el-table-column>
                      <el-table-column prop="mixbound" label="是否混板" width="80" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.mixbound === 0">否</span>
                          <span v-else="scope.row.mixbound ===1">是</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="maintainess" label="是否维修" width="100" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.maintainess === 0">不修</span>
                          <span v-else="scope.row.maintainess ===1">维修</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="returness" label="是否退回" width="80" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.returness === 0">不退回</span>
                          <span v-else="scope.row.returness ===1">原机退回</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="priority" label="是否优先发货" width="120" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.priority === 0">否</span>
                          <span v-else="scope.row.priority ===1">是</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="shouldPay" label="应付金额" width="80" align="center"></el-table-column>
                      <el-table-column prop="realPay" label="实付金额" width="80" align="center"></el-table-column>
                      <el-table-column prop="payTime" label="付款时间" width="100" align="center"></el-table-column>
                      <el-table-column prop="exchange" label="是否换货" width="80" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.exchange === 0">否</span>
                          <span v-else="scope.row.exchange ===1">是</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="deliverStatus" label="发货状态" width="120" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.deliverStatus === 0">未发货</span>
                          <span v-else="scope.row.deliverStatus ===1">已发货</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="deliverTime" label="发货时间" width="120"></el-table-column>
                      <el-table-column prop="kf_remark" label="客服备注"></el-table-column>
                      <el-table-column prop="deliver_info" label="发货信息" align="center"></el-table-column>
                      <el-table-column fixed="right" label="更换操作" width="250" align="center">
                        <template slot-scope="scope">
                          <el-button type="text" size="small" @click="selectProduct">更换发货产品</el-button>
                          <el-button type="text" size="small" @click="selectHouse">更换发货仓</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column prop="issued" width="35" align="center">
                  <template slot-scope="scope" width="35">
                    <span v-if="scope.row.issued === 1">
                      <i class="el-icon-warning"></i>
                    </span>
                    <span v-else></span>
                  </template>
                </el-table-column>
                <el-table-column prop="deviceType" label="设备类型" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.deviceType === 1">整机</span>
                    <span v-else="scope.row.deviceType === 2">配件</span>
                  </template>
                </el-table-column>
                <el-table-column prop="mtbid" label="销售编码" align="center"></el-table-column>
                <el-table-column prop="lineCount" label="工单数量" align="center" width="100"></el-table-column>
                <el-table-column prop="receiveCount" label="已收数量" align="center" width="100"></el-table-column>
                <el-table-column prop="deliverCount" label="已发数量" align="center" width="100"></el-table-column>
                <el-table-column prop="scrapCount" label="报废数量" align="center" width="100"></el-table-column>
                <el-table-column prop="discardCount" label="丢弃数量" align="center" width="100"></el-table-column>
                <el-table-column prop="issued" label="待处理" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.issued === 0">是</span>
                    <span v-if="scope.row.issued === 1">否</span>
                  </template>
                </el-table-column>
                <el-table-column prop="issueCode" label="待处理问题代码" align="center"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="issued" align="center" width="35">
            <template slot-scope="scope">
              <span v-if="scope.row.issued === 1">
                <i class="el-icon-warning"></i>
              </span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column prop="oBillId" label="工单号" align="center">
            <template slot-scope="scope">
              <router-link class="routerLink" to="bill-info">{{scope.row.oBillId}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="billType" label="工单类型" align="center" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.billType === 1">普通</span>
              <span v-if="scope.row.billType === 2">特殊</span>
            </template>
          </el-table-column>
          <el-table-column prop="sendBillNo" label="运单号" align="center"></el-table-column>
          <el-table-column prop="sendTranser" label="物流商" align="center" width="80"></el-table-column>
          <el-table-column prop="site" label="维修点" align="center" width="100"></el-table-column>
          <el-table-column prop="sendCount" label="包裹数量" align="center" width="80"></el-table-column>
          <el-table-column prop="billStatus" label="工单状态" align="center" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.billStatus === 0">待收货</span>
              <span v-if="scope.row.billStatus === 1">已收货</span>
              <span v-if="scope.row.billStatus === 2">代发货</span>
              <span v-if="scope.row.billStatus === 3">已发货</span>
            </template>
          </el-table-column>
          <el-table-column prop="payment" label="快递付费方式" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.payment === 1">寄付</span>
              <span v-if="scope.row.payment === 2">到付</span>
            </template>
          </el-table-column>
          <el-table-column prop="account" label="客户姓名" align="center" width="100"></el-table-column>
          <el-table-column prop="sendTranser" label="返回物流商" align="center" width="100"></el-table-column>
          <el-table-column prop="issued" label="待处理" align="center" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.issued === 1">是</span>
              <span v-if="scope.row.issued === 2">否</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="客户备注" align="center"></el-table-column>
          <el-table-column prop="issueCode" label="待处理包裹问题代码" align="center"></el-table-column>
        </el-table>
      </div>
      <el-dialog title="更换发货产品" :visible.sync="productList">
        <el-table :scripe="true" :data="product" @selection-change="handle">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="40"></el-table-column>
          <el-table-column property="code" label="销售编码" width="150"></el-table-column>
          <el-table-column property="name" label="产品名称" width="200"></el-table-column>
          <el-table-column property="disc" label="产品描述"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">{{ $t('btn.cancel') }}</el-button>
          <el-button type="primary" @click="updateProduct()">{{ $t('btn.confirm') }}</el-button>
        </div>
      </el-dialog>
      <el-dialog title="更换发货仓" :visible.sync="houseList">
        <el-table :scripe="true" :data="product" @selection-change="handle">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="40"></el-table-column>
          <el-table-column property="code" label="货仓编码" width="150"></el-table-column>
          <el-table-column property="name" label="货仓名称" width="200"></el-table-column>
          <el-table-column property="disc" label="货仓描述"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">{{ $t('btn.cancel') }}</el-button>
          <el-button type="primary" @click="updateHouse()">{{ $t('btn.confirm') }}</el-button>
        </div>
      </el-dialog>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
      />
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Hamburger from '@/components/Hamburger'
  import LangSelect from "@/components/LangSelect";
  import Pagination from "@/components/Pagination";

  export default {
    name: "index",
    data() {
      return {
        dateRange: "",
        code: "",
        list: null,
        total: 2,
        listLoading: true,
        listQuery: {
          page: 10,
          limit: 20
        },
        product: [
          {
            code: "101801112 蚂蚁矿机S9 SE 16T EMC",
            name: "蚂蚁矿机S9（13T）",
            disc: "撒赖扩大减肥法局面失控"
          },
          {
            code: "101801112 蚂蚁矿机S9 SE 16T EMC",
            name: "蚂蚁矿机S9（13T）",
            disc: "撒赖扩大减肥法局面失控"
          },
          {
            code: "101801112 蚂蚁矿机S9 SE 16T EMC",
            name: "蚂蚁矿机S9（13T）",
            disc: "撒赖扩大减肥法局面失控"
          }
        ],
        productList: false,
        houseList: false
      };
    },
    computed: {
      ...mapGetters(["bills", "sidebar"])
    },
    mounted() {
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
      formatTime(time) {
        this.dateRange = time;
        console.log(this.dateRange);
      },
      selectProduct() {
        this.productList = true;
      },
      selectHouse() {
        this.houseList = true;
      },
      handle(val) {
        this.multipleSelection = val;
      },
      updateProduct() {
      },
      updateHouse() {
      },
      cancel() {
        if (this.productList) {
          this.productList = false;
        } else {
          this.houseList = false;
        }
      },
      search() {
      }
    },
    components: {
      Pagination,
      LangSelect,
      Hamburger
    }
  };
</script>
<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
  @import "~@/styles/common.scss";
</style>
