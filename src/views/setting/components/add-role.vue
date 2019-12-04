<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="80px"
      >
        <el-form-item class="field" :label="$t('setting.hostSys')+':'">
          <el-select v-model="role.sysid" style="margin-bottom: 10px" class="input">
            <el-option v-for="system in systemList.systemList" :key="system.sysid" :label="system.name"
                       :value="system.sysid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="field" :label="$t('setting.roleCode')+':'">
          <el-input class="input"
                    v-model="role.code"
                    :placeholder="$t('setting.roleCode')"></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.name')+':'">
          <el-input
            class="input"
            v-model="roleLangs[0].name"
            placeholder="中文"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" label="   ">
          <el-input
            class="input"
            v-model="roleLangs[1].name"
            placeholder="English"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input
            type="textarea"
            class="remark"
            v-model="roleLangs[0].remark"
            rows="4"
            placeholder="中文"
          ></el-input>
          <el-input
            type="textarea"
            class="remark"
            v-model="roleLangs[1].remark"
            rows="4"
            placeholder="English"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="divider"></div>
      <div class="check-group">
        <div class="group-head">
          <span>{{$t('setting.pvgSel')}}</span>
        </div>
        <div class="no-data" v-if="showTip">{{$t('setting.noDate')}}</div>
        <el-tree
          :data="pvgList"
          :props="defaultProps"
          show-checkbox
          ref="tree"
          node-key="pvgid"
          :highlight-current="true"
          @check="handleCheckChange"
          default-expand-all>
        </el-tree>
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
        role: {
          rolid: '',
          sysid: '',
          code: '',
          enabled: 1,
        },
        roleLangs: [{
          lang: "zh",
          name: '',
          remark: ''
        }, {
          lang: "en",
          name: '',
          remark: ''
        }],
        pvgids: [],
        pvgList: [],
        defaultProps: {
          children: "children",
          label: "name",
        },
        type: '',
        showTip: false
      }
    },
    computed: {
      ...mapGetters(["systemList", "privilegeList"])
    },
    mounted() {
      this.$store.dispatch("user/getSystemList")
        .then(() => {
          this.role.sysid = this.systemList.systemList[0].sysid
        })
      this.$store.dispatch("systemSetting/getPrivilegeList")
        .then(() => {
          if (this.privilegeList.privilegeList.length === 0) {
            this.showTip = true
          } else {
            let list = this.privilegeList.privilegeList;
            let datas = [];
            let data = [];
            let items = [];
            let item = [];
            for (let i in list) {
              if (list[i].parent === '') {
                datas.push(list[i]);
              } else if (list[i].code.length === 4) {
                data.push(list[i]);
              } else if (list[i].code.length === 6) {
                items.push(list[i]);
              } else if (list[i].code.length === 8) {
                item.push(list[i]);
              }
            }
            for (let k = 0; k < items.length; k++) {
              items[k].children = [];
              for (let j = 0; j < item.length; j++) {
                if (items[k].pvgid === item[j].parent) {
                  items[k].children.push(item[j])
                }
              }
            }
            for (let i = 0; i < data.length; i++) {
              data[i].children = [];
              for (let j = 0; j < items.length; j++) {
                if (data[i].pvgid === items[j].parent) {
                  data[i].children.push(items[j])
                }
              }
            }
            for (let i = 0; i < datas.length; i++) {
              datas[i].children = [];
              for (let j = 0; j < data.length; j++) {
                if (datas[i].pvgid === data[j].parent) {
                  datas[i].children.push(data[j])
                }
              }
            }
            this.pvgList = datas
          }
        })
    },
    methods: {
      handleCheckChange(data, checkedNodes) {
        this.pvgids = checkedNodes.checkedNodes
      },
      onSubmit() {
        let role = this.role
        let roleLangs = this.roleLangs
        let ids = this.pvgids
        let pvgids = []
        for (let i in ids) {
          pvgids.push(ids[i].pvgid)
        }
        this.$store.dispatch("systemSetting/saveRole", {role, roleLangs, pvgids});
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
        margin-bottom: 10px;
      }
    }
    .divider {
      position: absolute;
      top: 0;
      bottom: 45px;
      left: 42%;
      border-left: solid 1px #EBEEF5;
      background: #EBEEF5;
    }
    .check-group {
      background: #fff;
      vertical-align: middle;
      width: 53%;
      //height: 100%;
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
      .el-tree {
        position: absolute;
        top: 40px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        &:hover {
          overflow-y: auto;
        }
        .el-tree-node {
          margin: 0 100% 0 25px;
          line-height: 40px;
          padding-left: 25px;
        }
      }
    }
  }

  .b-buttons {
    width: 35%;
  }

  .error {
    position: absolute;
    top: 10px;
    left: 36%;
    color: #ff4949;
    font-size: 12px;
  }

</style>
