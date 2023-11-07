<template>
  <div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header" style="color: #5706F1">Connexion</div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input v-model="email" type="text" class="form-control" id="email" name="email">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input v-model="password" type="password" class="form-control" id="password" name="password">
                </div>
                <button type="submit" class="btn btn-primary">Se connecter</button>
                <p v-if="error" class="text-danger">{{ error }}</p>
                <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { clientHttp } from "../libs/clientHttp";
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const successMessage = ref('');

const router = useRouter();

const login = async () => {
  if (!email.value || !password.value ) {
    error.value = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    const requestData = {
      email: email.value,
      password: password.value,
    };

    const response = await clientHttp.post('http://localhost:3000/api/auth/login', requestData);

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('email', email.value);

   
    router.push('/game');

   
    successMessage.value = "Connexion réussie ! Redirection vers la page /game...";
  } 
  catch (error) {
    console.error(error);
    error.value = "Adresse e-mail, mot de passe ou code de vérification incorrect.";
  }
};
</script>

<style scoped>
</style>
