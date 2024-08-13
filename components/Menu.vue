<template>
  <div>
    <header class="header">
      <button class="menu-toggle" @click="toggleMenu">☰</button>
      <div class="logo">Galaxy Weather</div>
    </header>
    <div class="menu-content" v-if="isMenuOpen">
      <!-- Add your content here -->
      <p>This is where your additional content will be displayed.</p>
    </div>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.menu-content {
  padding: 20px;
  background-color: #f4f4f4;
  border-top: 1px solid #ccc;
}
</style>