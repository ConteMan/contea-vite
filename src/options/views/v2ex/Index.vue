<template>
  <div v-if="!loginLoading && !login">
    <a-button
      type="text"
      @click="openSite(config.site)"
    >
      点击登录
    </a-button>
  </div>

  <div
    v-if="showMession"
    class="w-full"
  >
    <a-card
      title="签到"
      class="w-full"
      hoverable
      :bordered="true"
    >
      <div v-if="mession.completed">
        <span>今日已签到，已连续签到 {{ mession.days }} 天</span>
      </div>
      <div v-else>
        <a-button
          type="text"
          class="text-red-600"
          @click="getMession()"
        >
          点击签到
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { openSite } from '~/utils'
import v2ex from '~/services/v2ex'
import { Mession } from '~/services/v2ex/model'
import type { Config } from '~/services/v2ex/model'

const config = ref({} as Config)
const login = ref(false)
const loginLoading = ref(true)
const mession = ref({} as Mession)
const messionLoading = ref(true)

const getMession = async() => {
  messionLoading.value = true
  mession.value = await v2ex.mission()
  messionLoading.value = false
}

const init = async() => {
  config.value = await v2ex.getConfig()
  login.value = await v2ex.loginCheck()
  if (login.value)
    await getMession()
  loginLoading.value = false
}

const showMession = computed(() => {
  const res = login.value && !loginLoading.value && !messionLoading.value
  return res
})

init()
</script>
