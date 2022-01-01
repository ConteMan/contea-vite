<template>
  <div class="w-full grid grid-cols-6 gap-2">
    <a v-for="item in items" :key="item.title" class="bg" :style="{ 'background-image': `url(${item.pic_url})` }" :href="`https://www.libvio.com/${item.url}`">
      <div class="ml-2 text-white">{{ item.title }}</div>
      <div class="ml-2 text-white">{{ item.des }}</div>
      <div class="ml-2 text-white">{{ item.tag }}</div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import vedio from '~/services/vedio'
import type { List } from '~/services/vedio/model'

const items = ref([] as List)

const getList = async() => {
  const res = await vedio.libvio()
  // eslint-disable-next-line no-console
  console.log(res)
  items.value = res
}

getList()
</script>

<style scoped>
.bg {
  display: block;
  padding-top: 150%;
  background-size: cover;
  background-position: 50% 50%;
}
</style>
