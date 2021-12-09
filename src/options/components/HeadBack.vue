<template>
  <div class="container flex justify-start space-x-4 shadow-md rounded-md p-4">
    <a-button
      type="text"
      class="text-gray-400 !bg-transparent"
      @click="$router.push('/')"
    >
      <template #icon>
        <left-outlined />
      </template>
    </a-button>
  </div>
</template>
