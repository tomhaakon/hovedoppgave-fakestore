<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
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
        <div class="flex-1 px-2 mx-2">
          <span class="px-2"><RouterLink to="/">L0G0</RouterLink> </span>
          <p class="font-bold">Bjørgs EL-Shappe</p>
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
      <div class="p-5 flex justify-center">
        <ProductDialog class="z-30 w-full top-16 bg-red-500 fixed shadow-xl" />
        <RouterView :class="{ 'modal-mask': blurBg }" />
      </div>
      <div class="text-center pb-28">
        <div>
          <p class="text-sm black">
            this is a footer <br />
            follow us on sosial media!
          </p>
        </div>
        <div class="pt-5">
          <a href="#" class="fa fa-facebook px-3"></a>
          <a href="#" class="fa fa-twitter px-3"></a>
          <a href="#" class="fa fa-instagram px-3"></a>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>

      <ul class="pl-10 space-y-2 p-4 w-80 h-full bg-base-200">
        <!-- Sidebar content here -->
        <li class="py-5 rounded-none bg-transparent">
          <RouterLink to="/">LOGO</RouterLink>
        </li>
        <li class="text-2xl"><RouterLink to="/">Home</RouterLink></li>
        <li class="text-2xl">
          <RouterLink to="/product">Products</RouterLink>
        </li>
        <li class="text-2xl"><RouterLink to="/about">About us</RouterLink></li>
        <li class="pt-10"><RouterLink to="/mypage">My page</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import ProductDialog from "./components/ProductDialog.vue";
import { useProductStore } from "./stores/Productstore";

const productStore = useProductStore();
const blurBg = computed(() => productStore.showDialog);
console.log("blurBg=", blurBg);
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
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
</style>
