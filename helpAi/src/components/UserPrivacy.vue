<template>
    <div>
        <Dialog v-model:visible="dialogVisible" modal header="User Privacy Policy" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="privacy-content">
                <div v-for="(section, index) in policies" :key="index" class="privacy-section">
                    <div class="section-header" @click="toggleSection(index)">
                        <h3>{{ section.title || `Termo ${index + 1}` }}</h3>
                        <span class="toggle-icon" :class="{ 'rotated': section.isExpanded }">
                            &#9660;
                        </span>
                    </div>

                    <div v-show="section.isExpanded" class="section-content">
                        <p v-if="section.text">{{ section.text }}</p>

                        <ul v-if="section.items && section.items.length > 0">
                            <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
                                {{ item }}
                            </li>
                        </ul>

                        <div class="toggle-switch-container">
                            <label>Aceito este termo</label>
                            <ToggleSwitch v-model="section.is_accept"
                                @update:modelValue="handleToggleChange(section)" />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
        <ConfirmDelete :text="message_delete" v-if="show_confirm_delete" @cancel="cancelDelete" @confirm="confirmDelete"
            :is_loading="isloading" />
    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ToggleSwitch from 'primevue/toggleswitch';
import { PrivacyPolicyService } from '@/services/PrivacyPolicyService';
import ConfirmDelete from './ConfirmDelete.vue';
import { UserService } from '@/services/UserService';
import { showToast } from '@/eventBus';

export default {
    name: 'UserPrivacyPolicy',

    components: {
        Dialog,
        Button,
        ToggleSwitch,
        ConfirmDelete
    },

    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            policies: [],
            show_confirm_delete: false,
            message_delete: 'Ao negar o termo de privacidade, seu acesso ao sistema será encerrado e seus dados de usuário serão removidos. Deseja realmente continuar?',
            isloading: false,
            userService: new UserService(),
        };
    },

    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit('update:visible', value);
            }
        }
    },

    methods: {
        toggleSection(index) {
            this.policies[index].isExpanded = !this.policies[index].isExpanded;
        },
        askForDeliting() {
            this.show_confirm_delete = true
        },
        cancelDelete() {
            this.show_confirm_delete = false
        },
        async confirmDelete() {
            this.isloading = true;
            try {
                const id_user = localStorage.getItem('userId')
                await this.userService.deleteById(Number(id_user))
                this.router.push('/');

                this.isVisible = false;
                this.show_confirm_delete = false;
                showToast({
                    severity: 'warn',
                    summary: 'Alerta',
                    detail: "Usuário deletado",
                    life: 3000
                });
            } catch (error) {

                showToast({
                    severity: 'error',
                    summary: 'Erro ao aceitar o termo de privacidade',
                    detail: error.message,
                    life: 3000
                });
            }
            localStorage.clear()
            this.isloading = false;
        },

        handleToggleChange(section) {
            if (section.is_mandatory && section.is_accept) {
                this.askForDeliting();
                return;
            }
            this.changePolicy(section);
        },

        async getAllPolicies() {
            try {
                const service = new PrivacyPolicyService();
                const policies = await service.getAllByUser(Number(localStorage.getItem('userId')));

                // Adiciona isExpanded em cada política
                this.policies = policies.map(policy => ({
                    ...policy,
                    isExpanded: false
                }));

                console.log('Policies carregadas:', this.policies);
            } catch (error) {
                console.error("An error occurred while fetching privacy policies:", error);
            }
        },

        async changePolicy(section) {
            try {
                const service = new PrivacyPolicyService();
                const change = await service.acceptPolicy({
                    userid: Number(localStorage.getItem('userId')),
                    privacyid: Number(section.id),
                });
                showToast({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: change.message,
                    life: 3000
                });
            } catch (error) {
                console.error("An error occurred while changing privacy policy:", error);
            }
        },

        closeDialog() {
            this.$emit('update:visible', false);
        }
    },

    async mounted() {
        await this.getAllPolicies();
    },
};
</script>

<style scoped>
.privacy-content {
    max-height: 60vh;
    overflow-y: auto;
    padding: 0.5rem;
}

.privacy-section {
    margin-bottom: 8px;
    border: 1px solid #e0e6ed;
    border-radius: 6px;
    overflow: hidden;
}

.section-header {
    padding: 12px 16px;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.section-header:hover {
    background: #e9ecef;
}

.section-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
}

.toggle-icon {
    transition: transform 0.3s ease-in-out;
    font-size: 10px;
    color: #666;
    cursor: pointer;
}

.toggle-icon.rotated {
    transform: rotate(180deg);
}

.section-content {
    padding: 16px;
    background: #ffffff;
    border-top: 1px solid #e0e6ed;
}

.section-content p {
    margin: 0 0 12px 0;
    color: #495057;
    line-height: 1.6;
    font-size: 14px;
}

.section-content ul {
    margin: 0;
    padding-left: 20px;
    color: #495057;
}

.section-content ul li {
    margin-bottom: 8px;
    line-height: 1.5;
    font-size: 14px;
}

.section-content ul li:last-child {
    margin-bottom: 0;
}

.toggle-switch-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e0e6ed;
}

.toggle-switch-container label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
}
</style>