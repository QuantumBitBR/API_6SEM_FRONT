<template>
    <div>
        <Dialog v-model:visible="dialogVisible" modal header="User Privacy Policy" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="privacy-content">
                <div v-for="(section, index) in privacySections" :key="index" class="privacy-section">
                    <div class="section-header" @click="toggleSection(index)">
                        <h3>{{ section.title }}</h3>
                        <span class="toggle-icon" :class="{ 'rotated': section.isExpanded }">
                            &#9660;
                        </span>
                    </div>

                    <div v-show="section.isExpanded" class="section-content">
                        <p v-if="section.description">{{ section.description }}</p>

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

            <template #footer>
                <Button label="Close" icon="pi pi-times" @click="closeDialog" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ToggleSwitch from 'primevue/toggleswitch';

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
            privacySections: [
                {
                    title: 'Termo 1',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 2',
                    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 3',
                    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 4',
                    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 5',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 6',
                    description: 'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 7',
                    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 8',
                    description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 9',
                    description: 'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                },
                {
                    title: 'Termo 10',
                    description: 'Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
                    items: [],
                    isExpanded: false,
                    accepted: false
                }
            ]
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
            this.privacySections[index].isExpanded = !this.privacySections[index].isExpanded;
        },

        closeDialog() {
            this.$emit('update:visible', false);
        }
    }
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