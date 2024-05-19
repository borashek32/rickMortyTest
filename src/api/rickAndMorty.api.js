import axios from "axios";

const baseURL = 'https://rickandmortyapi.com/api';

const instance = axios.create({
  baseURL,
  timeout: 500,
  headers: {}
});

export async function getCharacters({ page, status, name }) {
  console.log(status, name);
  return await instance.get(`/character/?page=${page}&status=${status}&name=${name}`);
}