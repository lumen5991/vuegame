<template>
  <div class="container my-5 pt-3 shadow" style="width: 500px;">
    <div class="d-flex align-item-center justify-content-center" style="color: #5706F1">
      <h2>Inscription</h2>
    </div>
    <form @submit.prevent="createUser">
     
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" v-model="email" class="form-control" autocomplete="email" />
        </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" class="form-control" autocomplete="current-password" />  
      </div>
      <button type="submit" class="btn btn-primary my-3" style="width: 100%;">S'inscrire</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import  clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';



const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const successMessage = ref('');

const router = useRouter();

const createUser = async () => {
  // Validation des champs
  if (!username.value || !email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs.';
    successMessage.value = '';
    return;
  }

  try {
    const user = {
      username: username.value,
      email: email.value,
      password: password.value
    };

    await clientHttp.post('http://localhost:3000/api/user/add', user);

    successMessage.value = 'Inscription réussie'; 
    error.value = ''; 
    router.replace('/verification');
  } catch (err) {
    successMessage.value = ''; 
    error.value = 'Erreur lors de la création de l\'utilisateur';
  }
}
</script>
