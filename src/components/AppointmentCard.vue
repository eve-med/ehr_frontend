<template>
  <div v-for="appointment in chunkedAppointments" className="grid grid-cols-4 grid-flow-col gap-4 my-8">
    <div
      v-for="data in appointment"
      class="w-72 max-w-sm h-72 bg-[#F8F8FE] border-l-8 rounded-lg flex items-center p-5"
      :style="{ 'border-left': data.severity === 5 ? '0.5rem solid #FA2' : '0.5rem solid #E45' }"
    >
      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <div className="font-medium">
          {{ shortName(data.patient.name) }}
          {{ data.patient.surname }}
        </div>
        <div className="text-right flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-xs text-light text-gray-400">DNI:</p>
            <p>
              {{ data.patient.dni }}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-light text-gray-400">Edad:</p>
            <p>
              {{ getAge(data.patient.born) }}
            </p>
          </div>
        </div>
        <div className="font-bold">{{ data.diagnosis }}</div>
        <div className="text-right flex flex-col">
          <p className="text-xs text-light text-gray-400">Espera:</p>
          <p>{{ time_passed[`${data.id}`] }}</p>
        </div>
        <div className="flex flex-col justify-evenly">
          <div>
            {{ data.admitted_by }}
          </div>
          <div>
            {{ data.specialty }}
          </div>
        </div>
        <div className="flex flex-col w-28 h-16 gap-1">
          <div v-if="attended[data.id]" className="flex h-1/2 w-full gap-1">
            <button v-on:click="attendPatient(data.id)" className="w-full h-full  bg-[#EDB8B8] rounded-md text-center flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-xmark" color="#EA495C" />
            </button>
            <router-link to="/about" className="w-full h-full bg-[#D8EEEB] rounded-md text-center flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-check" color="#76C3B5" />
            </router-link>
          </div>
          <div v-else className="h-1/2 w-full">
            <button v-on:click="attendPatient(data.id)" className="w-full h-full flex bg-[#EAE8FF] rounded-lg items-center justify-center">
              <p className="font-semibold text-[#647AD1]">Atender</p>
            </button>
          </div>
          <div className="flex w-full h-1/2 gap-x-1">
            <button className="bg-[#E8F9FF] w-1/2 h-full rounded-lg flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-clipboard-list" color="#649DD1" />
            </button>
            <button className=" bg-[#EEE5D8] w-1/2 h-full rounded-lg flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-layer-group" color="#C3A476" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { appoin } from '@/stores/index.js'

const getAppointments = async () => {
  if (appoin.appointments && appoin.appointments.length > 0) {
    return appoin.appointments
  }
  const response = await axios.get('patients/appointments/')
  appoin.appointments = response.data
  return response.data
}

export default defineComponent({
  name: 'AppointmentList',
  async setup() {
    const appointments = await getAppointments()
    return { appointments }
  },
  data() {
    return {
      appointments: [],
      time_passed: { string: String },
      color: { string: String },
      attended: { string: Boolean },
    }
  },

  mounted() {
    this.timePassed()
    this.getColor()
  },

  computed: {
    chunkedAppointments() {
      return this.chunk(this.appointments, 3)
    },
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60
    },
    _hours() {
      return this._minutes * 60
    },
    _days() {
      return this._hours * 24
    },
  },

  methods: {
    shortName(name) {
      if (name.split(' ').length > 1) {
        return name.split(' ')[0] + ' ' + name.split(' ')[1][0] + '.'
      }
      return name
    },
    chunk() {
      const chunked = []
      for (let i = 0; i < this.appointments.length; i += 4) {
        chunked.push(this.appointments.slice(i, i + 4))
      }
      return chunked
    },
    attendPatient(appointment_id) {
      this.attended[appointment_id] = !this.attended[appointment_id]
    },
    getColor() {
      this.appointments.forEach((appointment) => {
        const id = appointment.id
        if (appointment.severity === 5) {
          this.color[id] = 'border-red-500'
        } else if (appointment.severity === 10) {
          this.color[appointment.id] = 'border-yellow-500'
        } else {
          this.color[appointment.id] = 'border-green-500'
        }
      })
    },
    getAge(born) {
      const bornDate = new Date(born)
      const ageDifMs = Date.now() - bornDate.getTime()
      const ageDate = new Date(ageDifMs)
      return Math.abs(ageDate.getUTCFullYear() - 1970).toString()
    },
    timePassed() {
      setInterval(() => {
        this.appointments.forEach((appointment) => {
          const appointmentDate = new Date(appointment['create_date'])
          const timeDifMs = Date.now() - appointmentDate.getTime()
          const days = Math.floor(timeDifMs / this._days)
          const hours = Math.floor((timeDifMs % this._days) / this._hours)
          const minutes = Math.floor((timeDifMs % this._hours) / this._minutes)
          const seconds = Math.floor((timeDifMs % this._minutes) / this._seconds)
          if (hours > 0) {
            this.time_passed[appointment.id] = `${hours}h ${minutes}m`
            return
          }
          const id = appointment.id
          const time = `${minutes}m ${seconds}s`
          this.time_passed[id] = time
        })
      }, 1000)
    },
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
