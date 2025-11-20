<template>
    <div class="table-class">
        <DataTable :value="filteredUsers" tableStyle="min-width: 50rem" removableSort stripedRows paginator :rows="rows"
            :lazy="true" :totalRecords="totalRecords" @page="onPageChange">
            <Column field="name" header="Nome"></Column>
            <Column field="email" header="Email"></Column> <!-- Adicionei coluna de email -->
            <Column field="role" header="Cargo"></Column>
            <Column header="Ações">
                <template #body="userData" v-if="!isloading">
                    <div style="display: flex; gap: 0.5rem;">
                        <button @click="editUser(userData.data)" class="btn-icon" v-tooltip="'Editar usuário'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="icon icon-edit">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                        <button @click="changePassword(userData.data)" class="btn-icon btn-password"
                            v-tooltip="'Resetar senha'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="icon">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 10.5V7.125a4.125 4.125 0 1 0-8.25 0V10.5m-.75 0h9.75A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6A2.25 2.25 0 0 1 6.75 10.5Zm6 4.125a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" />
                            </svg>
                        </button>

                        <button @click="deleteUser(userData.data)" class="btn-icon" v-tooltip="'Excluir usuário'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="icon icon-delete">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </template>

                <template #body="userData" v-else>
                    <Skeleton width="100%"/>
                </template>
            </Column>
        </DataTable>
    </div>

    <EditUser :visible="showEditDialog" :name="selectedUser.name" :role="selectedUser.role" :id="selectedUser.id"
        @update:visible="showEditDialog = $event" @save="handleSave" />

    <ConfirmDelete :text="message_delete" v-if="show_confirm_delete" @cancel="cancelDelete" @confirm="confirmDelete"
        :is_loading="isloading" />
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { UserAuthService } from '@/services/UserAuthService';
import EditUser from './EditUser.vue';
import { UserService } from '@/services/UserService';
import ConfirmDelete from './ConfirmDelete.vue';
import { showToast } from '@/eventBus';
import emitter from '@/eventBus';
import { Skeleton } from 'primevue';
export default {
    name: "UserList",
    components: {
        DataTable,
        Column,
        EditUser,
        ConfirmDelete,
        Skeleton
    },
    props: {
        emailFilter: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            users: [],
            rows: 10,
            totalRecords: 0,
            userService: new UserAuthService(),
            userDefaultService: new UserService(),
            show_confirm_delete: false,
            message_delete: `Tem certeza que deseja excluir este usuário?`,
            showEditDialog: false,
            isloading: false,
            selectedUser: {
                name: '',
                role: '',
                id: null
            }
        }
    },
    computed: {
        filteredUsers() {
            if (!this.emailFilter) {
                return this.users;
            }

            const filter = this.emailFilter.toLowerCase();
            return this.users.filter(user =>
                user.email && user.email.toLowerCase().includes(filter)
            );
        }
    },
    mounted() {
        this.loadUsers({ page: 0, rows: this.rows });
        emitter.on("user:created", () => {
            this.loadUsers({ page: 0, rows: this.rows });
        });
    },
    beforeUnmount() {
        emitter.off("user:created");
    },
    methods: {
        editUser(user) {
            this.selectedUser = { ...user };
            this.showEditDialog = true;
        },
        deleteUser(user) {
            this.selectedUser = { ...user };
            this.show_confirm_delete = true;
        },
        onPageChange(event) {
            this.loadUsers({ page: event.page, rows: event.rows });
        },
        async loadUsers(params) {
            try {
                const response = await this.userService.getAllUsers(params.page + 1);
                const data = response.data;

                this.users = data.users;
                this.totalRecords = data.total;
            } catch (error) {
                console.error('Erro ao carregar usuários:', error);
            }
        },
        handleSave(userData) {
            this.loadUsers({ page: 0, rows: this.rows });
        },
        cancelDelete() {
            if (this.revertingSection) {
                this.revertingSection.is_accept = true;
                this.revertingSection = null;
            }
            this.show_confirm_delete = false;
        },
        async confirmDelete() {
            this.isloading = true;
            try {
                const response = await this.userDefaultService.deleteById(Number(this.selectedUser.id));
                if (response.status === 204) {
                    showToast({
                        severity: 'success',
                        summary: 'Exclusão de Usuário',
                        detail: "Usuário excluído com sucesso!",
                        life: 3000
                    });
                }

                this.loadUsers({ page: 0, rows: this.rows });
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            } finally {
                this.isloading = false;
                this.show_confirm_delete = false;
            }
        },
        async changePassword(userid) {
            this.isloading = true;
            try {
                const response = await this.userService.resetPassword(Number(userid.id));

                showToast({
                    severity: 'success',
                    summary: 'Mudança de senha',
                    detail: "Uma nova senha foi gerada e enviada para o e-mail do usuário.",
                    life: 3000
                });

            } catch (error) {
                showToast({
                    severity: 'error',
                    summary: 'Atenção!',
                    detail: error,
                    life: 3000
                });
            }
            this.isloading = false;
        }
    },
    watch: {
        emailFilter() {
            // Se você quiser fazer a busca no backend em vez de filtrar no frontend,
            // pode chamar this.loadUsers aqui com o parâmetro de filtro
        }
    }
}
</script>

<style scoped>
.table-class {
    border-radius: 12px;
    padding: 5px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    width: 90%;
    margin: auto;
}

.btn-password {
    color: rgb(255, 183, 0)
}

.btn-icon {
    padding: 0.25rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
}

.icon {
    width: 1.5rem;
    height: 1.5rem;
}

.icon-edit {
    color: #3b82f6;
}

.icon-edit:hover {
    color: #2563eb;
}

.icon-delete {
    color: #ef4444;
}

.icon-delete:hover {
    color: #dc2626;
}
</style>
