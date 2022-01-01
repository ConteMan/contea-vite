<template>
  <div class="container flex justify-start space-x-4 shadow-md rounded-md p-4">
    <a-button
      type="text"
      class="text-gray-400 !bg-transparent"
      :class="[ {'btn-active': routeName === 'Card'} ]"
      @click="$router.push('/')"
    >
      Card
    </a-button>
    <a-button
      type="text"
      class="text-gray-400 !bg-transparent"
      :class="[ {'btn-active': routeName === 'List'} ]"
      @click="$router.push('/list')"
    >
      List
    </a-button>
    <a-button
      type="text"
      class="text-gray-400 !bg-transparent"
      :class="{ 'btn-active': routeName === 'Setting' }"
      @click="$router.push('/setting')"
    >
      Setting
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const routeName = ref()
const route = useRoute()
routeName.value = route.name

watch(() => route.name,
  (name) => {
    routeName.value = name
  },
)
</script>
