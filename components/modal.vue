<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-8 rounded-md shadow-md">
      <div v-if="type === 'success'" class="text-green-500 mb-4">¡Éxito!</div>
      <div v-if="type === 'warning'" class="text-yellow-500 mb-4">Advertencia:</div>
      <p>{{ message }}</p>
      <button @click="close" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Cerrar</button>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>