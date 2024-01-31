<script setup lang="ts">
import axios from "axios";

// Estados reactivos para manejar la carga de datos y la lista de videos.
const loading = ref(true);
const items = ref([]);

// Accede al store de autenticación (probablemente usando Pinia o Vuex).
const store = useAuthStore();

// Función asíncrona para obtener videos de la API de YouTube.
const getVideos = async () => {
  // Simula un pequeño retraso (1 segundo).
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Verifica si ya hay videos cargados en el store.
  if (store.videos.length == 0) {
    // Realiza una solicitud HTTP para obtener videos populares.
    const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        maxResults: 30,
        regionCode: 'US',
        // Usa la variable de entorno para la clave API.
        key: useRuntimeConfig().public.KEY_YOUTUBE
      }
    });

    // Asigna los videos obtenidos a los estados reactivos.
    items.value = data.items;
    store.videos = items.value;
  } else {
    // Si los videos ya están en el store, úsalos.
    items.value = store.videos;
  }

  // Indica que la carga de datos ha finalizado.
  loading.value = false;
}

// Llama a la función al inicializar el componente.
getVideos();
</script>

<template>
  <!-- Muestra un esqueleto de carga mientras los datos están siendo cargados. -->
  <template v-if="loading">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 mt-4">
      <lists-skeleton />
    </div>
  </template>

  <!-- Muestra los videos una vez que se han cargado. -->
  <template v-else>
    <div class="flex justify-center p-5 bg-[#181818]">
      <div class="grid max-w-6xl grid-cols-12 gap-2 gap-y-4">
        <!-- Itera sobre la lista de videos y muestra cada uno. -->
        <div v-for="(item, index) in items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-3">
          <lists-detail-card-list :item="item" />
        </div>
      </div>
    </div>
  </template>
</template>
