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
        <el-breadcrumb-item>{{$t('basicData.basicData')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('basicData.logistics')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="filter">
      <router-link to="add" @click.native.prevent="addList('ship')">
        <el-button type="primary" icon="el-icon-plus">{{ $t('btn.addTo') }}</el-button>
      </router-link>
    </div>
    <div class="data-list">
      <el-table :stripe="true" :data="shipList.shipmentList">
        <el-table-column prop="code" :label="$t('basicData.logisticsCode')" align="center"
                         width="180"></el-table-column>
        <el-table-column prop="name" :label="$t('table.name')" align="center" width="350"></el-table-column>
        <el-table-column prop="remark" :label="$t('table.remark')" align="center"></el-table-column>
        <el-table-column prop="enabled" :label="$t('table.state')" align="center" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.enabled === 0" class="err">{{ $t('btn.disable') }}</span>
            <span v-else="scope.row.enabled === 1" class="act">{{ $t('btn.enable') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enabled" :label="$t('table.operate')" align="center" width="240">
          <template slot-scope="scope">
            <el-button
              size="small"
              v-if="scope.row.enabled === 1"
              @click="switchStatus(scope.$index, shipList.shipmentList)"
            >{{ $t('btn.disable') }}
            </el-button>
            <el-button
              size="small"
              v-else="scope.row.enabled === 0"
              @click="switchStatus(scope.$index, shipList.shipmentList)"
            >{{ $t('btn.enable') }}
            </el-button>
            <router-link to="edit" @click.native.prevent="editList(scope.row.shpid,'ship')">
              <el-button size="small">{{ $t('btn.update') }}</el-button>
            </router-link>
            <el-button
              size="small"
              type="danger"
              @click.native.prevent="remove(scope.$index, shipList.shipmentList)"
            >{{$t('btn.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
  </div>
</template>

<script>
  import Hamburger from '@/components/Hamburger'
  import pagination from '@/components/Pagination'
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        code: "",
        total: "",
        listLoading: true,
        listQuery:{
          page: 1,
          limit: 2
        }
      };
    },
    created(){
      this.getList()
    },
    computed: {
      ...mapGetters(["sidebar", "shipList"])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
      getList() {
        this.listLoading = true
        let page = this.listQuery.page -1
        let limit = this.listQuery.limit
        page = page * limit
        const param = {start:page,limit:limit}
        this.total = this.shipList.total
        /*this.$store.dispatch("basicData/getShipList", param)
          .then(() => {
            this.listLoading = false
            this.total = this.shipList.total
          });*/
      },
      remove(index, rows) {
        this.$alert("确定删除这条物流商管理信息", "标题名称", {
          confirmButtonText: "确定",
          callback: action => {
            let shpid = rows[index].shpid;
            rows.splice(index, 1);
            this.$store.dispatch("basicData/deleteShip", shpid);
          }
        });
      },
      switchStatus(index, rows) {
        let shpid = rows[index].shpid;
        if (rows[index].enabled === 0) {
          rows[index].enabled = 1;
          rows[index].enabled = 1;
        } else if (rows[index].enabled === 1) {
          rows[index].enabled = 0;
          rows[index].enabled = 0;
        }
        let enabled = rows[index].enabled;
        this.$store.dispatch("basicData/enableShip", {shpid, enabled});
      },
      editList(orgid, type) {
        localStorage.setItem("id", orgid);
        localStorage.setItem("type", type);
      },
      addList(type) {
        localStorage.setItem("type", type);
      }
    },
    components: {
      Hamburger,
      pagination
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common.scss";
  @import "@/styles/variables.scss";

  .filter {
    float: right;
    padding-right: 80px;
  }

  .err {
    color: $error;
  }

  .act {
    color: $success;
  }
</style>
