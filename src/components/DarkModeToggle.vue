<script setup lang="ts">
import Button from './ui/button/Button.vue';
import { useColorMode } from '@vueuse/core';

const mode = useColorMode();

</script>
<template>
    <div class="flex gap-2">
        <Button variant="outline" @click="mode = 'light'">
            Light
        </Button>
        <Button variant="outline" @click="mode = 'dark'">
            Dark
        </Button>

        <Button variant="outline" @click="mode = 'auto'">
            System
        </Button>

    </div>


</template>