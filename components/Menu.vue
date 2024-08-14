<template>
  <div id="app">
    <header class="header">
      <div class="logo">Galaxy App</div>
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
    selectedCity: null, // Track the currently selected city
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
    this.searchedCities = [...new Set(cities.map(city => this.capitalizeFirstLetter(city.toLowerCase())))];
  },
  selectCity(city) {
    this.$emit("city-selected", city); // Emit an event with the selected city
    this.isMenuOpen = false; // Optionally close the menu after selection
  },
  capitalizeFirstLetter(city) {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }
}
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: black;
  background-color: #f0f4f8;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.menu-toggle {
  background: none;
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
}

.menu-content {
  width: 200px; /* Set the width to 200px */
  padding: 20px;
  background-color: #9cc5ee;
  color: white;
  border-top: 1px solid #ccc;
  position: absolute;
  top: 60px;
  right: 0; /* Align it to the right side of the page */
  z-index: 1000;
}

.searched-cities {
  margin-top: 20px;
  color: black;
}

.searched-cities ul {
  list-style: none;
  padding: 0;
  font-size: 20px;
}

.searched-cities li {
  margin-bottom: 5px;
  cursor: pointer;
  color: black;
}

.searched-cities li:hover {
  text-decoration: underline;
}
</style>