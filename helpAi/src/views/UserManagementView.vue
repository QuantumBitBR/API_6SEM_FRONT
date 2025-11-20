<template>
    <DefaultLayout>
        <!-- Componente de pesquisa -->
        <UserSearch @search="handleSearch" />

        <!-- Componente de lista com prop de filtro -->
        <UserList :email-filter="searchFilter" />
    </DefaultLayout>
</template>

<script>
import UserList from '@/components/UserList.vue';
import UserSearch from '@/components/UserSearch.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
    name: "UserManagementView",
    components: {
        DefaultLayout,
        UserList,
        UserSearch
    },
    data() {
        return {
            searchFilter: ''
        }
    },
    methods: {
        handleSearch(email) {
            this.searchFilter = email;
        }
    }
}
</script>

<style scoped>
</style>
