<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

// status
const statuses = ["Dead", "Alive", "unknown"]
const status = ref('')

// pagination
const page = ref(1)
const setPage = (selectedPage) => {
  page.value = selectedPage
  fetchingCharacters(selectedPage)
}

// filters
const name = ref('')
const resetFilters = () => {
  name.value = ''
  status.value = ''
  page.value = 1
  fetchingCharacters()
}

// fetch
const characters = ref([]);
const totalPages = ref(0);
const episodes = ref([]);

const fetchingCharacters = async () => {
  try {
    const res = await axios.get(`https://rickandmortyapi.com/api/character/?status=${status.value}&name=${name.value}&page=${page.value}`)
    if (res.data.results) {
      totalPages.value = res.data.info.pages;
      characters.value = res.data.results;

      const response = await axios.get(`https://rickandmortyapi.com/api/episode`)
      episodes.value = response.data.results
    }
  } catch (e) {
    alert(e)
  }
}

onMounted(fetchingCharacters);
</script>

<template>
  <div class="wrapper">
    <header>
      <h1>Rick and Morty Api</h1>
      <div class="totalPages">
        Всего страниц: {{ totalPages }}
      </div>
      <div class="totalPages">
        Страница: {{ page }}
      </div>
    </header>
  
    <main class="container">
      <div class="navbar">
        <div class="filters">
          <div class="filter">
            <select
              name="filter"
              id="filter"
              v-model="status"
            >
              <option disabled>Выберите статус</option>
              <option   
                v-for="status in statuses"  
                :key="status"  
              >
                {{ status }}
              </option>
            </select>
  
          </div>
          <div class="search">
            <input 
              type="text"
              placeholder="Поиск по имени..."
              v-model="name"
            >
          </div>
          <button @click="fetchingCharacters()">Применить</button>
          <button @click="resetFilters()">Сбросить фильтры</button>
        </div>
      </div>

      <ul>
        <li
          v-for="character in characters"
          :key="character.id"
        >
          <img :src="character.image" alt="character.name">
          <div class="cardContent">
            <p class="name">{{ character.name }}</p>
            <p>{{ character.status }}</p>
            <p v-if="character.location.name">
              Last known location: {{ character.location.name }}
            </p>
            <p v-if="episodes.find((episode) => episode.url === character.episode[0])?.name">
              First seen in: {{ episodes.find((episode) => episode.url === character.episode[0])?.name }}
            </p>
          </div>
        </li>
      </ul>
    </main>
  
    <footer>
      <div class="pagination">
        <button
          class="buttonWrapper"
          v-for="page in totalPages"
          :key="page"
          @click="setPage(page)"
        >
          <p>{{ page }}</p>
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  margin: 0 auto;
  padding: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(39, 43, 51);
  color: rgb(179, 178, 178)
}
h1, p {
  margin: 0;
  padding: 0;
}
input {
  width: 160px;
}
select {
  width: 168px;
}
header {
  height: 100px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
  background-color: rgb(39, 43, 51);
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
}
main {
  margin-top: 100px;
  flex: 1 1 auto;
  position: relative;
  z-index: 999;
}
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 20px;
}
.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  width: 600px;
  height: 220px;
  display: flex;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
img {
  flex: 0 1 0%;
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.cardContent {
  position: relative;
  padding: 0.5rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.name {
  font-weight: 700;
  font-size: 28px;
}
button {
  cursor: pointer;
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
footer {    
  background: rgb(32, 35, 41);
  height: 200px;
  width: 100vw;
  padding: 20px;
}
.pagination {
  width: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.buttonWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.buttonWrapper p {
  font-weight: 800px;
  font-size: 20px;
}
</style>
