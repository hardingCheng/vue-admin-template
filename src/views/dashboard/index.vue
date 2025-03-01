<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <el-input
        v-model="inputValue"
        placeholder="请输入内容"
        clearable
      ></el-input>
      <div class="mt-4">输入的内容: {{ inputValue }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "dashboard"
})
const inputValue = ref("")
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
.box-card {
  width: 100%;
  margin-bottom: 20px;
}
.mt-4 {
  margin-top: 16px;
}
</style>
