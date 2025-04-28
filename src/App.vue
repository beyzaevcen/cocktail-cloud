<script setup>
import Navbar from './components/Navbar.vue';  // Navbar bileşenini içe aktar
</script>

<template>
    <div>
      <Navbar />  <!-- Navbar'ı buraya ekliyoruz -->
      <router-view />  <!-- Sayfa bileşenlerinin görüntüleneceği yer -->
    </div>
  </template>
  

  