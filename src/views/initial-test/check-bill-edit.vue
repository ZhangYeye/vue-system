<template>
  <div class="main">
    <div class="product">
      <div class="sn-area">
        <el-form class="sn-form" label-position="left" :inline="true" @submit.native.prevent>
          <el-form-item class="sn" label="设备条码">
            <el-input class="field" v-model="sn" placeholder="请输入或扫描设备条码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="detail-area">
        <el-form class="detail-form" label-position="left" :inline="true">
          <el-form-item class="detail-form-item" label="销售编码:">
            <span class="value">102001014</span>
          </el-form-item>
          <el-form-item class="detail-form-item" label="产品名称:">
            <span class="value">蚂蚁矿机 S9k (14T) EMC</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="check-area">
      <el-form class="check-form" @submit.native.prevent>
        <el-form-item class="issue-codes" label="不良代码">
          <el-tabs tab-position="top">
            <el-tab-pane v-for="issueCode in issueCodes" :key="issueCode.group">
              <template slot="label">
                <span>{{issueCode.group}}</span>
                <el-badge v-if="issueCode.selected" class="badge" :value="issueCode.selected"></el-badge>
              </template>
              <el-checkbox-group v-model="selectedIssueCodes">
                <el-checkbox
                  v-for="code in issueCode.codes"
                  class="issue-code"
                  :label="code.name + '(' + code.code + ')'"
                  :key="code.code"
                ></el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="图片">
          <Upload></Upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Upload from "@/components/UploadImg/Upload";

  export default {
    data() {
      return {
        sn: "",
        selectedIssueCodes: ["2板算力异常(FX22)", "3板无温度(FX31)"],
        issueCodes: [
          {
            group: "通用条码",
            selected: 0,
            codes: [
              {
                code: "NPF0",
                name: "售后良"
              },
              {
                code: "FX01",
                name: "前风扇坏"
              },
              {
                code: "FX02",
                name: "后风扇坏"
              },
              {
                code: "FX03",
                name: "控制板不良"
              },
              {
                code: "FX07",
                name: "不运行（整机不选）"
              },
              {
                code: "FX09",
                name: "电源不工作"
              },
              {
                code: "FX19",
                name: "少风扇1个"
              },
              {
                code: "UM11",
                name: "控制板报废"
              },
              {
                code: "FX20",
                name: "少风扇2个"
              }
            ]
          },
          {
            group: "2板3板条码",
            selected: 2,
            codes: [
              {
                code: "FX21",
                name: "2板无温度"
              },
              {
                code: "FX22",
                name: "2板算力异常"
              },
              {
                code: "FX23",
                name: "2板无算力"
              },
              {
                code: "FX24",
                name: "2板算力低"
              },
              {
                code: "FX25",
                name: "2板掉芯片无温度"
              },
              {
                code: "FX26",
                name: "2板丢板"
              },
              {
                code: "UM27",
                name: "2板报废"
              },
              {
                code: "FX28",
                name: "2板电源接口烧坏"
              },
              {
                code: "FX31",
                name: "3板无温度"
              },
              {
                code: "FX32",
                name: "3板算力异常"
              },
              {
                code: "FX33",
                name: "3板无算力"
              },
              {
                code: "FX34",
                name: "3板算力低"
              },
              {
                code: "FX35",
                name: "3板掉芯片无温度"
              },
              {
                code: "FX36",
                name: "3板丢板"
              },
              {
                code: "UM37",
                name: "3板报废"
              },
              {
                code: "FX38",
                name: "3板电源接口烧坏"
              }
            ]
          },
          {
            group: "4板6板条码",
            codes: [
              {
                code: "FX41",
                name: "4板无温度"
              },
              {
                code: "FX42",
                name: "4板算力异常"
              },
              {
                code: "FX43",
                name: "4板无算力"
              },
              {
                code: "FX44",
                name: "4板算力低"
              },
              {
                code: "FX45",
                name: "4板掉芯片无温度"
              },
              {
                code: "FX46",
                name: "4板丢板"
              },
              {
                code: "UM47",
                name: "4板报废"
              },
              {
                code: "FX48",
                name: "4板电源接口烧坏"
              },
              {
                code: "FX61",
                name: "6板无温度"
              },
              {
                code: "FX62",
                name: "6板算力异常"
              },
              {
                code: "FX63",
                name: "6板无算力"
              },
              {
                code: "FX64",
                name: "6板算力低"
              },
              {
                code: "FX65",
                name: "6板掉芯片无温度"
              },
              {
                code: "FX66",
                name: "6板丢板"
              },
              {
                code: "UM67",
                name: "6板报废"
              },
              {
                code: "FX68",
                name: "6板电源接口烧坏"
              }
            ]
          },
          {
            group: "7板8板条码",
            codes: [
              {
                code: "FX71",
                name: "7板无温度"
              },
              {
                code: "FX72",
                name: "7板算力异常"
              },
              {
                code: "FX73",
                name: "7板无算力"
              },
              {
                code: "FX74",
                name: "7板算力低"
              },
              {
                code: "FX75",
                name: "7板掉芯片无温度"
              },
              {
                code: "FX76",
                name: "7板丢板"
              },
              {
                code: "UM77",
                name: "7板报废"
              },
              {
                code: "FX78",
                name: "7板电源接口烧坏"
              },
              {
                code: "FX81",
                name: "8板无温度"
              },
              {
                code: "FX82",
                name: "8板算力异常"
              },
              {
                code: "FX83",
                name: "8板无算力"
              },
              {
                code: "FX84",
                name: "8板算力低"
              },
              {
                code: "FX85",
                name: "8板掉芯片无温度"
              },
              {
                code: "FX86",
                name: "8板丢板"
              },
              {
                code: "UM87",
                name: "8板报废"
              },
              {
                code: "FX88",
                name: "8板电源接口烧坏"
              }
            ]
          },
          {
            group: "1板9板条码",
            codes: [
              {
                code: "FX11",
                name: "1板无温度"
              },
              {
                code: "FX12",
                name: "1板算力异常"
              },
              {
                code: "FX13",
                name: "1板无算力"
              },
              {
                code: "FX14",
                name: "1板算力低"
              },
              {
                code: "FX15",
                name: "1板掉芯片无温度"
              },
              {
                code: "FX16",
                name: "1板丢板"
              },
              {
                code: "UM17",
                name: "1板报废"
              },
              {
                code: "FX18",
                name: "1板电源接口烧坏"
              },
              {
                code: "FX91",
                name: "9板无温度"
              },
              {
                code: "FX92",
                name: "9板算力异常"
              },
              {
                code: "FX93",
                name: "9板无算力"
              },
              {
                code: "FX94",
                name: "9板算力低"
              },
              {
                code: "FX95",
                name: "9板掉芯片无温度"
              },
              {
                code: "FX96",
                name: "9板丢板"
              },
              {
                code: "UM97",
                name: "9板报废"
              },
              {
                code: "FX98",
                name: "9板电源接口烧坏"
              }
            ]
          },
          {
            group: "缺运算板",
            codes: [
              {
                code: "UM18",
                name: "板缺1片运算板"
              },
              {
                code: "UM19",
                name: "板缺2片运算板"
              },
              {
                code: "UM20",
                name: "板缺3片运算板"
              },
              {
                code: "UM21",
                name: "板缺4片运算板"
              },
              {
                code: "UM99",
                name: "电源报废（初和前侧通用）"
              }
            ]
          },
          {
            group: "G1条码",
            codes: [
              {
                code: "UM19",
                name: "板缺2片运算板"
              }
            ]
          },
          {
            group: "G2条码1",
            codes: [
              {
                code: "",
                name: ""
              }
            ]
          },
          {
            group: "G2条码2",
            codes: [
              {
                code: "",
                name: ""
              }
            ]
          },
          {
            group: "G2条码3",
            codes: [
              {
                code: "",
                name: ""
              }
            ]
          },
          {
            group: "HUB条码",
            codes: [
              {
                code: "",
                name: ""
              }
            ]
          }
        ],

        value: '',
        webviewUrl: '',
        spinShow: true,
        isScaning: false
      };
    },
    created(){

    },
    mounted(){
      const self = this
      window.addEventListener('keypress', function(event) {
        if (event) {
          if (event.keyCode == 13) {
            self.isScaning = true
            self.webviewUrl = self.value.replace(/MEBKM:TITLE:;URL:/g,'')
            self.value = ''
            setTimeout(() => {self.isScaning = false}, 1000)
          } else {
            self.value += event.key
          }
        }
      })
    },
    methods: {
      openMenu: function (index) {
        this.activeMenu = index;
      },
      selectMenu: function (index) {
        this.activeSubMenu = index;
      },
      clickMenu: function (route) {
        if (route) {
          window.location = route;
        }
      }
    },
    components: {
      Upload
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .badge {
    position: absolute;
  }

  .imgs {
    height: 120px;
    display: flex;
  }

  .imgs .img-holder {
    width: 180px;
    height: 100%;
    padding-right: 10px;
  }
</style>

