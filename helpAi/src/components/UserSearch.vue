<template>
    <div class="search-container">
        <div class="search-header">
            <h2 class="search-title">Buscar usuários por email</h2>
        </div>

        <div class="search-input-wrapper">
            <InputText
                v-model="searchEmail"
                placeholder="Digite o email do usuário..."
                @input="handleSearch"
                class="search-input"
            />
            <Button
                v-if="searchEmail"
                icon="pi pi-times"
                class="p-button-text p-button-secondary clear-btn"
                @click="clearSearch"
                title="Limpar busca"
            />
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: "UserSearch",
    components: {
        InputText,
        Button
    },
    data() {
        return {
            searchEmail: ''
        }
    },
    methods: {
        handleSearch() {

            this.$emit('search', this.searchEmail);
        },
        clearSearch() {
            this.searchEmail = '';
            this.$emit('search', '');
        }
    }
}
</script>

<style scoped>
.search-container {
    width: 90%;
    margin: 0 auto 1.5rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.search-header {
    margin-bottom: 1.5rem;
    text-align: left;
}

.search-title {
    font-size: 1rem;
    font-weight: 10;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
}

.search-description {
    font-size: 1rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
}

.search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 500px;
    margin: 0;
}

.search-input {
    width: 100%;
    padding: 1rem 1rem;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: #f9fafb;
}

.search-input:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
    color: #9ca3af;
}

.clear-btn {
    position: absolute;
    right: -50px;
    color: #6b7280;
    width: 2.5rem;
    height: 2.5rem;
}

.clear-btn:hover {
    color: #374151;
    background-color: #f3f4f6;
}

/* Responsividade */
@media (max-width: 768px) {
    .search-container {
        padding: 1.5rem;
        width: 95%;
    }

    .search-title {
        font-size: 1.25rem;
    }

    .search-description {
        font-size: 0.9rem;
    }

    .search-input {
        padding: 0.875rem;
        font-size: 0.9rem;
    }

    .clear-btn {
        right: -40px;
    }
}
</style>
