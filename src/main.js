import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

import "./assets/css/style.css";

import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Contact from "@/pages/Contact.vue";
import Company from "@/pages/Company.vue";

//creating routes

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/about",
		component: About,
	},
	{
		path: "/contact",
		component: Contact,
	},
	{
		path: "/company",
		component: Company,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
