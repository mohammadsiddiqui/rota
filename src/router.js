import VueRouter from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Details from "./views/Details.vue";
import Addtime from "./views/Addtime.vue";

const baseRoutes = [
	{ path: "/", component: Home, meta: { auth: true } },
	{ path: "/login", component: Login, meta: { auth: false } },
	{ path: "/profile", component: Profile, meta: { auth: true } },
	{ path: "/details", component: Details, meta: { auth: true } },
	{ path: "/add", component: Addtime, meta: { auth: true } },
];

const routes = baseRoutes.concat([]);

const scrollBehavior = function (to, from, savedPosition) {
	if (savedPosition) {
		return savedPosition;
	} else {
		return { x: 0, y: 0 };
	}
};

let router = new VueRouter({
	mode: "history",
	routes: routes,
	scrollBehavior,
});

router.beforeEach(async (to, from, next) => {
	let matched = to.matched.some((res) => res.meta.auth);
	if (matched) {
		if (store.state.user) {
			next();
			return;
		}
		next("/login");
		return;
	} else if (store.state.user && !to.meta.auth) {
		next("/");
		return;
	}

	next();
});

export default router;
