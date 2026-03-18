<template>
    <router-view position="top-right" richColors  />
    <Toaster/>
</template>

<script setup lang="ts">

import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css'

</script>

<style>
* {
  font-family: 'Fira Sans', sans-serif;
}
</style>
