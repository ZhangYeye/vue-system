<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="100px"
        style="width:45%"
      >
        <el-form-item class="field" :label="$t('basicData.logisticsCode')+':'" prop="code">
          <el-input class="input"
                    v-model="detailShip.shipment.code"
                    :placeholder="$t('basicData.logisticsCode')"
                    name="code"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="item.lang === 'zh' ? '' : $t('table.name')+':'"
                      v-for="(item,key) in shipDetail.shipmentLangs"
                      :key="key">
          <el-input
            class="input"
            v-model="item.name"
            :placeholder="item.lang === 'zh' ? '中文' : 'English'"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input v-for="(item,key) in shipDetail.shipmentLangs"
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
    name: "edit-logistics",
    data() {
      return {
        type: '',
        detailShip: {
          shipment: {
            code: ''
          }
        },
      }
    },
    computed: {
      ...mapGetters(["shipDetail"]),
    },
    mounted() {
      let id = localStorage.getItem("id");
      this.detailShip = this.shipDetail
      // this.$store.dispatch("basicData/getShipDetail", id)
      //   .then(() => {
      //     this.detailShip = this.shipDetail
      //   })
    },
    methods: {
      onSubmit() {
        const {shipment, shipmentLangs} = this.shipDetail;
        let d = JSON.parse(
          JSON.stringify(orgLangs, function (key, value) {
            if (key == "shpid" || key == "lngid") {
              return undefined;
            } else {
              return value;
            }
          })
        );
        this.shipDetail.shipmentLangs = d;
        this.$store.dispatch("basicData/saveShip", this.shipDetail);
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
