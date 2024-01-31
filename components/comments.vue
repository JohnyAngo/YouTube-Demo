  
<script lang="ts" setup>

  const props = defineProps<{ commentCount: string }>();

</script>

<template>
  <div class="max-w-2xl mx-auto my-nonetext-white ">
    <!-- Sección de Comentarios -->

    <div class="p-6 rounded-md shadow-md mb-3 card-description py-2">
      <div class="flex items-start">
        <label>{{ props.commentCount }} Comments</label>
      </div>
    </div>

    <div v-for="n in 5" :key="n"
      class=" px-3 py-2 rounded-md shadow-md card-description" style="margin-bottom: 8px;">
      <!-- Comentario de Usuarios -->
      <div class="flex items-start mb-4">
        <img src="https://cdn.icon-icons.com/icons2/3298/PNG/512/ui_user_profile_avatar_person_icon_208734.png" alt="Avatar Usuario 1" class="w-10 h-10 rounded-full mr-4">
        <div class="flex-grow">
          <p class="font-bold">User Test</p>
          <p class="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel augue nec mauris luctus dictum.</p>
        </div>
      </div>
    </div>

  </div>

</template>

<style>
.card-description{
  background-color: #474444;
  color: white;
}
</style>