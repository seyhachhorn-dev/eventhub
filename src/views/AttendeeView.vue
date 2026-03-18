<template>
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-4xl font-bold">Attendee</h2>
        <p class="text-gray-500 mt-2">Manage your Attendee and registrations</p>
      </div>
      <Button variant="outline">+ Create Attendee</Button>
    </div>
    <!-- search -->
    <div class="relative max-w-sm mt-5">
      <Search class="absolute left-3 top-2/5 w-4 h-4 -translate-y-1 text-muted-foreground" />
      <Input placeholder="Search attendee..." class="pl-9" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue';
import { Search } from 'lucide-vue-next'; 
</script>