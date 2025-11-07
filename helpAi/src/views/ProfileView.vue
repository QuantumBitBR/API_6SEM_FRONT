<template>
    <DefaultLayout>
        <div class="profile_limit">
            <UserPhoto />
            <UserDetails />
        </div>
    </DefaultLayout>
</template>

<script>
import UserDetails from '@/components/UserDetails.vue';
import UserPhoto from '@/components/UserPhoto.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

    export default {
        name: 'ProfileView',
        components: {
            DefaultLayout,
            UserPhoto,
            UserDetails
        }
    }
</script>

<style scoped>
.profile_limit{
    width: 90%;
    height: 100%;
    margin: 0 auto;
}
</style>