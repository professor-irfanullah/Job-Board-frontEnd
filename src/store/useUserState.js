import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAuthStore = defineStore('auth', () => {
    const url = 'http://localhost:3000/api/auth/protected'
    const signOutUrl = "http://localhost:3000/api/auth/logout";
    const loginUrl = 'http://localhost:3000/api/auth/login'
    const userInfoUrl = 'http://localhost:3000/api/seeker/profile-info'
    const postUserProfileInformationUrl = 'http://localhost:3000/api/seeker/insert/profile/record'

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
            const response = await axios.post(url, {}, { withCredentials: true })
            user.value = response.data
            isAuthenticated.value = true
            console.clear()
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
            const response = await axios.post(loginUrl, { email: email, password: password }, { withCredentials: true })
            message.value = response.data
            isAuthenticated.value = true
            error.value = null
            return response.data
        } catch (err) {
            error.value = err
            isAuthenticated.value = false
            message.value = null
            return err.response.data.err
        }
    }

    const logOut = async () => {
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
    const getUserInformation = async () => {
        try {
            userInfo.value = null
            const response = await axios.get(userInfoUrl, { withCredentials: true })
            userInfo.value = response.data
            return userInfo.value
        } catch (error) {
            userInfo.value = null
            return null
        }
    }
    const postUserProfileInformation = async (userProfileInfo) => {
        if (!userProfileInfo) return undefined
        try {
            const response = await axios.post(
                postUserProfileInformationUrl,
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