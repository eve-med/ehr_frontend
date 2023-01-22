<template>
  <div className="flex w-screen px-10 pt-10 flex-col">
    <div className="flex h-28 w-full mb-3 border-b-2 flex-col justify-between">
      <div className="flex h-10 w-full justify-between items-center ">
        <div className="font-bold text-2xl">Pacientes</div>
        <div className="w-96 flex justify-between">
          <div className="w-20 h-14 flex items-center justify-between">
            <div className="w-8 h-8 flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-grip" />
            </div>
            <div className="w-0.5 h-8 bg-gray-100"></div>
            <div className="w-8 h-8 flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-list" />
            </div>
          </div>
          <div className="w-72">
            <form>
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="buscar"
                  id="default-search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar paciente"
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex">
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
    </div>
    <Suspense>
      <template #default>
        <AppointmentComp />
      </template>
      <template #fallback>
        <AppointmentCompSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppointmentComp from '@/components/AppointmentComp.vue'
import AppointmentCompSkeleton from '@/components/AppointmentCompSkeleton.vue'

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      appointments: Object,
      now: Date.now(),
    }
  },
  components: {
    AppointmentComp,
    AppointmentCompSkeleton,
  },

  methods: {},
})
</script>
