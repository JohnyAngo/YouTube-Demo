<template>
  <div class="flex flex-col h-full min-h-screen bg-[#181818]" style="min-width: fit-content;"> 
    <navbars-detail-top-navbar/>
    <div class="flex flex-row w-full ">
      <navbars-detail-side-navbar/>
      <div class="flex flex-col w-full ">
        <banners-detail-tag-banner/>

        <router-view></router-view>

      </div>
    </div>
  </div>
</template>