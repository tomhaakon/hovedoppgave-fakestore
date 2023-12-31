//import
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore.js"; 
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import AboutView from "../views/AboutView.vue";
import MyPageView from "../views/MyPageView.vue";
import ShoppingCartView from "../views/ShoppingCartView.vue";
import UserView from "@/views/UserView.vue";
import ShowSingleProduct from "@/views/ShowSingleProduct.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/thanks",
    name: "thanks",
    component: UserView,
  },
  {
    path: "/item",
    name: "showsingleproduct",
    component: ShowSingleProduct,
  },

  {
    path: "/register",
    name: "register",
    component: UserView,
  },
  {
    path: "/login",
    name: "login",
    component: UserView,
  },
  {
    path: "/product",
    name: "product",
    component: ProductView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPageView,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();

      if (userStore.isLoggedIn) {
        next(); // user is logged in, allow access
      } else {
        next("/login"); // user is not logged in, redirect to login
      }
    },
  },
  {
    path: "/shoppingcart",
    name: "shoppingcart",
    component: ShoppingCartView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
