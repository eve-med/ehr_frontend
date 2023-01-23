<template>
  <div v-for="appointment in chunkedAppointments" className="grid grid-cols-4 grid-flow-col gap-4 my-8">
    <div v-for="data in appointment" class="w-72 max-w-sm h-72 bg-[#F8F8FE] border-l-8 border-[#8D8D8D] rounded-lg flex items-center p-5">
      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <div className="font-medium">
          <p className="w-20 h-5 bg-gray-200 animate-pulse" />
          <br />
          <p className="w-20 h-5 bg-gray-200 animate-pulse" />
        </div>
        <div className="text-right">
          <p className="w-20 h-5 bg-gray-200 animate-pulse" />
          <br />
          <p className="w-20 h-5 bg-gray-200 animate-pulse" />
        </div>
        <div className="font-bold"><p className="w-20 h-5 bg-gray-200 animate-pulse" /></div>
        <div className="text-right"><p className="w-20 h-5 bg-gray-200 animate-pulse" /></div>
        <div className="flex flex-col justify-evenly">
          <div>
            <p className="w-20 h-5 bg-gray-200 animate-pulse" />
          </div>
          <div>
            <p className="w-20 h-5 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppointmentComp',
  setup() {
    return {
      chunkedAppointments: [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ],
    }
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
