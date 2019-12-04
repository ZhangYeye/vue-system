<template>
  <div class="main">
    <div :class="{'fixed-header':true}" class="navList">
      <Hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <el-breadcrumb class="app-breadcrumb" separator=">">
        <el-breadcrumb-item>{{$t('acceptBill.arrivalmanage')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('acceptBill.arrive')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="edit-container">
      <div class="source-area">
        <div class="source-input">
          <el-form label-width="80px" :inline="true" @submit.native.prevent>
            <el-form-item class="field" label="返修工单">
              <el-input
                class="input"
                v-model="billCode"
                placeholder="请选择返修工单"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="source-display">
          <el-form label-width="100px" :inline="true">
            <el-form-item label="包裹数量:">
              <span class="value">2</span>
            </el-form-item>
            <el-form-item label="已收数量:">
              <span class="value">0</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="bill-area">
        <el-form label-width="80px">
          <el-form-item class="field" label="揽收数量">
            <el-input-number
              class="input"
              v-model="receiveCount"
              controls-position="right"
              :min="0"
              placeholder="请输入本次收到的包裹数"
            ></el-input-number>
          </el-form-item>
          <el-form-item class="textarea-field" label="揽收备注">
            <el-input class="input" type="textarea" v-model="receiveRemark" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="b-buttons">
        <el-button class="submit" type="primary" icon="el-icon-finished" @click="receiveSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Hamburger from '@/components/Hamburger'

  export default {
    data() {
      return {
        billCode: "",
        receiveCount: "",
        receiveRemark: ""
      };
    },
    computed: {
      ...mapGetters(["sidebar"]),
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
      receiveSubmit() {
      }
    },
    components: {
      Hamburger
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>

