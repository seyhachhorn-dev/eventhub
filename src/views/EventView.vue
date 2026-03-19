<template>
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-4xl font-bold">Events</h2>
        <p class="text-gray-500 mt-2">Manage your events and registrations</p>
      </div>
      <Button variant="outline" @click="openCreateDialog">+ Create Event</Button>

      <Dialog v-model:open="isDialogOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ mode === 'create' ? 'Create new event' : 'Update event' }}</DialogTitle>
            <DialogDescription>
              {{ mode === 'create' ? 'Add a new event here.' : 'Edit event details here.' }}
            </DialogDescription>
          </DialogHeader>

          <div calss="grid gap4 py-4">
            <div class="grid gap2">
              <Label for="eventName">Event Name</Label>
              <Input id="eventName" v-model="form.eventName" placeholde="Enter event name" type="text" />
            </div>

            <div class="grid gap-2">
              <Label for="eventDate">Event Date</Label>
              <Input id="eventDate" v-model="form.eventDate" type="datetime-local" />
            </div>


            <div class="grid gap-2">
              <Label for="eventDate">Venue</Label>
              <Input id="eventDate" v-model="form.venueId" type="string" placeholder="Enter venue id" />
            </div>


            <div class="grid gap-2">
              <Label for="eventDate">Attendees</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Venue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="venue in venues" :key="venue.venueId" :value="String(venue.venueId)">
                    {{ venue.venueName }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p v-if="submitError" class="text-sm text-red-500">
            {{ submitError }}
          </p>

          <DialogFooter>

            <Button variant="outline" @click="isDialogOpen = false">Cancel</Button>
            <Button @click="mode === 'create' ? handleCreateEvent() : handleUpdateById()"
              :disabled="isSumitting || isUpdate"> {{ mode === 'create' ? 'Save' : 'Update' }}</Button>

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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="isLoading">
              <TableCell col-span-4>
                Loading...
              </TableCell>
            </TableRow>

            <TableRow v-else-if="isError">
              <TableCell colspan="4">{{ isError }}</TableCell>
            </TableRow>

            <TableBody v-else-if="searchByEventName.length === 0">
              <TableCell col-span-4>event not found.</TableCell>
            </TableBody>

            <TableRow v-for="event in searchByEventName" :key="event.eventId">
              <TableCell>{{ event.eventId }}</TableCell>
              <TableCell>{{ event.eventName }}</TableCell>
              <TableCell> {{ formatDate(event.eventDate) }} </TableCell>
              <TableCell>{{ event.venue.venueName }}</TableCell>
              <!-- action btn -->
              <TableCell class="flex gap-2">
                <Button @click="openUpdateDiaLog(event)">Update</Button> <Button variant="outline"
                  @click="openDialogAndSelectId(event.eventId)">Delete</Button>
              </TableCell>


            </TableRow>

          </TableBody>

          <Dialog v-model:open="isDialogOpenForDelete">
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Event</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this event? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button variant="outline" @click="isDialogOpenForDelete = false">
                  Cancel
                </Button>
                <Button variant="destructive" @click="handleDeleteEventById">
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Table>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">

import type { EventItem, CreateEventRequest, UpdateEventRequest } from "@/types/event";
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
import type { VenueItem } from "@/types/venue";
import getAllVenue from "@/services/venue/getAllVenue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import deleteEventById from "@/services/event/deleteEvent";
import updateEventById from "@/services/event/updateEvent";




const mode = ref<'create' | 'update'>('create')
const searchQuery = ref('');
const venues = ref<VenueItem[]>([])
const events = ref<EventItem[]>([])
const isLoading = ref<boolean>(false)
const isError = ref<string | null>(null)
const page = ref<number>(1)
const isSumitting = ref<boolean>(false)
const submitError = ref<string | null>(null)
const isDialogOpen = ref(false)
const isDialogOpenForDelete = ref(false)
const selectedId = ref<number | null>(null)
const isDialogOpenForUpdate = ref(false);
const isUpdate = ref<boolean>(false)
const updateError = ref<string | null>(null);
const selectedUpdateEventId = ref<null | number>(null);




const form = ref({
  eventName: '',
  eventDate: '',
  venueId: 0,
  attendeesInput: ''
})

const resetCreateForm = () => {
  form.value = {
    eventName: '',
    eventDate: '',
    venueId: 0,
    attendeesInput: '',
  }
  submitError.value = null
}




const handleCreateEvent = async () => {

  try {
    isSumitting.value = true;
    submitError.value = null;
    const raw = form.value.attendeesInput;

    // console.log('raw input :', raw);
    // console.log('type of raw :', typeof raw);
    const payload: CreateEventRequest = {
      eventName: form.value.eventName,
      eventDate: new Date(form.value.eventDate).toISOString(),
      venueId: Number(form.value.venueId),
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

const openCreateDialog = () => {
  mode.value = 'create'

  form.value = {
    eventName: '',
    eventDate: '',
    venueId: 0,
    attendeesInput: ''
  }

  isDialogOpen.value = true
}

const openUpdateDiaLog = (event: EventItem) => {
  mode.value = 'update'

  selectedUpdateEventId.value = event.eventId

  form.value = {
    eventName: event.eventName,
    eventDate: event.eventDate.slice(0, 16),
    venueId: event.venue.venueId,
    attendeesInput: event.attendees?.map(a => a.attendeeId).join(',') || ''
  }

  isDialogOpen.value = true
}


const handleUpdateById = async () => {
  const id = selectedUpdateEventId.value;
  if (id === null) return;

  try {
    isUpdate.value = true;
    updateError.value = null;

    const raw = String(form.value.attendeesInput || '')

    const payload: UpdateEventRequest = {
      eventName: form.value.eventName,
      eventDate: new Date(form.value.eventDate).toISOString(),
      venueId: Number(form.value.venueId),
      attendeesId: raw.
        split(',')
        .map(id => Number(id.trim()))
        .filter(id => !Number.isNaN(id) && id > 0)

    }

    const rs = await updateEventById(id, payload)
    console.log('updated event:', rs)

    isDialogOpen.value = false
    selectedUpdateEventId.value = null
    resetCreateForm()

    await fetchEvents()

    toast.success('Event updated successfully')

  } catch (e) {
    console.log(e)
    updateError.value = 'Failed to update event'
    toast.error('Failed to update event')

  } finally {
    isUpdate.value = false
  }

}



const openDialogAndSelectId = (id: number) => {
  if (!selectedId) return
  selectedId.value = id;
  isDialogOpenForDelete.value = true
  // console.log('id', id);
}


const handleDeleteEventById = async () => {
  const id = selectedId.value;
  if (id === null) return
  try {
    await deleteEventById(id);
    toast.success('Event deleted successfully')
    isDialogOpenForDelete.value = false;
    selectedId.value = null;
    //reload
    await fetchEvents();

  } catch (e) {
    isError.value = 'fail to delete'
    toast.error('fail to delete this event')
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


const fetchVenue = async () => {
  try {
    isLoading.value = true;
    isError.value = null;
    venues.value = await getAllVenue(page.value);
  } catch (e) {
    isError.value = 'Failed to load event';
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
  fetchVenue();
})

</script>