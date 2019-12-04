<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="80px"
        style="width:45%"
      >
        <el-form-item class="field" :label="$t('setting.hostOrg')+':'">
          <el-select v-model="site.orgid" style="margin-bottom: 10px" class="input">
            <el-option v-for="org in orgList.orgList" :key="org.orgid" :label="org.name"
                       :value="org.orgid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="field" :label="$t('setting.siteCode')+':'">
          <el-input class="input"
                    v-model="site.code"
                    :placeholder="$t('setting.siteCode')"></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.name')+':'">
          <el-input
            class="input"
            v-model="siteLangs[0].name"
            placeholder="中文"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" label="   ">
          <el-input
            class="input"
            v-model="siteLangs[1].name"
            placeholder="English"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input
            type="textarea"
            class="remark"
            v-model="siteLangs[0].remark"
            style="width:100%;margin-bottom: 10px"
            rows="4"
            placeholder="中文"
          ></el-input>
          <el-input
            type="textarea"
            class="remark"
            v-model="siteLangs[1].remark"
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
  import {mapGetters} from "vuex";

  export default {
    name: "add-site",
    data() {
      return {
        site: {
          sitid: '',
          orgid: '',
          code: '',
          siteType: 1,
          enabled: 1
        },
        siteLangs: [
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
        type: '',
        orgid: '',
        org: ''
      }
    },
    computed: {
      ...mapGetters(["orgList"])
    },
    mounted() {
      const param = {start: 0, limit: 20};
      this.$store.dispatch("systemSetting/getOrgList", param)
        .then(() => {
          this.site.orgid = this.orgList.orgList[0].orgid
        })
    },
    methods: {
      onSubmit() {
        let site = this.site
        let siteLangs = this.siteLangs
        this.$store.dispatch("systemSetting/saveSite", {site, siteLangs});
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
