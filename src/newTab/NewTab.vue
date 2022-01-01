<template>
  <div class="w-full p-4">
  </div>
  <div class="w-full flex flex-col items-center">
    <div id="page" class="w-screen-xl">
      <template v-for="item in list" :key="item.title">
        <div class="p-2 hover:(bg-gray-200)">
          <template v-if="item.ca_module === 'v2ex'">
            <a :href="item.title_link">
              {{ item.title }}
            </a>
          </template>
          <template v-if="item.ca_module === 'sspai'">
            <a :href="'https://sspai.com/post/' + item.data.id">
              {{ item.data.title }}
            </a>
          </template>
          <span class="text-gray-300 ml-2">
            {{ dayjs(item.ca_sort_at).format('YYYY-MM-DD hh:mm') }}
          </span>
          <span class="text-gray-300 ml-2">
            {{ item.ca_module.toUpperCase() }} / {{ item.ca_module_type.toUpperCase() }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import Base from '~/services/base'

const list = ref([] as any[])

const getPage = async() => {
  // const res = await browser.runtime.sendMessage({ command: 'get-page', param: { url: 'https://mp.weixin.qq.com/s/UhFBygOQom0giomxAtTY7Q' } })
  // const iframeEle = document.querySelector('#page')
  // const iframePage = document.createElement('iframe')
  // iframePage.setAttribute('sandbox', 'allow-scripts allow-forms allow-same-origin')
  // iframePage.setAttribute('referrerpolicy', 'no-referrer')
  // iframePage.setAttribute('src', 'https://mp.weixin.qq.com/s/UhFBygOQom0giomxAtTY7Q')
  // iframeEle?.appendChild(iframePage)
  const res = await Base.list({ currentPage: 1, num: 20 })
  // eslint-disable-next-line no-console
  console.log(res)
  list.value = res
}

getPage()
</script>
