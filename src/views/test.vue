<script setup lang="ts">
import { ref, onMounted } from 'vue';

const titreTache = ref('');
const termineTache = ref(false);
const inputTitre = ref<HTMLInputElement | null>(null);
const taches = ref([]);
const buttonText = ref('');
buttonText.value='Ajouter';

//recuperation de data
function getTasks() {
  fetch('http://localhost:3000/taches')
    .then(response => response.json())
    .then(data => {
      taches.value = data;
    })
    .catch(err => console.log(err.message));
}

onMounted(() => {
  getTasks();
});
            //Ajouter tache
             function ajouterTache() {
              if (titreTache.value !== '') {
        fetch('http://localhost:3000/taches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titre: titreTache.value,
                termine: termineTache.value,
            })
        })
            .then(response => response.json())
            .then(data => {
                titreTache.value = '';
                termineTache.value = false;
                getTasks();   
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la tâche:', error);
            });
    } 
            }

                  //Delete Tache
                  function DeleteTache(id){
                          fetch(`http://localhost:3000/taches/${id}`, {
                          method: 'DELETE',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                              ID:id,
                          }),
                      })
                          .then(response => {
                              if (!response.ok) {
                                  throw new Error(`HTTP error! Status: ${response.status}`);
                              }
                              console.log('Élément supprimé avec succès');
                              taches.value = taches.value.filter(tache => tache.id !== id);
                              getTasks();
                          })
                          .catch(error => {
                              console.error('Erreur lors de la suppression', error);
                          });
                      }

  //Edite Tache
  let typeID = null; // Définir typeID en dehors de la portée des fonctions pour une meilleure gestion de la portée

function EditeTache(id) {
  inputTitre.value.focus();
  buttonText.value = 'Modifier';
  typeID = id; // Stocker l'ID dans typeID
}

function Edite(titreTache, termineTache) {
  const id = typeID; // Utiliser const pour déclarer id pour éviter toute réaffectation accidentelle

  if (id === null) {
    console.error('ID non défini');
    return; // Gérer le cas où l'ID n'est pas défini
  }

  fetch(`http://localhost:3000/taches/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      titre: titreTache,
      termine: termineTache
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    window.location.reload();
    typeID = null; // Réinitialiser typeID après la mise à jour
  })
  .catch(error => {
    console.error('Erreur lors de la modification :', error);
    // Gérer l'erreur si nécessaire
  });
}

//rabii.mejai@isetjb.net
</script>

<template>
  <div>
    <h1>Nouvelle tâche</h1>
    <div>
      <input type="text" size="32" v-model="titreTache" ref="inputTitre" placeholder="Titre de la tâche"/>
      <input type="checkbox" v-model="termineTache" /> Terminé
      <div v-if="buttonText === 'Ajouter'"><button  @click="ajouterTache()">{{buttonText}}</button></div>
      <div v-if="buttonText === 'Modifier'">    <button  @click="Edite(titreTache,termineTache)">{{buttonText}}</button></div>
    </div>
    <div>-------------------------------------------------------------------------</div>
    <h1>Liste des tâches</h1>
    <div>
      <div v-for="(uneTache, index) in taches" :key="index">
        <input type="checkbox" v-model="uneTache.termine" />
        <span :style="{ 'text-decoration': uneTache.termine ? 'line-through' : 'none' }">
          {{ uneTache.titre }}
          <table>
            <tr>
              <td><input type="button" @click="DeleteTache(uneTache.id)" value="Delete"></td>
              <td><input type="button" @click="EditeTache(uneTache.id)" value="Edite"></td>
            </tr>
          </table>
        </span>
      </div>
    </div>
  </div>
</template>
