<template>
  <div class="container mx-auto flex flex-col justify-center items-center space-y-4 p-10">
    <head-back></head-back>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import HeadBack from '~/options/components/HeadBack.vue'
</script>
