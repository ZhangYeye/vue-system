<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="80px"
        style="width:45%"
      >
        <el-form-item class="field" :label="$t('setting.hostOrg')+':'">
          <el-select v-model="orgid" style="margin-bottom: 10px" class="input">
            <el-option v-for="org in orgList.orgList" :key="org.orgid" :label="org.name" :value="org.orgid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="field" :label="$t('setting.siteCode')+':'" prop="code">
          <el-input class="input"
                    @blur="codeRules(detailSite.site.code)"
                    v-model="detailSite.site.code"
                    placeholder="请输入站点代码"
                    name="code"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="item.lang === 'zh' ? '' : $t('table.name')"
                      v-for="(item,key) in detailSite.siteLangs" :key="key">
          <el-input
            class="input"
            v-model="item.name"
            :placeholder="item.lang === 'zh' ? '中文' : 'English'"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input v-for="(item,key) in detailSite.siteLangs"
                    :key="key"
                    type="textarea"
                    class="remark"
                    v-model="item.remark"
                    style="margin-bottom: 10px"
                    rows="4"
                    :placeholder="item.lang === 'zh' ? '中文' : 'English'"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-input">
      <div class="b-buttons">
        <el-button class="b-button" type="primary" @click="onSubmit">{{$t('btn.submit')}}</el-button>
        <el-button class="b-button" @click="cancel()">{{$t('btn.cancel')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "edit-site",
    data() {
      return {
        type: '',
        detailSite: {
          site: {
            code: ''
          }
        },
        orgid: ''
      }
    },
    computed: {
      ...mapGetters(["siteDetail", "orgList"]),
    },
    mounted() {
      let id = localStorage.getItem("id");
      let orgid = localStorage.getItem("parentId");
      this.orgid = orgid
      const param = {start: 0, limit: 20};
      this.$store.dispatch("systemSetting/getOrgList", param)
      this.$store.dispatch("systemSetting/getSiteDetail", id)
        .then(() => {
          this.detailSite = this.siteDetail
        })
    },
    methods: {
      onSubmit() {
        const {site, siteLangs} = this.siteDetail;
        let d = JSON.parse(
          JSON.stringify(siteLangs, function (key, value) {
            if (key == "sitid" || key == "lngid") {
              return undefined;
            } else {
              return value;
            }
          })
        );
        site.orgid = this.orgid
        site.siteType = site.siteType.value
        this.siteDetail.siteLangs = d;
        this.$store.dispatch("systemSetting/saveSite", this.siteDetail);
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
