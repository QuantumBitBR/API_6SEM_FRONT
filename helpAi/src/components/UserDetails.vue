<template>
    <template v-if="isLoading">
        <div class="skeleton-wrapper">
            <Skeleton width="100%" height="400px" borderRadius="30px" />
        </div>
    </template>
    <template v-else>
        <div class="details-container">
            <p class="box-title">Informações do Usuário</p>
            <div class="email-box">
                <EnvelopeIcon class="w-1 h-1 refresh" id="icon" />
                <div class="text-division">
                    <h3>Email:</h3>
                    <p id="email-text">{{user.email || "Carregando..."}}</p>
                </div>
            </div>
            <div class="role-box">
                <UserGroupIcon class="w-1 h-1 refresh" id="icon" />
                <div class="text-division">
                    <h3>Cargo:</h3>
                    <p id="email-text">{{user.role || "Carregando..."}}</p>
                </div>
            </div>
            <div class="buttons-box">
                <button @click="abrirTermos">Termos</button>
                <button @click="abrirReset">Trocar Senha</button>
            </div>
    
            <!-- Componente de Termos -->
            <UserPrivacy v-model:visible="showTermos" />
        </div>
        <ResetPassword v-model:visible="showReset" />
    </template>
</template>

<script>
import { EnvelopeIcon, UserGroupIcon } from '@heroicons/vue/16/solid';
import UserPrivacy from './UserPrivacy.vue';
import { Skeleton } from 'primevue';
import ResetPassword from './ResetPassword.vue';
export default {
    name: 'UserDetails',
    components: {
        EnvelopeIcon,
        UserGroupIcon,
        UserPrivacy,
        Skeleton,
        ResetPassword
    },
    props: {
        user: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            showTermos: false,
            isLoading: true,
            showReset: false
        };
    },
    methods: {
        abrirTermos() {
            this.showTermos = true;
        }, 
        abrirReset(){
            this.showReset = true;
        }
    },
    watch: {
        user: {
            handler(newVal) {
                this.isLoading = false;
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.skeleton-wrapper {
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-radius: 30px;
    overflow: hidden;
}

.details-container {
    width: 80%;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    height: 400px;
    border-radius: 30px;
    padding: 10px 30px;
    margin: 0 auto;
}
.box-title{
    font-size: larger;
}
.refresh {
    width: 40px;
    height: 40px;
    margin-right: 25px;
}
.email-box, .role-box {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
}
.email-box{
    background-color: #ccfdfc;
}
.role-box{
    background-color: #fddbcc;
}
.text-division{
    display: flex;
    flex-direction: column;
}
h3{
    font-size: large;
}
h3, #email-text {
    margin: 2px;
}
.buttons-box{
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 40px 0px;
}
button{
    width: 200px;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #34495e;
    color: white;
    font-size: large;
    cursor: pointer;
}
button:hover {
    background-color: #2c3e50;
}
</style>