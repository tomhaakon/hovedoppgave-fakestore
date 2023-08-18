<template>
  <div :class="{ overlay: blurBg }" class="z-40 backdrop-blur-sm"></div>
  <Notification />
  <ProductDialog />
  <div class="">
    <div class="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        class="drawer-toggle"
        ref="drawerCheckbox"
      />
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="navbar bg-base-100 p-4">
          <div class="flex w-full">
            <div class="w-full">
              <RouterLink to="/">
                <img src="@/assets/logo-black.png" class="w-40" />
              </RouterLink>
            </div>
          </div>
          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal">
              <!-- Navbar menu content here -->
              <li><a>Products</a></li>
              <li><a>About us</a></li>
              <li><a>My page</a></li>
            </ul>
          </div>
          <!-- 
            <button :disabled="isDisabled">asdasd</button> -->
        </div>
        <!-- Page content here -->
        <div class="">
          <div :class="{ fixed: blurBg }">
            <div class="flex">
              <div class="lg:hidden">
                <label for="my-drawer-3" class="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-6 h-6 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <SearchBar />
            </div>
            <div class="w-full flex justify-end px-4">
              <RouterLink to="/shoppingcart">
                <span class="uppercase font-bold text-sm"
                  >cart({{ shoppingCartStore.cartItemCount }})</span
                >
              </RouterLink>
            </div>
            <RouterView class="min-h-[calc(100vh-260px)]" />
            <!-- footer here -->
            <Footer class="" />
          </div>
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="pl-10 space-y-2 p-4 w-80 h-full bg-base-200">
          <!-- Sidebar content here -->
          <li class="py-5 rounded-none bg-transparent">
            <RouterLink to="/" @click="handleClick()">
              <img src="@/assets/icon2.png" />
            </RouterLink>
          </li>
          <li class="text-2xl">
            <RouterLink to="/" @click="handleClick()">Home</RouterLink>
          </li>
          <li class="text-2xl">
            <RouterLink to="/product" @click="handleClick()">
              Products
            </RouterLink>
          </li>
          <li class="text-2xl">
            <RouterLink to="/about" @click="handleClick()">About us</RouterLink>
          </li>
          <ul class="pt-10 space-y-3" v-if="userStore.isLoggedIn">
            <li>
              <RouterLink to="/mypage" @click="handleClick()">
                My page
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/" @click="handleClick(), userStore.logout()">
                Logout
              </RouterLink>
            </li>
          </ul>
          <ul class="pt-10 space-y-3" v-else>
            <li>
              <RouterLink to="/login" @click="handleClick()">Login</RouterLink>
            </li>
            <li>
              <RouterLink to="/register" @click="handleClick()"
                >Register</RouterLink
              >
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import ProductDialog from "./components/ProductDialog.vue";
import { useProductStore } from "./stores/Productstore";
import { useShoppingCartStore } from "./stores/Shoppingcartstore";
import { useUserStore } from "@/stores/UserStore";
import Notification from "@/components/Notification.vue";
import SearchBar from "@/components/SearchBar.vue";
import Footer from "@/components/Footer.vue";

const userStore = useUserStore();
const shoppingCartStore = useShoppingCartStore();
const productStore = useProductStore();
const blurBg = computed(() => productStore.showDialog);
const drawerCheckbox = ref(null);

const handleClick = () => {
  drawerCheckbox.value.checked = !drawerCheckbox.value.checked;
};
</script>
<style scoped>
/* Style all font awesome icons */
.fa {
  font-size: 25px;
  width: 50px;
  text-align: center;
  text-decoration: none;
}
/* Add a hover effect if you want */
.fa:hover {
  opacity: 0.7;
}
/* Set a specific color for each brand */
/* Facebook */
.fa-facebook {
  color: white;
}
/* Twitter */
.fa-twitter {
  color: white;
}
.fa-instagram {
  color: white;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
