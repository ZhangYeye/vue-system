<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="80px"
        style="width:37%"
      >
        <el-form-item class="field" :label="$t('setting.hostSite')+':'">
          <el-select v-model="sitid" style="margin-bottom: 10px" class="input">
            <el-option v-for="site in siteList.siteList" :key="site.sitid" :label="site.name"
                       :value="site.sitid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.account')+':'">
          <el-input class="input"
                    v-model="detailAccount.account.aname"
                    :placeholder="$t('table.account')"></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.password')+':'" style="position: relative">
          <el-input
            show-password
            class="input"
            v-model="apass"
            :placeholder="$t('table.password')"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input
            type="textarea"
            class="remark"
            v-model="detailAccount.account.remark"
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
          v-model="role"
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
        nameMsg: '',
        passwordMsg: '',
        showTip: false,
        sitid: '',
        detailAccount: {
          account: {
            aname: '',
            remark: ''
          },
        },
        role: '',
        apass: ''
      }
    },
    computed: {
      ...mapGetters(["siteList", "roleList", "accountDetail"])
    },
    mounted() {
      let id = localStorage.getItem("id");
      let sitid = localStorage.getItem("parentId");
      this.sitid = sitid
      const param = {start: 0, limit: 20, orgid: ''};
      this.$store.dispatch("systemSetting/getSiteList", param)
      this.$store.dispatch("systemSetting/getAccountDetail", id)
        .then(() => {
          this.detailAccount = this.accountDetail
        })
        .then(() => {
          this.$store.dispatch("systemSetting/getRoleList", param1)
            .then(() => {
              if (this.roleList.roleList.length === 0) {
                this.showTip = true
              } else {
                let list = this.accountDetail.roles
                let rol = []
                for (let i = 0; i < list.length; i++) {
                  rol.push(list[i].rolid)
                }
                this.role = rol
              }
            })
        })
      const param1 = {start: 0, limit: 20, sysid: ''};

    },
    methods: {
      nameRules(value) {
        if (value.length === 0) {
          this.nameMsg = 'The account can not be empty'
        } else {
          this.nameMsg = ''
        }
      },
      passwordRules(value) {
        if (value === '') {
          this.passwordMsg = 'The password can not be empty'
        } else {
          this.passwordMsg = ''
        }
      },
      onSubmit() {
        const {account} = this.detailAccount;
        account.apass = this.apass;
        let rolids = this.role
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
