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
          <br />
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
        <div className="flex flex-col space-y-1">
          <div className="flex">
            <div v-if="attended[data.id]" className="flex space-x-1">
              <button v-on:click="attendPatient(data.id)" className="w-14 h-8 bg-[#EDB8B8] rounded-md text-center flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-xmark" color="#EA495C" />
              </button>
              <button className="w-14 h-8 bg-[#D8EEEB] rounded-md text-center flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-check" color="#76C3B5" />
              </button>
            </div>
            <button
              v-else
              v-on:click="attendPatient(data.id)"
              className="w-36 h-8 bg-[#EAE8FF] rounded-md text-center font-semibold text-[#647AD1] flex items-center justify-center "
            >
              Atender
            </button>
          </div>
          <div className="flex space-x-1">
            <button className="w-14 h-8 bg-[#E8F9FF] rounded-md text-center flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-clipboard-list" color="#649DD1" />
            </button>
            <button className="w-14 h-8 bg-[#EEE5D8] rounded-md text-center flex items-center justify-center">
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

const getAppointments = async () => {
  const response = await axios.get('http://localhost:8000/patients/appointments/')
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
