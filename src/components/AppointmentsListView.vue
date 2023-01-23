<template>
  <div className="flex border-b-2 mb-3">
    <div className="pr-10">Urg.</div>
    <div className="grid grid-cols-8 grid-rows-1 w-full">
      <p>DNI</p>
      <p>Nombre</p>
      <p className="justify-self-center">Edad</p>
      <p>Diagnostico</p>
      <p className="justify-self-center">Ingreso</p>
      <p>Especialidad</p>
      <p>Esperando</p>
    </div>
  </div>
  <Suspense>
    <template #default>
      <AppointmentList />
    </template>
    <template #fallback>
      <AppointmentListSkeleton />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppointmentList from '@/components/AppointmentList.vue'
import AppointmentListSkeleton from '@/components/AppointmentListSkeleton.vue'

export default defineComponent({
  name: 'HelloWorld',
  return: {
    appointments: Object,
    now: Date.now(),
  },
  components: {
    AppointmentList,
    AppointmentListSkeleton,
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
