import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/api'
export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const user = ref(null)
    const error = ref(null)
    const message = ref(null)
    const profile_url = ref(null)
    const userInfo = ref(null)
    const userAuthStatus = async () => {
        try {
            user.value = null
            isAuthenticated.value = null
            const response = await api.post('/api/auth/protected', {}, { withCredentials: true })
            user.value = response.data
            isAuthenticated.value = true
            return true
        }
        catch (err) {
            user.value = null
            error.value = err.response
            isAuthenticated.value = false
            console.clear()
            return false
        }
    }

    const login = async (email, password) => {
        isAuthenticated.value = false

        try {
            const response = await api.post('/api/auth/login', { email: email, password: password }, { withCredentials: true })
            isAuthenticated.value = true
            return response.data
        } catch (err) {
            throw err
        }
    }

    const logOut = async () => {
        try {
            const response = await api.post('/api/auth/logout', {}, { withCredentials: true })
            message.value = response.data
            isAuthenticated.value = false
            error.value = null
            return response.data
        } catch (err) {
            error.value = err
            return err.response.data.err
        }
    }
    const getUserInformation = async () => {
        if (isAuthenticated.value === true && user?.value?.user?.role === 'seeker') {
            try {
                userInfo.value = null
                const response = await api.get('/api/seeker/profile-info', { withCredentials: true })
                userInfo.value = response.data
                return userInfo.value
            } catch (error) {
                userInfo.value = null
                return null
            }
        }
    }
    const postUserProfileInformation = async (userProfileInfo) => {
        if (!userProfileInfo) return undefined
        try {
            const response = await api.post(
                '/api/seeker/insert/profile/record',
                {
                    bio: userProfileInfo.about,
                    headline: userProfileInfo.headline,
                    location: userProfileInfo.location,
                    linkedin_url: userProfileInfo.linkedin_url,
                    github_url: userProfileInfo.github_url,
                },
                { withCredentials: true }
            );
            return response.data
        } catch (error) {
            return error.response.data.err
        }
    }
    return { isAuthenticated, user, message, userAuthStatus, login, logOut, error, getUserInformation, profile_url, userInfo, postUserProfileInformation }
})