import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import AboutView from "../views/AboutView.vue";
import MyPageView from "../views/MyPageView.vue";
import ShoppingCartView from "../views/ShoppingCartView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
    },
    {
      path: "/shoppingcart",
      name: "shoppingcart",
      component: ShoppingCartView,
    },
  ],
});

export default router;
