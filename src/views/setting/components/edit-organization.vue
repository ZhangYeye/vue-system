<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="80px"
        style="width:45%"
      >
        <el-form-item class="field" :label="$t('setting.orgCode')+':'" prop="code">
          <el-input class="input"
                    v-model="detailOrg.org.code"
                    :placeholder="$t('setting.orgCode')"
                    name="code"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="item.lang === 'zh' ? '' : $t('table.name')+':'"
                      v-for="(item,key) in orgDetail.orgLangs"
                      :key="key">
          <el-input
            class="input"
            v-model="item.name"
            :placeholder="item.lang === 'zh' ? '中文' : 'English'"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input v-for="(item,key) in orgDetail.orgLangs"
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
    name: "edit-organization",
    data() {
      return {
        type: '',
        detailOrg: {
          org: {
            code: ''
          }
        },
      }
    },
    computed: {
      ...mapGetters(["orgDetail"]),

    },
    mounted() {
      let id = localStorage.getItem("id");
      this.$store.dispatch("systemSetting/getOrgDetail", id)
        .then(() => {
          this.detailOrg = this.orgDetail
        })
    },
    methods: {
      onSubmit() {
        const {org, orgLangs} = this.orgDetail;
        let d = JSON.parse(
          JSON.stringify(orgLangs, function (key, value) {
            if (key == "orgid" || key == "lngid") {
              return undefined;
            } else {
              return value;
            }
          })
        );
        this.orgDetail.orgLangs = d;
        this.$store.dispatch("systemSetting/saveOrg", this.orgDetail);
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
