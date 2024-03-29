const routes = [
    {
        path: "/",
        component: () => import("src/pages/Index.vue"),
    },
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
    },
];

export default routes;
