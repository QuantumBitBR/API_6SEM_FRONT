<template>
    <DefaultLayout>
        <div class="profile_limit">
            <UserPhoto :user="userData"/>
            <UserDetails :user="userData"/>
        </div>
    </DefaultLayout>
</template>

<script>
import UserDetails from '@/components/UserDetails.vue';
import UserPhoto from '@/components/UserPhoto.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { UserAuthService } from '@/services/UserAuthService';

export default {
    name: 'ProfileView',
    components: {
        DefaultLayout,
        UserPhoto,
        UserDetails
    },
    data() {
        return {
            userService: new UserAuthService(),
            userData: null
        }
    },
    methods: {
        async getUserInfo() {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const userInfo = await this.userService.getUserByID(Number(localStorage.getItem('userId')));
                    console.log(userInfo);
                    this.userData = userInfo;
                } else {
                    console.error("User ID not found in localStorage");
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }
    },
    async mounted() {
        this.getUserInfo();
        console.log(this.userData);
    }
}
</script>

<style scoped>
.profile_limit {
    width: 90%;
    height: 85vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: start;
    justify-content: space-evenly;
}
</style>