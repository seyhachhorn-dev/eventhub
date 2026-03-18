<template>
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-4xl font-bold">Events</h2>
        <p class="text-gray-500 mt-2">Manage your events and registrations</p>
      </div>
      <Button variant="outline">+ Create Event</Button>
    </div>
    <!-- search -->
    <div class="relative max-w-sm mt-5">
      <Search class="absolute left-3 top-2/5 w-4 h-4 -translate-y-1 text-muted-foreground" />
      <Input v-model="searchQuery" placeholder="Search events..." class="pl-9" />
    </div>

    <div class="mt-5">
      <div class="rounded-2xl border bg-background text-foreground p-4 shadow-sm">
        <h2 class="text-lg font-semibold mb-4">Recent Events</h2>
        <Table class="bg-background text-foreground">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <p v-if="isLoading">Loading...</p>
            <p v-if="isError">{{ isError }}</p>

            <TableRow v-for="event in searchByEventName" :key="event.eventId">
              <TableCell>{{ event.eventId }}</TableCell>
              <TableCell>{{ event.eventName }}</TableCell>
              <TableCell> {{ formatDate(event.eventDate) }} </TableCell>
              <TableCell>{{ event.venue.venueName }}</TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">

import type { EventItem } from "@/types/event";
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue';
import { Search } from 'lucide-vue-next';
import { onMounted, ref, computed, watch } from 'vue';
import getAllEvent from '@/services/event/getAllEvent';
import formatDate from "@/services/formatDate";


const searchQuery = ref('');
const events = ref<EventItem[]>([])
const isLoading = ref<boolean>(false)
const isError = ref<string | null>(null)
const page = ref<number>(1)




const fetchEvents = async () => {
  try {
    isLoading.value = true;
    events.value = await getAllEvent(page.value);
    // console.log(events);
  } catch (e) {
    console.log('error fetch on component', e);
    isError.value = 'Failed to load events'
  } finally {
    isLoading.value = false;
  }
}


const searchByEventName = computed(() => {

  return events.value.filter(e => e.eventName.toLowerCase().includes(searchQuery.value.toLowerCase()))

})




watch(page, fetchEvents)

onMounted(() => {
  fetchEvents();
})

</script>