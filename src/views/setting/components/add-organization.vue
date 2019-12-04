<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="80px"
        style="width:45%"
      >
        <el-form-item class="field" :label="$t('setting.orgCode')+':'">
          <el-input class="input"
                    v-model="org.code"
                    :placeholder="$t('setting.orgCode')"></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.name')+':'">
          <el-input
            class="input"
            v-model="orgLangs[0].name"
            placeholder="中文"
          ></el-input>
          <span class="error"></span>
        </el-form-item>
        <el-form-item class="field" label="   ">
          <el-input
            class="input"
            v-model="orgLangs[1].name"
            placeholder="English"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input
            type="textarea"
            class="remark"
            v-model="orgLangs[0].remark"
            style="width:100%;margin-bottom: 10px"
            rows="4"
            placeholder="中文"
          ></el-input>
          <el-input
            type="textarea"
            class="remark"
            v-model="orgLangs[1].remark"
            style="margin-bottom: 10px"
            rows="4"
            placeholder="English"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-input">
      <el-form label-width="80px">
        <div class="b-buttons">
          <el-button
            class="b-button"
            type="primary"
            @click="onSubmit()"
          >{{$t('btn.submit')}}
          </el-button>
          <el-button class="b-button" @click="cancel()">{{$t('btn.cancel')}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "add-organization",
    data() {
      return {
        org: {
          orgid: "",
          code: "",
          orgType: "",
          enabled: 1
        },
        orgLangs: [
          {
            lang: "zh",
            name: '',
            remark: ''
          },
          {
            lang: "en",
            name: '',
            remark: ''
          }
        ],
        codeMsg: '',
        type: '',
        orgid: ''
      }
    },
    methods: {
      onSubmit() {
        let org = this.org;
        let orgLangs = this.orgLangs;
        this.$store.dispatch("systemSetting/saveOrg", {org, orgLangs});
      },
      cancel() {
        history.back(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
  @import "~@/styles/edit1.scss";
</style>
