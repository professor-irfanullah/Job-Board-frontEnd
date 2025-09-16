import { defineStore } from 'pinia'
import api from '../api/api'
import { ref } from 'vue'
export const useComapnyStore = (defineStore('company', () => {
    const companyProfile = ref(null)
    const fetchCompanyProfile = async () => {
        try {
            const response = await api.get('/api/employee/fetch/employ/company', { withCredentials: true })
            return companyProfile.value = response.data
        }
        catch (err) {
            throw err
        }
    }

    const addCompany = async (params) => {
        if (!params) {
            throw new Error('Company Inputs are missing!')
        }
        try {
            const response = await api.post('/api/employee/add/company', {
                name: params.name,
                description: params.description,
                website_url: params.website_url,
                logo_url: params.logo_url
            }, { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }
    const deleteCompany = async (companyID) => {
        if (!companyID) {
            throw new Error("Company ID missing")
        }
        try {
            const response = await api.delete(`/api/employee/delete/company?company_id=${companyID}`, { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }
    return { fetchCompanyProfile, companyProfile, addCompany, deleteCompany }
})) 