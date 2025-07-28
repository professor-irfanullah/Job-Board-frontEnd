import { defineStore } from 'pinia'
import axios from 'axios'
export const jobStore = defineStore('jobs', () => {
    const jobsUrl = `http://localhost:3000/api/seeker/get/all/jobs`
    const applcationsUrl = `http://localhost:3000/api/seeker/get/seeker/applications`

    const fetchJobs = async () => {
        try {
            const response = await axios.get(jobsUrl, { withCredentials: true });
            return response.data;
        } catch (error) {
            // You can customize error handling here or just rethrow
            throw error;  // rethrow to let the caller handle it
        }
    };
    const fetchApplications = async () => {
        try {
            const response = await axios.get(applcationsUrl, { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }
    return { fetchJobs, fetchApplications }
})