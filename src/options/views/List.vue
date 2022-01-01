<template>
  <div class="w-full mb-2">
    <a-button @click="refresh()">
      更新
    </a-button>
  </div>
  <div class="w-full">
    <a-list
      size="small"
      :data-source="data"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <template v-if="item.ca_module === 'v2ex'">
            <div>
              {{ item.title }} / {{ item.author }}
            </div>
          </template>
          <template v-if="item.ca_module === 'sspai'">
            <div>
              {{ item.data.title }} / {{ item.author.nickname }} {{ item.action }}
            </div>
          </template>
          <div>
            {{ item.ca_module }} {{ item.ca_module_type }} / {{ dayjs(item.ca_sort_at).format('YYYY-MM-DD hh:mm:ss') }}
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { InfoList } from '~/services/base/model'
import Base from '~/services/base'
import v2ex from '~/services/v2ex'
import sspai from '~/services/sspai'

const data = ref([] as InfoList)

const getData = async() => {
  data.value = await Base.list({ currentPage: 1, num: 20 })
}
const refresh = async() => {
  await v2ex.followActivity()
  await sspai.followActivity()
  await getData()
}

getData()
</script>
