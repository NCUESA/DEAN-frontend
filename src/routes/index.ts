import { createRouter, RouteRecordRaw, RouterOptions, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "",
        component: () => import("../views/CoursesView.vue")
    }
]

const options: RouterOptions = {
    routes: routes,
    history: createWebHistory(),
}

export const router = createRouter(options);