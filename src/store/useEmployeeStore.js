import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "../api/api";
export const useEmployeeStore = defineStore('employeeStore', () => {
    const profileInfo = ref()
    const employeeJobsLength = ref(null)
    const allJobs = ref([])
    const profile_percentage = ref(null)
    const insertEmployeeProfile = async (param) => {
        if (!param) {
            throw new Error('Input fields are missing')
        }
        try {
            const response = await api.post('/api/employee/insertProfile', {
                headline: param.headline,
                about: param.about
            }, { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }
    const fetchEmployeeProfile = async () => {
        try {
            const response = await api.get('/api/employee/fetchProfile', { withCredentials: true })
            profileInfo.value = response.data.data[0]
        } catch (error) {
            throw error
        }
    }

    const fetchEmployeeAllJobs = async () => {
        try {
            const response = await api.get('/api/employee/fetchEmployeeAllJobs', { withCredentials: true })
            employeeJobsLength.value = response.data.length
            allJobs.value = response.data
            return response.data
        } catch (error) {
            throw error
        }
    }
    const fetchEmployeeProfileCompletionProgress = async () => {
        try {
            const response = await api.get('/api/employee/fetchProfilePercentage', { withCredentials: true })
            profile_percentage.value = response.data[0]
        } catch (error) {
            throw error
        }
    }

    const limitedJobs = computed(() => {
        return allJobs.value.slice(0, 5)
    })

    const verifyApplication = async (status, app_id) => {
        if (!status) {
            const err = new Error("application status is required...")
            err.status = 400
            return err
        }
        if (!parseInt(app_id)) {
            const err = new Error('application_id is requried..')
            err.status = 400
            return err
        }

        try {
            const response = await api.post('/api/employee/verify/application',
                {
                    application_id: app_id,
                    application_status: status
                },
                { withCredentials: true }
            )
            return response.data
        } catch (error) {
            throw error.response
        }

    }
    return { insertEmployeeProfile, fetchEmployeeProfile, fetchEmployeeAllJobs, fetchEmployeeProfileCompletionProgress, profileInfo, employeeJobsLength, allJobs, limitedJobs, profile_percentage, verifyApplication }
})
