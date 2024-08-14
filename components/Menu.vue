<template>
  <div id="app">
    <header class="header">
      <div class="logo">Weather App</div>
      <button class="menu-toggle" @click="toggleMenu">☰</button>
    </header>
    <div class="menu-content" v-if="isMenuOpen">
      <div class="searched-cities">
        <h3>Searched Cities</h3>
        <ul>
          <li v-for="city in searchedCities" :key="city" @click="selectCity(city)">
            {{ city }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  
<script>
export default {
  name: "Menu",
  data() {
    return {
      isMenuOpen: false,
      searchedCities: [],
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        this.loadSearchedCities();
      }
    },
    loadSearchedCities() {
      const cities = JSON.parse(localStorage.getItem("searchedCities")) || [];
      this.searchedCities = [...new Set(cities)];
    },
    selectCity(city) {
      this.$emit("city-selected", city); // Emit an event with the selected city
      this.isMenuOpen = false; // Optionally close the menu after selection
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: black;
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
  background-color: black;
  color: white;
  border-top: 1px solid #ccc;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 1000;
}

.searched-cities {
  margin-top: 20px;
}

.searched-cities ul {
  list-style: none;
  padding: 0;
}

.searched-cities li {
  margin-bottom: 5px;
  cursor: pointer;
  color: #00f;
}

.searched-cities li:hover {
  text-decoration: underline;
}
</style>