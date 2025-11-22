<template>
  <div class="user-avatar-container">
    <div class="user-avatar">
      <img :src="avatarUrl" :alt="userName" />
    </div>
    <div class="user-info">
      <p class="user-name">{{ userName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    avatarUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/847/847969.png"
    },
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      userName: "...",
      isLoading: true
    };
  },
  watch: {
    user: {
      handler(newVal) {
        this.userName = newVal.name;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.user-avatar-container {
  display: flex;
  align-items: center;
  gap: 40px;
  /* margin-top: 30px; */
}

.user-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 40px;
  font-weight: 800;
  margin: 0;
}
</style>