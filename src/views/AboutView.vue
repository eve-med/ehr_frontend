<template>
  <div className="w-screen h-screen flex flex-col justify-center items-center">
    <div v-on:click="isVisible = !isVisible" className="w-1/4 flex items-center pl-4 border-2 rounded-md py-2 justify-around">
      <span v-if="selectedDiagnose">{{ selectedDiagnose }}</span>
      <span v-else>Seleccionar Diagnostico</span>
      <font-awesome-icon v-if="isVisible" icon="fa-solid fa-chevron-up" />
      <font-awesome-icon v-else icon="fa-solid fa-chevron-down" />
    </div>
    <div className="w-1/4 pt-5 border-2 flex flex-col items-center" v-if="isVisible">
      <form className="w-4/5">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            v-model="strSearch"
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            placeholder="Buscar diagnosticos..."
            required
          />
        </div>
      </form>
      <div class="w-4/5">
        <ul class="divide-y divide-gray-200 overflow-y-scroll max-h-80 mb-5">
          <li v-on:click="selectItem(item)" v-for="item in diagnoses" className="flex w-full py-2 items-center">
            <p class="text-md text-gray-900">{{ item }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'AboutView',
  data() {
    return {
      strSearch: null,
      diagnoses: [],
      selectedDiagnose: '',
      isVisible: false,
    }
  },
  watch: {
    strSearch: function () {
      this.getResults()
    },
  },
  methods: {
    getResults() {
      const url = 'http://localhost:8000/icd/search/?q='
      axios.get(url + this.strSearch).then((response) => {
        if (response.data.length === 0) {
          return
        }
        this.diagnoses = response.data
        console.log(this.diagnoses)
      })
    },
    selectItem(item: string) {
      this.selectedDiagnose = item
    },
  },
})
</script>
