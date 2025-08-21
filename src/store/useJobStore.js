import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import api from '../api/api'
export const jobStore = defineStore('jobs', () => {
    const jobsUrl = `http://localhost:3000/api/seeker/get/all/jobs`
    const applcationsUrl = `http://localhost:3000/api/seeker/get/seeker/applications`
    const fetchFavoriteJobsURL = 'http://localhost:3000/api/seeker/get/favorite/jobs'
    const applicantsURL = 'http://localhost:3000/api/employee/fetchApplicantsDetail'
    const jobApplicants = ref(null)
    const fetchJobs = async () => {
        try {
            const response = await api.get('/api/seeker/get/all/jobs', { withCredentials: true });
            return response.data;
        } catch (error) {
            // You can customize error handling here or just rethrow
            throw error;  // rethrow to let the caller handle it
        }
    };
    const fetchApplications = async () => {
        try {
            const response = await api.get('/api/seeker/get/seeker/applications', { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }
    const fetchFavoriteJobs = async () => {
        try {
            const response = await api.get('/api/seeker/get/favorite/jobs', { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }
    const fetchJobApplicants = async () => {
        try {
            const response = await api.get('/api/employee/fetchApplicantsDetail', { withCredentials: true })
            jobApplicants.value = response.data
            return response.data
        } catch (error) {
            throw error
        }
    }
    return { fetchJobs, fetchApplications, fetchFavoriteJobs, fetchJobApplicants, jobApplicants }
})