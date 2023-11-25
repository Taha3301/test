<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nom = ref('');
const prenom = ref('');
const Title = ref('');
const Lis = ref('');
const Lists = ['Mr', 'Madame', 'ma.m'];
const specialite = [
  { id: 2, text: 'Informatique' },
  { id: 50, text: 'Mecanique' },
  { id: 25, text: 'Electrique' }
];
const checkM = ['java', 'javascript', 'C++'];
const selectedMatieres = ref([]);

function TitleInput(e) {
  Title.value = e.target.value;
}

function LisInput(e) {
  Lis.id.value = e.target.value;
  Lis.text.value = e.target.value;
}

function matInput(e) {
  selectedMatieres.value = e.target.value;
}

function onInput(e) {
  nom.value = e.target.value;
}

function ponInput(e) {
  prenom.value = e.target.value;
}

const router = useRouter();

function afficherPageSuivante() {
  router.push({
    name: 'PageSuivante',
    params: {
      title: Title.value,
      nom: nom.value,
      prenom: prenom.value,
      specialite: Lis.value,
      matieres: selectedMatieres.value.join(', '),
    },
  });
}
</script>

<template>
  <label for="nom">
      nom : <input v-model="nom" placeholder="nom" @change="onInput"><br>
      prenom : <input v-model="prenom" placeholder="prenom" @change="ponInput">
    </label>
  <div>
    <h2>Civilite</h2>
    <select v-model="Title" @change="TitleInput">
      <option v-for="item in Lists" :value="item">{{ item }}</option>
    </select><br>

    <h2>Specialite</h2>
    <select v-model="Lis" @change="LisInput">
      <option v-for="sp in specialite" :value="sp" :key="sp" >{{ sp.text }}{{ sp.id }}</option>
    </select>

    <h2>Matieres</h2>
    <label v-for="matiere in checkM" :key="matiere" @change="matInput">
      <input type="checkbox" v-model="selectedMatieres" :value="matiere"> {{ matiere }}<br>
    </label>

    <h2>-----</h2>
    
  </div>
  <br>
  <div id="app">Bonjour {{ Title }} {{ nom }} {{ prenom }} specialite {{ Lis.text }}{{ Lis.id }} matiere {{ selectedMatieres.join(', ') }}</div>
  <div>
    <input type="button" value="Affiche" @click="afficherPageSuivante">
  </div>
</template>
