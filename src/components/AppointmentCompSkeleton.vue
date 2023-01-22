<template>
  <div v-for="appointment in appointments">
    <div className="h-20 w-full bg-[#F4F4F8] mb-3 rounded-lg border-l-[12px] border-[#8D8D8D] flex items-center animate-pulse">
      <div className="pl-16 grid grid-cols-8 grid-rows-1 w-full items-center">
        <p className="w-20 h-5 bg-gray-200 animate-pulse" />
        <p className="w-40 h-5 bg-gray-200 animate-pulse" />
        <p className="justify-self-center w-5 h-5 bg-gray-200 animate-pulse" />
        <p className="w-40 h-5 bg-gray-200 animate-pulse" />
        <p className="justify-self-center w-20 h-5 bg-gray-200 animate-pulse" />
        <p className="w-24 h-5 bg-gray-200 animate-pulse" />
        <p className="w-10 h-5 bg-gray-200 animate-pulse" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppointmentComp',
  setup() {
    return { appointments: [1, 2, 3, 4, 5, 6, 7, 8] }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
