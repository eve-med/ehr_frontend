<template>
  <Suspense>
    <template #default>
      <AppointmentCard />
    </template>
    <template #fallback>
      <AppointmentCardSkeleton />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppointmentCard from '@/components/AppointmentCard.vue'
import AppointmentCardSkeleton from '@/components/AppointmentCardSkeleton.vue'

export default defineComponent({
  name: 'HelloWorld',
  return: {
    appointments: Object,
    now: Date.now(),
  },
  components: {
    AppointmentCard,
    AppointmentCardSkeleton,
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
