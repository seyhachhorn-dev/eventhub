<template>
    <div class="min-h-sreen bg-gray-100 flex">
        <!-- Side Bar -->
        <SideBar/>
    </div>
    <div class="flex-1 flex flex-col">
        <AppHeader/>
      <main class="p-6 md:p-8">
        <slot />
      </main>
    </div>

</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import SideBar from '../components/SideBar.vue';
</script>
