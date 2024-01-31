<script setup>
import axios from "axios";
import moment from "moment";
import { useRoute } from "vue-router";
import { ref, watch } from 'vue';

const { formatarNumeroAbreviado } = useHelpers(); // Suponiendo que tienes un composible 'useHelpers'
const route = useRoute();
const items = ref([]);
const item = ref({});
const loading = ref(true);
const totalSuscriptores = ref(0);
const commentCount = ref(0);

// Obtiene detalles de un video específico basado en el ID de la ruta
const getVideo = async () => {
  const { data: { items: videoItems } } = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
    params: {
      part: 'snippet,contentDetails,statistics',
      id: route.params.id,
      key: useRuntimeConfig().public.KEY_YOUTUBE
    }
  });

  item.value = videoItems[0];
  totalSuscriptores.value = item.value.statistics.likeCount;
  commentCount.value = item.value.statistics.commentCount;
}

// Obtiene videos populares para mostrar como sugerencias
const getVideos = async () => {
  const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
    params: {
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      maxResults: 20,
      regionCode: 'US',
      key: useRuntimeConfig().public.KEY_YOUTUBE
    }
  });
  items.value = data.items;
  loading.value = false;
}

// Función para limitar el número de caracteres de un texto
const limitarCaracteres = (texto, maxCaracteres) => {
  return texto.length > maxCaracteres ? texto.substring(0, maxCaracteres) + '...' : texto;
}

// Observador para recargar el video cuando cambia el ID en la ruta
watch(() => route.params.id, () => {
  getVideo();
});

getVideo();
getVideos();
</script>


<template>
  <div class="flex justify-center p-5 bg-[#181818]">
    <div class="grid grid-cols-12 gap-2 gap-y-4">

      <div class="col-span-12 sm:col-span-12 md:col-span-8">
        <div class="flex flex-col w-full">
          <iframe width="100%" height="315" :src='`https://www.youtube.com/embed/${route.params.id}`'
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
          <h4 class="text-white mt-2 ml-1">
            {{ item.snippet?.title }}
          </h4>
          <div class="flex flex-row gap-2 mt-2">
            <!-- Profile Picture -->
            <NuxtLink to="/watch/1">
              <img src="https://img.freepik.com/vector-gratis/hermosa-casa_24877-50819.jpg"
                class="rounded-full max-h-10 max-w-10" />
            </NuxtLink>

            <!-- Description -->
            <div clas="flex flex-col">
              <a href="#">
                <p class="text-sm font-semibold text-gray-100">
                  {{ item.snippet?.channelTitle }}
                </p>
              </a>
              <a class="mt-2 text-xs text-gray-400 hover:text-gray-100" href="#">
                {{ formatarNumeroAbreviado(totalSuscriptores) }} Suscriptors
              </a>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-2 gap-y-4">
          <div class="col-span-12 sm:col-span-12 md:col-span-12">
            <div class="max-w-2xl mx-auto bg-gray-900 p-6 rounded-md shadow-md my-3 card-description">
              <div class="flex">
                <div class="flex-grow">
                  <h5 class="text-base font-bold mb-2">
                    {{ formatarNumeroAbreviado(
                      !item.statistics ? 0 : item.statistics?.viewCount
                    ) }} visualizations
                    {{
                      !item.snippet
                      ? '----'
                      : moment(item.snippet?.publishedAt, "YYYYMMDD").fromNow()
                    }}
                  </h5>
                  <p class="mb-4 text-sm">
                    {{
                      !item.snippet
                      ? '----'
                      : limitarCaracteres(item.snippet.description, 330)
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-2 gap-y-4">
          <div class="col-span-12 sm:col-span-12 md:col-span-12">
            <comments :commentCount="commentCount" />
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 md:col-span-4 pl-12 pr-8">
        <div class="grid grid-cols-12 gap-2 gap-y-4">

          <template v-if="loading">
            <lists-skeleton />
          </template>

          <template v-else>
            <div v-for="(item, index) in items" :key="index" class="col-span-12 sm:col-span-12 md:col-span-12">
              <lists-detail-card-list :item="item" />
            </div>
          </template>

        </div>
      </div>

    </div>
  </div>
</template>


<style scoped>
.card-description {
  background-color: #474444;
  color: white;
}
</style>