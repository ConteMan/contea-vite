<template>
  <div class="w-full grid grid-cols-6 gap-2">
    <a v-for="item in items" :key="item.title" class="bg" :style="`${item.pic_url}`" :href="item.url">
      <div class="ml-2 text-white">{{ item.title }}</div>
      <div class="ml-2 text-white">
        <a v-for="tagItem in item.tags" :key="tagItem.name" :href="tagItem.url"> {{ tagItem.name }} </a>
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import vedio from '~/services/vedio'
import type { List } from '~/services/vedio/model'

const items = ref([] as List)

const getList = async() => {
  const res = await vedio.ddrk()
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
