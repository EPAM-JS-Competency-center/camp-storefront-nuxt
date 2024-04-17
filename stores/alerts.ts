import { defineStore } from 'pinia'

interface State {
  alerts: {
    message: string
    type: string
  }[]
}

export default defineStore('alerts', {
  state: (): State => ({
    alerts: [],
  }),
  actions: {
    addAlert(alert: { message: string; type: string }): void {
      this.alerts.push(alert)
    },
    removeAlert(index: number): void {
      this.alerts.splice(index, 1)
    },
  },
})
