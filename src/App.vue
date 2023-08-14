<template>
  <div :class="{ overlay: blurBg }" class="z-40 backdrop-blur-sm"></div>
  <ProductDialog />
  <div>
    <div class="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        class="drawer-toggle"
        ref="drawerCheckbox"
      />
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="w-full navbar bg-base-100">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
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
          <div class="flex-1 px-2 mx-2 w-full">
            <div class="w-1/4">
              <span class="px-2"><RouterLink to="/">L0G0</RouterLink> </span>
            </div>
            <div class="w-2/4">
              <p class="font-bold">NETTBUTIKK</p>
            </div>
            <div class="w-1/4 justify-end flex">
              <RouterLink to="/shoppingcart">
                <span class="uppercase font-bold text-sm"
                  >cart({{ shoppingCartStore.cartItemCount }})</span
                >
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
        </div>
        <!-- Page content here -->
        <div :class="{ fixed: blurBg }">
          <RouterView />
        </div>
        <div class="text-center pb-28 pt-14">
          <div>
            <p class="text-sm black">
              this is a footer <br />
              follow us on sosial media!
            </p>
          </div>
          <div class="pt-5">
            <a href="#" class="fa fa-facebook invert px-3"></a>
            <a href="#" class="fa fa-twitter invert px-3"></a>
            <a href="#" class="fa fa-instagram invert px-3"></a>
          </div>
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="pl-10 space-y-2 p-4 w-80 h-full bg-base-200">
          <!-- Sidebar content here -->
          <li class="py-5 rounded-none bg-transparent">
            <RouterLink to="/" @click="handleClick()">LOGO</RouterLink>
          </li>
          <li class="text-2xl">
            <RouterLink to="/" @click="handleClick()">Home</RouterLink>
          </li>
          <li class="text-2xl">
            <RouterLink to="/product" @click="handleClick()"
              >Products</RouterLink
            >
          </li>
          <li class="text-2xl">
            <RouterLink to="/about" @click="handleClick()">About us</RouterLink>
          </li>
          <ul class="pt-10 space-y-3" v-if="userStore.user">
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
import { computed, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import ProductDialog from "./components/ProductDialog.vue";
import { useProductStore } from "./stores/Productstore";
import { useShoppingCartStore } from "./stores/Shoppingcartstore";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const shoppingCartStore = useShoppingCartStore();
const productStore = useProductStore();
const blurBg = computed(() => productStore.showDialog);
const drawerCheckbox = ref(null);

const handleClick = () => {
  drawerCheckbox.value.checked = !drawerCheckbox.value.checked;
};
//console.log("blurBg=", blurBg);
//<a on:click={() => {document.getElementById('my-drawer-3').click()}}  href='/test'>Test</a>
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
