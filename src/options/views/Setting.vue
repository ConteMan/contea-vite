<template>
  <div class="w-full">
    <a-collapse v-model:activeKey="activeKey" :bordered="false" class="max-w-full">
      <template #expandIcon="{ isActive }">
        <caret-right-outlined :rotate="isActive ? 90 : 0" />
      </template>
      <a-collapse-panel key="1" header="基础" :style="customStyle">
        <div class="flex border-l-2 border-l-gray-300 hover:(border-l-red-600)">
          <div class="flex-grow-0 flex flex-col justify-center">
            <div class="ml-4">
              初始化
            </div>
          </div>
          <div class="flex-grow text-right">
            <a-button type="text" class="bg-gray-200" @click="configState.init()">
              确定
            </a-button>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="V2EX" :style="customStyle">
        <div class="flex border-l-2 border-l-gray-300 hover:(border-l-red-600)">
          <div class="flex-grow flex flex-col justify-center">
            <div class="ml-4">
              Token
            </div>
          </div>
          <div class="flex-grow-1 flex flex-row-reverse text-right w-screen-sm">
            <a-input v-model:value="v2exToken" @blur="blurSet('v2ex', 'token', v2exToken)" />
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts" setup>
import configState from '~/models/keyValue/configState'
const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'

const activeKey = ref(['1', '2'])
const v2exToken = ref('')

const getSetting = async() => {
  const settings = await (await configState.bulkGetItem(['v2ex'])).toArray()
  v2exToken.value = settings[0]?.token ?? ''
}

const setSetting = async(key: string, data: object) => {
  await configState.mergeSet(key, data)
}

const blurSet = async(module: string, keyName: string, data: string) => {
  await setSetting(module, { [keyName]: data })
}

getSetting()
</script>
