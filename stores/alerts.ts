import { defineStore } from 'pinia'
import { ALERT_TYPE } from '~/types/enums'

interface Alert {
  message: string
  type: ALERT_TYPE
}

interface State {
  alerts: Alert[]
}

export default defineStore('alerts', {
  state: (): State => ({
    alerts: [],
  }),
  actions: {
    addAlert(alert: Alert): void {
      this.alerts.push(alert)
    },
    removeAlert(index: number): void {
      this.alerts.splice(index, 1)
    },
  },
})
