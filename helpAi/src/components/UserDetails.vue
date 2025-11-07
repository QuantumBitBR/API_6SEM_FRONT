<template>
    <div class="details-container">
        <p class="box-title">Informações do Usuário</p>
        <div class="email-box">
            <EnvelopeIcon class="w-1 h-1 refresh" id="icon" />
            <div class="text-division">
                <h3>Email:</h3>
                <p id="email-text">lindoamadoemail@email.com</p>
            </div>
        </div>
        <div class="role-box">
            <UserGroupIcon class="w-1 h-1 refresh" id="icon" />
            <div class="text-division">
                <h3>Cargo:</h3>
                <p id="email-text">Admin</p>
            </div>
        </div>
        <div class="buttons-box">
            <button>Teste</button>
            <button>Teste2</button>
        </div>
    </div>
</template>

<script>
import { EnvelopeIcon, UserGroupIcon } from '@heroicons/vue/16/solid';

    export default {
        name: 'UserDetails',
        components: {
            EnvelopeIcon,
            UserGroupIcon
        },
        props: {

        }
    }
</script>

<style scoped>
    .details-container {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        height: 400px;
        margin-top: 100px;
        border-radius: 50px;
        padding-inline: 70px;
    }

    .box-title{
        font-size: 24px;
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
        font-size: 22px;
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
        font-size: 18px;
        cursor: pointer;
    }
</style>