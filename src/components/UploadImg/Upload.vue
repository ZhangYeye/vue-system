<template>
  <div>
    <el-upload
      action="https://httpbin.org/post"
      list-type="picture-card"
      multiple
      :limit="3"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-exceed="handleExceed">
      <i class="el-upload"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
      };
    },
    computed:{

    },
    methods: {
      handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleSuccess(res,file) {
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
          this.dialogImageUrl = this.result
          localStorage.setItem('acceptImg',this.result)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-upload{
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: #e6e6e6 center url(../../assets/icon-camera.png) no-repeat;
  }
</style>
