<template>
    <main class="max-w-10xl min-h-screen ">
        <div class="flex">
            <div>
                <h1 class="text-4xl font-bold">Dashboard</h1>
                <p class="text-gray-500 mt-2">Manage your events and registrations</p>
            </div>
        </div>

        <div class="m-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
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
    </main>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'

import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
</script>