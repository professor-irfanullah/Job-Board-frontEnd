import { defineStore } from 'pinia'
import api from '../api/api'
import { ref } from 'vue'
export const useComapnyStore = (defineStore('company', () => {
    const companiesForSeekers = ref([])
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
                logo_url: params.logo_url,
                address: params.address,
                industry: params.industry,
                company_size: params.company_size
            }, { withCredentials: true })
            return response.data
        } catch (error) {
            throw error
        }
    }
    const updateCompanyProfile = async (params) => {
        if (!params) return 'Insufficient query Parameters';

        try {
            const response = await api.post('/api/employee/update/company',
                {
                    name: params.name,
                    description: params.description,
                    company_size: params.company_size,
                    industry: params.industry,
                    address: params.address,
                    company_id: parseInt(params.company_id)
                }, { withCredentials: true }
            )
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
    const addTechnologyToCompany = async (name, id) => {
        if (!name) {
            throw new Error('Technology name  is required')
        }
        if (!id) {
            throw new Error('Company ID is required')
        }

        try {
            const response = await api.post('/api/employee/add/technology',
                {
                    name: name,
                    company_id: id
                }
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    const removeTechnologyFromCompany = async (tech_id, company_id) => {
        if (!tech_id) {
            throw new Error("Technology ID is required")
        }

        if (!company_id) {
            throw new Error("Company ID is required")
        }

        try {
            const response = await api.delete(`/api/employee/delete/technology?techID=${tech_id}&company_id=${company_id}`)
            return response.data
        }
        catch (error) {
            throw error
        }
    }

    const fetchAllCompanies = async () => {
        try {
            const response = await api.get('/api/seeker/get/all/companies')
            companiesForSeekers.value = response.data
            return companiesForSeekers.value
        } catch (error) {
            throw error
        }
    }
    return { fetchCompanyProfile, companyProfile, addCompany, deleteCompany, updateCompanyProfile, addTechnologyToCompany, removeTechnologyFromCompany, fetchAllCompanies }
})) 