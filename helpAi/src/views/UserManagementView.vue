<template>
    <DefaultLayout>
        <!-- Adicionar aqui o componente de pesquisa -->
        <UserList/>
    </DefaultLayout>
</template>

<script>
import UserList from '@/components/UserList.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

    export default {
        name: "UserManagementView",
        components: {
            DefaultLayout,
            UserList
        },
        data() {
            return {
                
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>