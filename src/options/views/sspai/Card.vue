<template>
  <div
    class="p-10 flex justify-between min-w-full cursor-pointer shadow-md rounded-md bg-gradient-to-r from-red-500 hover:(from-red-600)"
    @click="$router.push('/sspai')"
  >
    <div v-if="loading">
      Loading ...
    </div>
    <div v-else>
      <div class="flex">
        <a-avatar :src="config.cdnUrl + '/' + user.avatar"></a-avatar>
        <div class="ml-4">
          <div>
            <span>{{ user.nickname }} ({{ user.slug }})</span>
          </div>
          <div>
            {{ user.bio }}
          </div>
          <div class="mt-2 italic text-gray-500">
            updated: {{ dayjs(user.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex items-center text-right hover:(border-b border-b-red-50)">
      <div
        class="text-5xl text-white"
        @click.stop="openSite(config.site)"
      >
        {{ config.name }}
        <span v-if="!loading" class="ml-1 text-sm" :class="login ? 'text-green-600' : 'text-red-600'">
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
import base from '~/services/sspai'
import type { Config, User } from '~/services/sspai/model'

const config = ref({} as Config)
const login = ref(false)
const user = ref({} as User)
const loading = ref(true)

const getInfo = async() => {
  loading.value = true
  config.value = await base.getConfig()
  login.value = await base.loginCheck()
  user.value = await base.user()
  loading.value = false
}

getInfo()
</script>
