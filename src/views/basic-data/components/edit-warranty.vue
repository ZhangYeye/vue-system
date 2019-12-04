<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="80px"
        style="width:45%"
      >
        <el-form-item class="field" label="SN:">
          <el-input class="input"
                    v-model="maintainDeadline.sn"
                    placeholder="sn"></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('basicData.deadline')+':'">
          <el-date-picker
            v-model="maintainDeadline.deadline"
            type="date"
            :placeholder="$t('basicData.selTime')"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="field" :label="$t('basicData.secondHand')+':'">
          <el-input class="input"
                    v-model="maintainDeadline.secodnHand"
                    :placeholder="$t('basicData.secondHand')"></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input
            type="textarea"
            class="remark"
            v-model="maintainDeadline.remark"
            style="width:100%;margin-bottom: 10px"
            rows="4"
            :placeholder="$t('table.remark')"
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
    name: "edit-warranty",
    data() {
      return {
        type: '',
        detailOrg: {
          org: {
            code: ''
          }
        },
        maintainDeadline: {
          mdlid: '',
          sn: 'CHDZ19DAGJAJI0100',
          deadline: '2019-12-3',
          secodnHand: '',
          remark: '',
          enabled: 1
        }
      }
    },
    computed: {
      ...mapGetters(["warrantyDetail"]),

    },
    mounted() {
      let id = localStorage.getItem("id");
      // this.$store.dispatch("basicData/getWarrantyDetail", id)
      //   .then(() => {
      //     this.detailOrg = this.orgDetail
      //   })
    },
    methods: {
      onSubmit() {
        let maintainDeadline = this.maintainDeadline
        this.$store.dispatch("systemSetting/saveOrg", maintainDeadline);
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

