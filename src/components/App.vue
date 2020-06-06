<template>
  <div>
    <app-header />
    <div class="ui container">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
export default {
  name: "App",
  components: { AppHeader }
};
</script>
