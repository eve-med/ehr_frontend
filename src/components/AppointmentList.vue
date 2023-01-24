<template>
  <div v-for="appointment in appointments">
    <div
      className="h-20 w-full mb-3 rounded-lg border-l-[10px] flex items-center bg-[#F4F4F8]"
      :style="{ 'border-left': appointment.severity === 5 ? '0.75rem solid #FA2' : '0.75rem solid #E45' }"
    >
      <div className="pl-16 grid grid-cols-8 grid-rows-1 w-full items-center">
        <p>{{ appointment.patient.dni }}</p>
        <p>{{ shortName(appointment.patient.name) }} {{ appointment.patient.surname }}</p>
        <p className="justify-self-center">{{ getAge(appointment.patient.born) }}</p>
        <p>{{ appointment.diagnosis }}</p>
        <p className="justify-self-center">{{ appointment.admitted_by }}</p>
        <p>{{ appointment.specialty }}</p>
        <p>{{ time_passed[`${appointment.id}`] }}</p>
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-4">
            <div v-if="attended[appointment.id]" className="flex space-x-4">
              <button v-on:click="attendPatient(appointment.id)" className="w-16 h-8 bg-[#EDB8B8] rounded-md text-center flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-xmark" color="#EA495C" />
              </button>
              <button className="w-16 h-8 bg-[#D8EEEB] rounded-md text-center flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-check" color="#76C3B5" />
              </button>
            </div>
            <button
              v-else
              v-on:click="attendPatient(appointment.id)"
              className="w-36 h-8 bg-[#EAE8FF] rounded-md text-center font-semibold text-[#647AD1] flex items-center justify-center "
            >
              Atender
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="w-16 h-8 bg-[#E8F9FF] rounded-md text-center flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-clipboard-list" color="#649DD1" />
            </button>
            <button className="w-16 h-8 bg-[#EEE5D8] rounded-md text-center flex items-center justify-center">
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
  const response = await axios.get('http://18.213.63.69:8000/patients/appointments/')
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
    attendPatient(appointment_id) {
      console.log(this.attended[appointment_id])
      console.log(!this.attended[appointment_id])
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
