<template>
  <main>
    <div v-if="showNoCompanyModal === false" class="">
      <!-- Viewing Details for Company name: {{ company.name }} -->
      <!-- <test-company-profile /> -->
      <company-details :company="company" />
    </div>
    <div v-else class="border h-screen flex justify-center items-center">
      <no-companies />
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useComapnyStore } from "../store/companyStore";
import NoCompanies from "./No-companies.vue";
import testCompanyProfile from "../views/employee_profile/testCompanyProfile.vue";
import CompanyDetails from "../views/employee_profile/CompanyDetails.vue";
const store = useComapnyStore();
const id = parseInt(useRoute().params.id);
const company = ref({});
const showNoCompanyModal = ref(false);

onMounted(async () => {
  await store.fetchCompanyProfile();
  let companyObj = store?.companyProfile?.find(
    (comp) => comp.company_id === id
  );
  if (!companyObj) {
    showNoCompanyModal.value = true;
    return;
  }
  company.value = companyObj;
});
</script>