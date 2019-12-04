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
        <el-breadcrumb-item>{{$t('setting.systemSetting')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('setting.accountManagement')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="filter">
      <div class="field">
        <el-select v-model="sitid" @change="accountBySite(sitid)">
          <el-option key="" :label="$t('setting.allSite')" value=""></el-option>
          <el-option v-for="site in siteList.siteList" :key="site.sitid" :label="site.name"
                     :value="site.sitid"></el-option>
        </el-select>
      </div>
      <div class="field">
        <router-link to="add" @click.native.prevent="addList('account')">
          <el-button type="primary" icon="el-icon-plus">{{ $t('btn.addTo') }}</el-button>
        </router-link>
      </div>
    </div>
    <div class="data-list">
      <el-table :stripe="true" :data="accountList.accountList">
        <el-table-column prop="aname" :label="$t('table.account')" align="center" width="300"></el-table-column>
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
              @click="switchStatus(scope.$index, accountList.accountList)"
            >{{ $t('btn.disable') }}
            </el-button>
            <el-button
              size="small"
              v-else="scope.row.enabled === 0"
              @click="switchStatus(scope.$index, accountList.accountList)"
            >{{ $t('btn.enable') }}
            </el-button>
            <router-link to="edit" @click.native.prevent="editList(scope.row.accid,'account',scope.row.sitid)">
              <el-button size="small">{{ $t('btn.update') }}</el-button>
            </router-link>
            <el-button
              size="small"
              type="danger"
              @click.native.prevent="remove(scope.$index, accountList.accountList)"
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
  import {mapGetters} from "vuex";
  import Hamburger from '@/components/Hamburger'
  import pagination from '@/components/Pagination'
  export default {
    name: "organization-setting",
    data() {
      return {
        total: 0,
        orgid: '',
        sitid: '',
        listLoading: true,
        listQuery:{
          page: 1,
          limit: 2
        }
      };
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters(["sidebar", "siteList", "accountList"]),
    },
    mounted() {
      const param2 = {start: 0, limit: 20, orgid: ''};
      this.$store.dispatch("systemSetting/getSiteList", param2);
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
        const param = {start:page,limit:limit,sitid:this.sitid}
        this.$store.dispatch("systemSetting/getAccountList", param)
          .then(() => {
            this.listLoading = false
            this.total = this.accountList.total
          });
      },
      remove(index, rows) {
        this.$alert("确定删除这条站点管理信息", "标题名称", {
          confirmButtonText: "确定",
          callback: action => {
            let accid = rows[index].accid;
            rows.splice(index, 1);
            this.$store.dispatch("systemSetting/deleteAccount", accid);
          }
        });
      },

      switchStatus(index, rows) {
        let accid = rows[index].accid;
        if (rows[index].enabled === 0) {
          rows[index].enabled = 1;
          rows[index].enabled = 1;
        } else if (rows[index].enabled === 1) {
          rows[index].enabled = 0;
          rows[index].enabled = 0;
        }
        let enabled = rows[index].enabled;
        this.$store.dispatch("systemSetting/enableAccount", {accid, enabled});
      },

      accountBySite(val) {
        let page = this.listQuery.page -1
        let limit = this.listQuery.limit
        page = page * limit
        const param = {start:page,limit:limit,sitid:val}
        this.$store.dispatch("systemSetting/getAccountList", param)
          .then(() => {
            this.listLoading = false
            this.total = this.accountList.total
          });
      },

      editList(accid, type, sitid) {
        localStorage.setItem("id", accid);
        localStorage.setItem("parentId", sitid);
        localStorage.setItem("type", type);
      },
      addList(type) {
        localStorage.setItem("type", type);
      },
      currentPage(page) {
        console.log(page)
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
    width: 100%;
    float: right;
    padding-right: 80px;
    display: flex;
    justify-content: space-between;
    .field {
      display: flex;
      .el-select {
        width: 217px !important;
        margin-right: 10px;
      }
      .el-input {
        margin-right: 10px;
      }
    }
  }

  .el-select-dropdown__item.selected {
    color: #409EFF;
    font-weight: 700;
  }

  .err {
    color: $error;
  }

  .act {
    color: $success;
  }
</style>
