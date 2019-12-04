<template>
  <el-dropdown trigger="click" class="" @command="handleSetLanguage" placement="top">
    <div style="font-size:14px">
      <span class="lang"  v-if="language === 'zh'">简体中文</span>
      <span class="lang" v-if="language === 'en'">English</span>
      <i class="el-icon-caret-bottom" />
      <!--<svg-icon class-name="international-icon" icon-class="en" />-->
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        简体中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
      window.location.reload()
    }
  }
}
</script>

