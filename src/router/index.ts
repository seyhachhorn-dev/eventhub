import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'
import DashboardLayout from "../layout/DashboardLayout.vue";
import EventView from "../views/EventView.vue";
import VenueView from "../views/VenueView.vue";
import AttendeeView from "../views/AttendeeView.vue";
import DashboardView from "../views/DashboardView.vue";


const routes :RouteRecordRaw[] = [
    {
        path: "/",
        component: DashboardLayout,
        children: [
            {
                path: "",
                name: "dashboard",
                component: DashboardView,
            },
            {
                path: "events",
                name: "Events",
                component: EventView,
            },
            {
                path: "venues",
                name: "Venues",
                component: VenueView,
            },
            {
                path: "attendees",
                name: "Attendees",
                component: AttendeeView,    
            }
        ]
    }
]  

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;