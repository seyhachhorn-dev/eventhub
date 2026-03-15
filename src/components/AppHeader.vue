<template>
    <header class="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4 shadow-sm">
        <div class="flex items-center">
            <h2 class="text-xl font-semibold text-gray-800">{{ pageTitle }}</h2>
        </div>
        <div class="flex items-center gap-4">
            <button class="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                title="Notifications">
                <span class="material-symbols-outlined">
                    notifications
                </span>
            </button>
            <button class="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                title="Settings">
                <span class="material-symbols-outlined">
                    settings
                </span>
            </button>
            <button class="p-2 rounded-lg hover:bg-gray-100 text-red-600 hover:text-red-700 transition-colors"
                title="Logout">
                <span class="material-symbols-outlined">
                    logout
                </span>
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { watch } from 'vue'


const pageTitle = ref('Dashboard');
const path = useRouter();

watch(() => path.currentRoute.value, (newPath) => {

    if (newPath.path === '/dashboard' || newPath.path === '/') {
        pageTitle.value = 'Dashboard';
    } else if (newPath.path === '/events') {
        pageTitle.value = 'Events';
    } else if (newPath.path === '/attendees') {
        pageTitle.value = 'Attendees';
    } else if (newPath.path === '/venues') {
        pageTitle.value = 'Venues';

    }


})





</script>