<template>
  <div class="sidebar-logon-container" :class="{ collapse }">
    <router-link to="/">
      <img :src="logo" alt="" />
    </router-link>
    <h1 v-if="!collapse">Vue admin</h1>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/vue.png"

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped lang="scss">
.sidebar-logon-container {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px;
  overflow: hidden;
  transition: width 0.3s;

  img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  h1 {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
  }

  &.collapse {
    justify-content: center;

    img {
      margin-right: 0;
    }
  }
}
</style>
