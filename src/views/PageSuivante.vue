<template>
  <div>
    <h1>Nouvelle tâche</h1>
    <div>
      <input type="text" size="32" v-model="titreTache" ref="inputTitre" placeholder="Titre de la tâche"/>
      &nbsp;
      <input type="checkbox" v-model="termineTache" /> Terminé
      &nbsp;
      <button @click="ajouterTache">Ajouter</button>
    </div>
    <div></div>
    <div>-------------------------------------------------------------------------</div>
    <h1>Liste des tâches</h1>
    <div>
      <div v-for="(tache, index) in taches" :key="index">
        <span :style="{ 'text-decoration': tache.termine ? 'line-through' : 'none' }">
          {{ tache.titre }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const titreTache = ref('');
const termineTache = ref(false);
const inputTitre = ref(null); // Ref for input element
const taches = ref([]);

const ajouterTache = () => {
  // Check if the title is not empty
  if (titreTache.value.trim() !== '') {
    // Create an object containing the input values
    const tache = {
      titre: titreTache.value,
      termine: termineTache.value,
    };
    // Add to the list of tasks
    taches.value.push(tache);
    // Clear input values and focus on the input element
    titreTache.value = '';
    termineTache.value = false;
    inputTitre.value.focus();
    // Optionally, log the list of tasks
    console.log(taches.value);
  }
};
</script>
