import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserState = defineStore('profile', () => {
    const url = 'http://localhost:3000/api/auth/protected'
    const user = ref(null)
    const err = ref(null)

    const fetchUser = async () => {
        try {
            const response = await axios.post(url, {}, { withCredentials: true })
            // console.log(response);
            user.value = response.data
            return user.value
        } catch (error) {
            // console.error(error);
            err.value = error.response.data
            return err.value
        }
    }
    return { user, err, fetchUser }
}) 