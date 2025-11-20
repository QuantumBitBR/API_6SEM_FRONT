<template>
  <Dialog 
    v-model:visible="localVisible"
    header="Redefinir Senha" 
    modal 
    :style="{ width: '400px' }"
  >
    <div class="p-fluid">

      <div class="field">
        <label for="oldPass">Senha atual</label>
        <Password id="oldPass" v-model="form.oldPassword" toggleMask />
      </div>

      <div class="field">
        <label for="newPass">Nova senha</label>
        <Password id="newPass" v-model="form.newPassword" toggleMask />
      </div>

      <div class="field">
        <label for="confirmPass">Confirmar nova senha</label>
        <Password id="confirmPass" v-model="form.confirmPassword" toggleMask />
      </div>

      <div class="actions">
        <Button label="Cancelar" severity="secondary" @click="close" />
        <Button 
          label="Atualizar" 
          icon="pi pi-check" 
          @click="resetPassword"
          :loading="loading"
        />
      </div>

    </div>
  </Dialog>
</template>

<script>
import { Button } from "primevue";
import { Password } from "primevue";
import { showToast } from "@/eventBus";
import { UserAuthService } from "@/services/UserAuthService";
import Dialog from "primevue/dialog";

export default {
  name: "ResetPasswordDialog",
  components: { Button, Dialog, Password },

  props: {
    visible: Boolean
  },

  emits: ["update:visible"],

  data() {
    return {
      loading: false,
      service: new UserAuthService(),
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    };
  },

  computed: {
    // 👇 Aqui está a correção
    localVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },

  methods: {
    close() {
      this.$emit("update:visible", false);
    },

    async resetPassword() {
      const storedData = JSON.parse(localStorage.getItem("user_data"));
      const userId = storedData?.id;

      if (!userId) {
        showToast({
          severity: "error",
          summary: "Erro",
          detail: "Usuário não encontrado no sistema!",
          life: 3000
        });
        return;
      }

      if (!this.form.oldPassword || !this.form.newPassword || !this.form.confirmPassword) {
        showToast({
          severity: "warn",
          summary: "Atenção",
          detail: "Preencha todos os campos",
          life: 2500
        });
        return;
      }

      if (this.form.newPassword !== this.form.confirmPassword) {
        showToast({
          severity: "warn",
          summary: "Atenção",
          detail: "As novas senhas não coincidem",
          life: 2500
        });
        return;
      }

      this.loading = true;

      try {
        await this.service.resetPassword({
          userId,
          oldPassword: this.form.oldPassword,
          newPassword: this.form.newPassword
        });

        showToast({
          severity: "success",
          summary: "Sucesso",
          detail: "Senha atualizada!",
          life: 3000
        });

        this.close();
      } catch (error) {
        showToast({
          severity: "error",
          summary: "Erro",
          detail: error.message || "Falha ao alterar senha",
          life: 3000
        });
      }

      this.loading = false;
    }
  }
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
.field {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-weight: 600;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.8rem;
}

.p-password {
  width: 100%;
}

.p-inputtext {
  width: 100%;
}


</style>
