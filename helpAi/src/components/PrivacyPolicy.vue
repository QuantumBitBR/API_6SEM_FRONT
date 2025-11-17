<template>
  <Dialog v-model:visible="dialogVisible" modal header="Termo de Consentimento" :style="{ width: '50rem' }"
    :closable="canCloseDialog" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

    <template v-if="is_skeleton">
      <Skeleton width="100%" height="400px" />

    </template>

    <template v-else>

      <div class="privacy-content">

        <div class="accept-all-container">
          <label>Aceitar todas as condições</label>
          <ToggleSwitch v-model="acceptAll" @update:modelValue="handleAcceptAll" />
        </div>

        <div v-for="(section, index) in policies" :key="index" class="privacy-section">

          <div class="header-row">
            <h3 class="section-title">
              {{ section.title || `Condição ${index + 1}` }}
            </h3>

            <span class="badge" :class="section.is_mandatory ? 'mandatory' : 'optional'">
              {{ section.is_mandatory ? 'Obrigatório' : 'Opcional' }}
            </span>
          </div>

          <p class="validity-date" v-if="section.validity_date">
            Vigente a partir de: {{ section.validity_date }}
          </p>

          <div class="section-content">
            <div v-if="section.text" v-html="section.text"></div>


            <ul v-if="section.items && section.items.length > 0">
              <li v-for="(item, i) in section.items" :key="i">
                {{ item }}
              </li>
            </ul>

            <div class="toggle-switch-container">
              <label>Aceito esta condição</label>
              <ToggleSwitch v-model="section.is_accept" @update:modelValue="handleToggleChange(section)" />
            </div>
          </div>

        </div>

      </div>

    </template>
  </Dialog>

  <ConfirmDelete :text="message_delete" v-if="show_confirm_delete" @cancel="cancelDelete" @confirm="confirmDelete"
    :is_loading="isloading" />
</template>
<script>
import Dialog from 'primevue/dialog';
import ToggleSwitch from 'primevue/toggleswitch';
import ConfirmDelete from './ConfirmDelete.vue';
import { PrivacyPolicyService } from '@/services/PrivacyPolicyService';
import { UserService } from '@/services/UserService';
import { showToast } from '@/eventBus';
import { usePrivacyStore } from "@/stores/privacy";
import { Skeleton } from 'primevue';

export default {
  name: 'PrivacyPolicyUnified',

  components: { Dialog, ToggleSwitch, ConfirmDelete, Skeleton },

  props: {
    visible: { type: Boolean, default: false }
  },

  data() {
    return {
      policies: [],
      acceptAll: false,
      is_skeleton: false,
      revertingSection: null,
      show_confirm_delete: false,
      message_delete: 'Ao negar o termo obrigatório, seu usuário será removido. Deseja continuar?',

      isloading: false,
      userService: new UserService(),
      privacyStore: usePrivacyStore(),
    };
  },

  computed: {
    dialogVisible: {
      get() { return this.visible; },
      set(v) { this.$emit("update:visible", v); }
    },
    canCloseDialog() {
      return this.policies
        .filter(p => p.is_mandatory)
        .every(p => p.is_accept === true);
    }
  },

  methods: {

    async getAllPolicies() {
      this.is_skeleton = true;
      const service = new PrivacyPolicyService();
      const list = await service.getAllByUser(Number(localStorage.getItem('userId')));
      this.policies = list.sort((a, b) => {
        return (b.is_mandatory ? 1 : 0) - (a.is_mandatory ? 1 : 0);
      })
      this.is_skeleton = false;
    },
    handleToggleChange(section) {
      if (section.is_mandatory && !section.is_accept) {
        this.revertingSection = section;
        this.show_confirm_delete = true;
        return;
      }
      this.changePolicy(section);
    },
    handleAcceptAll(value) {
      this.policies.forEach(section => {
        if (section.is_mandatory && !value) return;
        if (value === true && section.is_accept === false) {
          section.is_accept = true;
          this.changePolicy(section);
        }

      });
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
        await this.userService.deleteById(Number(localStorage.getItem('userId')));
        localStorage.clear();
        this.$router.push('/');
      } finally {
        this.isloading = false;
        this.show_confirm_delete = false;
      }
    },

    async changePolicy(section) {
      const service = new PrivacyPolicyService();

      try {
        const result = await service.acceptPolicy({
          userid: Number(localStorage.getItem('userId')),
          privacyid: Number(section.id)
        });
        const response = await service.getUnmandatoryPrivacyAccept(Number(localStorage.getItem('userId')));

        this.privacyStore.update(response);

        showToast({
          severity: 'success',
          summary: 'Atualizado',
          detail: result.message,
          life: 3000
        });

      } catch (err) {
        console.error(err);
      }
    },
  },

  async mounted() {
    await this.getAllPolicies();
  }
};
</script>
<style scoped>
.privacy-content {
  max-height: 600px;
  overflow-y: auto;
}

.accept-all-container {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 16px;
  background: #f8f9fa;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
}

.privacy-section {
  padding: 16px;
  border: 1px solid #e0e6ed;
  border-radius: 6px;
  background: white;
  margin-bottom: 16px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

.mandatory {
  background: #ffdddd;
  color: #b52d2d;
}

.optional {
  background: #e7f5ff;
  color: #005f99;
}

.validity-date {
  margin: 4px 0 12px 0;
  font-size: 13px;
  color: #6c757d;
}

.toggle-switch-container {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #e0e6ed;
  margin-top: 12px;
}
</style>
