<template>
    <div class="min-h-screen bg-gray-100 flex">
        <!-- Side Bar -->
        <SideBar />
        
        <!-- Main Content Area -->
        <div class="flex-1 min-w-0 flex flex-col">
            <!-- Header -->
            <AppHeader />
            
            <!-- Content -->
            <main class="flex-1 overflow-auto p-6 md:p-8 bg-background">
                 <router-view />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import SideBar from '../components/AppSideBar.vue';
</script>
