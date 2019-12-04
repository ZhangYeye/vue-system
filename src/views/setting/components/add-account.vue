<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="80px"
      >
        <el-form-item class="field" :label="$t('setting.hostSite')+':'">
          <el-select v-model="account.sitid" style="margin-bottom: 10px" class="input">
            <el-option v-for="site in siteList.siteList" :key="site.sitid" :label="site.name"
                       :value="site.sitid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.account')+':'">
          <el-input class="input"
                    v-model="account.aname"
                    :placeholder="$t('table.account')"></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.password')+':'" style="position: relative">
          <el-input
            show-password
            class="input"
            v-model="account.apass"
            :placeholder="$t('table.password')"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input
            type="textarea"
            class="remark"
            v-model="account.remark"
            rows="4"
            :placeholder="$t('table.remark')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="divider"></div>
      <div class="check-group">
        <div class="group-head">
          <span>{{$t('setting.roleSel')}}</span>
        </div>
        <div class="no-data" v-if="showTip">{{$t('setting.noDate')}}</div>
        <el-checkbox-group
          v-model="rolids"
          v-if="!showTip"
        >
          <el-checkbox
            v-for="role in roleList.roleList"
            :key="role.rolid"
            :label="role.rolid">{{role.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="b-buttons">
      <el-button
        class="b-button"
        type="primary"
        @click="onSubmit()"
      >{{$t('btn.submit')}}
      </el-button>
      <el-button class="b-button" @click="cancel()">{{$t('btn.cancel')}}</el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "add-site",
    data() {
      return {
        account: {
          accid: '',
          sitid: '',
          aname: '',
          apass: '',
          secreted: '',
          enabled: 1,
          remark: ''
        },
        rolids: [],
        passwordType: "password",
        type: '',
        showTip: false
      }
    },
    computed: {
      ...mapGetters(["siteList", "roleList"])
    },
    mounted() {
      const param = {start: 0, limit: 20, orgid: ''};
      this.$store.dispatch("systemSetting/getSiteList", param)
        .then(() => {
          this.account.sitid = this.siteList.siteList[0].sitid
        })
      const param1 = {start: 0, limit: 20, sysid: ''};
      this.$store.dispatch("systemSetting/getRoleList", param1)
        .then(() => {
          if (this.roleList.roleList.length === 0) {
            this.showTip = true
          }
        })
    },
    methods: {
      onSubmit() {
        let account = this.account
        let rolids = this.rolids
        this.$store.dispatch("systemSetting/saveAccount", {account, rolids});
      },
      cancel() {
        history.back(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
  @import "~@/styles/variables.scss";

  .source-input {
    .el-form {
      width: 37%;
      .el-form-item {
        margin-bottom: 0;
      }
      .input {
        width: 50%;
        margin-bottom: 10px;
        display: block;
      }
      .remark {
        width: 100%;
      }
    }
    .divider {
      position: absolute;
      top: 0;
      bottom: 45px;
      left: 42%;
      border-left: solid 2px #EBEEF5;
      background: #EBEEF5;
    }
    .check-group {
      background: #fff;
      vertical-align: middle;
      width: 53%;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 47%;
      bottom: 45px;
      overflow: hidden;
      .group-head {
        line-height: 40px;
        color: #606266;
        border-bottom: solid 1px #EBEEF5;
        font-size: 14px;
        font-weight: 700;
        box-sizing: border-box;
        padding-left: 10px
      }
      .no-data {
        position: absolute;
        top: 40px;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 10%;
      }
      .el-checkbox-group {
        position: absolute;
        top: 40px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        &:hover {
          overflow-y: auto;
        }
        .el-checkbox {
          margin: 0 100% 0 25px;
          line-height: 40px;
          padding-left: 25px;
        }
      }
    }
  }

  .b-buttons {
    width: 35%;
    padding-top: 20px;
  }

  .error {
    position: absolute;
    top: 10px;
    left: 36%;
    color: #ff4949;
    font-size: 12px;
  }

</style>
