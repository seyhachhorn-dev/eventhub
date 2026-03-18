<template>
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-4xl font-bold">Events</h2>
        <p class="text-gray-500 mt-2">Manage your events and registrations</p>
      </div>
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger>
          <Button variant="outline">+ Create Event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new event</DialogTitle>
            <DialogDescription>Add a new event here.</DialogDescription>
          </DialogHeader>



          <div calss="grid gap4 py-4">
            <div class="grid gap2">
              <Label for="eventName">Event Name</Label>
              <Input id="eventName" v-model="formCreateRequest.eventName" placeholde="Enter event name" type="text" />
            </div>

            <div class="grid gap-2">
              <Label for="eventDate">Event Date</Label>
              <Input id="eventDate" v-model="formCreateRequest.eventDate" type="datetime-local" />
            </div>


            <div class="grid gap-2">
              <Label for="eventDate">Venue</Label>
              <Input id="eventDate" v-model="formCreateRequest.venueId" type="number" placeholder="Enter venue id" />
            </div>


            <div class="grid gap-2">
              <Label for="eventDate">Attendees</Label>
              <Input id="eventDate" v-model="formCreateRequest.attendeesInput" type="string"
                placeholder="Example: 1,2,3" />
            </div>
          </div>

          <p v-if="submitError" class="text-sm text-red-500">
            {{ submitError }}
          </p>

          <DialogFooter>

            <Button variant="outline" @click="isDialogOpen = false">Cancel</Button>
            <Button @click="handleCreateEvent" :disabled="isSumitting">Save</Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>
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

import type { EventItem, CreateEventRequest } from "@/types/event";
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
import Dialog from "@/components/ui/dialog/Dialog.vue";
import DialogTrigger from "@/components/ui/dialog/DialogTrigger.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import DialogHeader from "@/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "@/components/ui/dialog/DialogTitle.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import DialogFooter from "@/components/ui/dialog/DialogFooter.vue";
import createEvent from "@/services/event/createEvent";
import { toast } from 'vue-sonner'




const searchQuery = ref('');
const events = ref<EventItem[]>([])
const isLoading = ref<boolean>(false)
const isError = ref<string | null>(null)
const page = ref<number>(1)
const isSumitting = ref<boolean>(false)
const submitError = ref<string | null>(null)
const isDialogOpen = ref(false)


const formCreateRequest = ref({
  eventName: '',
  eventDate: '',
  venueId: 0,
  attendeesInput: ''
})

const resetCreateForm = () => {
  formCreateRequest.value = {
    eventName: '',
    eventDate: '',
    venueId: 0,
    attendeesInput: '',
  }
  submitError.value = null
}

const showToast = () => {
  toast('Event has been created', {
    description: 'Sunday, December 03, 2023 at 9:00 AM',
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo'),
    },
  })
}


const handleCreateEvent = async () => {

  try {
    isSumitting.value = true;
    submitError.value = null;
    const raw = formCreateRequest.value.attendeesInput;

    // console.log('raw input :', raw);
    // console.log('type of raw :', typeof raw);

    const payload: CreateEventRequest = {
      eventName: formCreateRequest.value.eventName,
      eventDate: new Date(formCreateRequest.value.eventDate).toISOString(),
      venueId: Number(formCreateRequest.value.venueId),
      attendeesId: raw
        .split(',')
        .map(id => Number(id.trim()))
        .filter(id => !Number.isNaN(id) && id > 0)
    }

    const rs = await createEvent(payload);
    console.log('created event:', rs)


    isDialogOpen.value = false;

    resetCreateForm();

    // reload data
    page.value = 1
    await fetchEvents();
    toast.success('Create even successfully')

  } catch (e) {
    console.log(e);
    // submitError.value = 'Failed to create event'
    toast.error('Failed to create event')

  } finally {
    isSumitting.value = false;
  }


}

const fetchEvents = async () => {
  try {
    isLoading.value = true;
    isError.value = null
    events.value = await getAllEvent(page.value);
    // console.log(events);
  } catch (e) {
    // console.log('error fetch on component', e);
    // isError.value = 'Failed to load events'
    toast.error('Failed to load event')

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