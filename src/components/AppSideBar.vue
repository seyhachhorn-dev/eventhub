<template>
    <aside class="w-64 shadow-lg flex flex-col bg-background text-foreground">
        <div class="text-center text-2xl font-bold border-b border-gray-200 p-6  text-foreground">
            EventHub
        </div>
        <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
            <router-link 
                to="/" 
                class="block px-4 py-3 rounded-lg transition-colors font-medium"
                active-class="bg-blue-100 text-blue-600"
                exact-active-class="bg-blue-100 text-blue-600"
            >
                Dashboard
            </router-link>
            <router-link 
                to="/events" 
                class="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-muted-foreground"
                active-class="bg-blue-100 text-blue-600"
                exact-active-class="bg-blue-100 text-blue-600"

            >
                Events
            </router-link>
            <router-link 
                to="/attendees" 
                class="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-muted-foreground"
                active-class="bg-blue-100 text-blue-600"
            >
                Attendees
            </router-link>
            <router-link 
                to="/venues" 
                class="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-muted-foreground"
                active-class="bg-blue-100 text-blue-600"
            >
                Venues
            </router-link>
        </nav>
    </aside>
</template>

<script setup lang="ts">
</script>
