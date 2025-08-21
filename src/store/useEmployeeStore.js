import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";
import api from "../api/api";
export const useEmployeeStore = defineStore('employeeStore', () => {
    const profile_url = 'http://localhost:3000/api/employee/insertProfile'
    const fetchProfileUrl = 'http://localhost:3000/api/employee/fetchProfile'
    const fetchEmployeeAllJobsUrl = 'http://localhost:3000/api/employee/fetchEmployeeAllJobs'
    const profileInfo = ref()
    const employeeJobsLength = ref(null)
    const employeeProgressUrl = 'http://localhost:3000/api/employee/fetchProfilePercentage'
    const allJobs = ref([])
    const profile_percentage = ref(null)
    const insertEmployeeProfile = async (param) => {
        try {
            const response = await api.post('/api/employee/insertProfile', {
                company_description: param.description,
                founded_year: param.founded_year,
                headquarters_location: param.headquarters,
                industry: param.industry,
                company_name: param.name,
                company_size: param.size
            }, { withCredentials: true })
            console.log(response);

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
    return { insertEmployeeProfile, fetchEmployeeProfile, fetchEmployeeAllJobs, fetchEmployeeProfileCompletionProgress, profileInfo, employeeJobsLength, allJobs, limitedJobs, profile_percentage }
})
