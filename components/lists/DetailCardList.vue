<script setup>
  import moment from "moment";

  const { item } = defineProps(['item']);
  const { formatarNumeroAbreviado, convertirDuracion } = useHelpers();

</script>

<template>
  <div class="flex flex-col w-full">
    <div class="relative">

      <!-- Image Video -->
      <NuxtLink :to="{ name: 'watch-id', params: { id: item.id } }">
        <img :src="item.snippet.thumbnails.medium.url" class="h-auto w-96" />
      </NuxtLink>

      <p class="absolute px-1 text-xs text-gray-100 bg-gray-900 right-2 bottom-2 py">
        {{ convertirDuracion( item.contentDetails.duration ) }}
      </p>
    </div>

    <div class="flex flex-row gap-2 mt-2">

      <!-- Profile Picture -->
      <NuxtLink to="/watch/1">
        <img src="https://picsum.photos/seed/1/40/40" class="rounded-full max-h-10 max-w-10" />
      </NuxtLink>

      <!-- Description -->
      <div clas="flex flex-col">
        <a href="#">
          <p class="text-sm font-semibold text-gray-100">
            {{ item.snippet.title }}
          </p>
        </a>
        <a class="mt-2 text-xs text-gray-400 hover:text-gray-100" href="#">
          {{ item.snippet.channelTitle }}
        </a>
        <p class="mt-1 text-xs text-gray-400">{{ formatarNumeroAbreviado(item.statistics.viewCount) }} views . {{ moment(item.snippet.publishedAt, "YYYYMMDD").fromNow() }}</p>
      </div>

    </div>
  </div>
</template>

