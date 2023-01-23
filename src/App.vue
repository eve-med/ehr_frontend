<template>
  <div id="wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
  html {
    font-family: Poppins, system-ui, sans-serif;
  }
}
</style>
