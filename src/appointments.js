import axios from 'axios'
import { ref } from 'vue'

const getAppointments = async () => {
  if (this.appointments.length === 0) {
    const response = await axios.get('patients/appointments/')
    this.appointments = response.data
  }
  return this.appointments
}

export default {
  appointments: [],
  getAppointments,
}
