<template>
  <div class="container mx-auto flex flex-col justify-center items-center space-y-4 p-10">
    <head-nav></head-nav>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import HeadNav from '~/options/components/HeadNav.vue'
</script>
