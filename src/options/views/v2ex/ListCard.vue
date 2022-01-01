<template>
  <div
    class="p-10 flex justify-between min-w-full cursor-pointer shadow-md rounded-md bg-gradient-to-r from-red-500 hover:(from-red-600)"
    @click="$router.push('/v2ex')"
  >
    <div v-if="loading">
      Loading ...
    </div>
    <div v-else>
      <div>
        {{ info.showName }}
      </div>
      <div>
        {{ info.signature }}
      </div>
      <div>
        第 {{ info.id }} 号会员 / 创建于 {{ info.created }} / 今日活跃 {{ info.dau }} / {{ info.balance?.gold }} 金 {{ info.balance?.silver }} 银 {{ info.balance?.bronze }} 铜
      </div>
      <div class="mt-2 italic text-gray-500">
        updated: {{ dayjs(info.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
    </div>
    <div class="relative flex items-center text-right hover:(border-b border-b-red-50)">
      <div
        class="text-5xl text-white"
        @click.stop="openSite(config.site)"
      >
        {{ config.name }}
        <span v-if="!loading" class="ml-1 text-sm" :class="info.login ? 'text-green-600' : 'text-red-600'">
          ●
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { openSite } from '~/utils'
import v2ex from '~/services/v2ex'
import type { Config, User } from '~/services/v2ex/model'

const config = ref({} as Config)
const info = ref({} as User)
const loading = ref(true)

const getInfo = async() => {
  loading.value = true
  config.value = await v2ex.getConfig()
  info.value = await v2ex.user()
  loading.value = false
}

getInfo()
</script>
