<template>
  <div v-for="appointment in appointments">
    <div
      className="h-20 w-full mb-3 rounded-lg border-l-[10px] flex items-center bg-[#F4F4F8]"
      :style="{ 'border-left': appointment.severity === 5 ? '0.75rem solid #FA2' : '0.75rem solid #E45' }"
    >
      <div className="pl-16 grid grid-cols-8 grid-rows-1 w-full items-center">
        <p>{{ appointment.patient.dni }}</p>
        <p>{{ appointment.patient.name }}</p>
        <p className="justify-self-center">{{ getAge(appointment.patient.born) }}</p>
        <p>{{ appointment.diagnosis }}</p>
        <p className="justify-self-center">{{ appointment.admitted_by }}</p>
        <p>{{ appointment.specialty }}</p>
        <p>{{ time_passed[`${appointment.id}`] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

const getAppointments = async () => {
  const response = await axios.get('http://localhost:8000/patients/appointments/')
  return response.data
}

export default defineComponent({
  name: 'AppointmentComp',
  async setup() {
    const appointments = await getAppointments()
    return { appointments }
  },
  data() {
    return {
      appointments: [],
      time_passed: {},
      color: {},
    }
  },

  mounted() {
    this.timePassed()
    this.getColor()
  },

  computed: {
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
    getColor() {
      this.appointments.forEach((appointment: any) => {
        if (appointment.severity === 5) {
          this.color[appointment.id] = 'border-red-500'
        } else if (appointment.severity === 10) {
          this.color[appointment.id] = 'border-yellow-500'
        } else {
          this.color[appointment.id] = 'border-green-500'
        }
      })
    },
    getAge(born: string) {
      const bornDate = new Date(born)
      const ageDifMs = Date.now() - bornDate.getTime()
      const ageDate = new Date(ageDifMs)
      return Math.abs(ageDate.getUTCFullYear() - 1970).toString()
    },
    timePassed() {
      setInterval(() => {
        this.appointments.forEach((appointment: any) => {
          const appointmentDate = new Date(appointment['create_date'])
          const timeDifMs = Date.now() - appointmentDate.getTime()
          const days = Math.floor(timeDifMs / this._days)
          const hours = Math.floor((timeDifMs % this._days) / this._hours)
          const minutes = Math.floor((timeDifMs % this._hours) / this._minutes)
          const seconds = Math.floor((timeDifMs % this._minutes) / this._seconds)
          this.time_passed[appointment.id] = `${minutes}m ${seconds}s`
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
