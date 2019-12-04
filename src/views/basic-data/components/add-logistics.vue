<template>
  <div class="edit-container">
    <div class="source-input">
      <el-form
        label-width="100px"
        style="width:45%"
      >
        <el-form-item class="field" :label="$t('basicData.logisticsCode')+':'">
          <el-input class="input"
                    v-model="shipment.code"
                    :placeholder="$t('basicData.logisticsCode')"></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.name')+':'">
          <el-input
            class="input"
            v-model="shipmentLangs[0].name"
            placeholder="中文"
          ></el-input>
          <span class="error"></span>
        </el-form-item>
        <el-form-item class="field" label="   ">
          <el-input
            class="input"
            v-model="shipmentLangs[1].name"
            placeholder="English"
          ></el-input>
        </el-form-item>
        <el-form-item class="field" :label="$t('table.remark')+':'">
          <el-input
            type="textarea"
            class="remark"
            v-model="shipmentLangs[0].remark"
            style="width:100%;margin-bottom: 10px"
            rows="4"
            placeholder="中文"
          ></el-input>
          <el-input
            type="textarea"
            class="remark"
            v-model="shipmentLangs[1].remark"
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
    name: "add-logistics",
    data() {
      return {
        shipment: {
          shpid: '',
          code: '',
          enabled: 1
        },
        shipmentLangs: [
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
      }
    },
    methods: {
      onSubmit() {
        let shipment = this.shipment;
        let shipmentLangs = this.shipmentLangs;
        this.$store.dispatch("basicData/saveShip", {shipment, shipmentLangs});
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
