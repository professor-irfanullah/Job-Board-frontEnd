import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAuthStore = defineStore('auth', () => {
    const url = 'http://localhost:3000/api/auth/protected'
    const signOutUrl = "http://localhost:3000/api/auth/logout";
    const loginUrl = 'http://localhost:3000/api/auth/login'

    const isAuthenticated = ref(false)
    const user = ref(null)
    const error = ref(null)
    const message = ref(null)
    const userAuthStatus = async () => {
        try {
            const response = await axios.post(url, {}, { withCredentials: true })
            user.value = response.data
            isAuthenticated.value = true
            return true
        }
        catch (err) {
            user.value = null
            error.value = err.response
            isAuthenticated.value = false
            return false
        }
    }

    const login = async (email, password) => {
        try {
            const response = await axios.post(loginUrl, { email: email, password: password }, { withCredentials: true })
            message.value = response.data
            isAuthenticated.value = true
            error.value = null
            return response.data
        } catch (err) {
            error.value = err
            return err.response.data.err
        }
    }

    const logOut = async (email, password) => {
        try {
            const response = await axios.post(signOutUrl, {}, { withCredentials: true })
            message.value = response.data
            isAuthenticated.value = false
            error.value = null
            return response.data
        } catch (err) {
            error.value = err
            return err.response.data.err
        }
    }
    return { isAuthenticated, user, message, userAuthStatus, login, logOut, error }
})