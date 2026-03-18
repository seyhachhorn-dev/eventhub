<template>
    <main class="w-full min-h-screen text-foreground">
        <div class="flex">
            <div>
                <h1 class="text-4xl text-foreground font-bold">Dashboard</h1>
                <p class="text-muted-foreground mt-2">Manage your events and registrations</p>
            </div>
        </div>

        <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card class="bg-card text-card-foreground border-border">
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <CardTitle class="text-2xl">Total Events</CardTitle>
                        <span class="material-symbols-outlined " style="font-size:30px; color: #006BFF;">
                            calendar_add_on
                        </span>
                    </div>
                    <CardDescription class="text-gray-500">All events created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">24</p>
                </CardContent>
            </Card>
            <!-- end -->
            <Card>
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <CardTitle class="text-2xl">Total Attendees</CardTitle>
                        <span class="material-symbols-outlined " style="font-size:30px; color: #006BFF;">
                            group
                        </span>
                    </div>
                    <CardDescription class="text-gray-500">All attendees joined</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">242</p>
                </CardContent>
            </Card>
            <!-- end -->
            <Card>
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <CardTitle class="text-2xl">Total Venues</CardTitle>
                        <span class="material-symbols-outlined " style="font-size:30px; color: #006BFF;">
                            <span class="material-symbols-outlined">
                                bar_chart_4_bars
                            </span>
                        </span>
                    </div>
                    <CardDescription class="text-gray-500">All venues created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">5</p>
                </CardContent>
            </Card>
            <!-- end -->
            <Card>
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <CardTitle class="text-2xl">Upcoming Event</CardTitle>
                        <span class="material-symbols-outlined" style="font-size:30px; color: #006BFF;">
                            stacked_line_chart
                        </span>
                    </div>
                    <CardDescription class="text-gray-500">All events upcoming</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">2</p>
                </CardContent>
            </Card>
            <!-- end -->


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
                        <TableRow v-for="event in events" :key="event.id">
                            <TableCell>{{ event.id }}</TableCell>
                            <TableCell>{{ event.name }}</TableCell>
                            <TableCell>{{ event.date }}</TableCell>
                            <TableCell>{{ event.status }}</TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </div>


        </div>
    </main>
</template>

<script setup lang="ts">


const events = [
  { id: 1, name: 'Tech Meetup', date: '2026-03-20', status: 'Upcoming' },
  { id: 2, name: 'Vue Workshop', date: '2026-03-22', status: 'Open' },
  { id: 3, name: 'Design Talk', date: '2026-03-25', status: 'Closed' },
]

import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCaption from '@/components/ui/table/TableCaption.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
</script>