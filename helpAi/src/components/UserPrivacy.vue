<template>
    <div>
        <Dialog v-model:visible="dialogVisible" modal header="User Privacy Policy" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="privacy-content">
                <div v-for="(section, index) in policies" :key="index" class="privacy-section">
                    <div class="section-header" @click="toggleSection(index)">
                        <h3>{{ section.title || `Termo ${index+1}` }}</h3>
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
                            <ToggleSwitch v-model="section.accepted" />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ToggleSwitch from 'primevue/toggleswitch';
import { PrivacyPolicyService } from '@/services/PrivacyPolicyService';

export default {
    name: 'UserPrivacyPolicy',

    components: {
        Dialog,
        Button,
        ToggleSwitch
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

        async getAllPolicies() {
            try {
                const service = new PrivacyPolicyService();
                const policies = await service.getAllByUser(Number(localStorage.getItem('userId')));

                // Adiciona isExpanded e accepted em cada política
                this.policies = policies.map(policy => ({
                    ...policy,
                    isExpanded: false,
                    accepted: false
                }));
            } catch (error) {
                console.error("An error occurred while fetching privacy policies:", error);
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