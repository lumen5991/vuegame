<script lang="ts" setup>
</script>
<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <div class="container p-4 rounded shadow" >
        <div class="row">
          <div class="col-lg-6" >
            <h2 style="font-size: 36px;">Bienvenue sur <span style="color: rgb(74, 171, 184);">Flinmi</span></h2>
            <p style="font-size: 18px;">Flinmi est une application de jeu de mémoire qui vous permet de rester éveillé et d'allumer votre cerveau.</p>
          </div>
          <div class="col-lg-6">
            <div class="d-flex flex-column">
              <p style="font-size: 16px; font-family: 'Arial', sans-serif;">Pas de compte?</p>
              <router-link to="/registration" class="btn btn-primary">S'INSCRIRE</router-link>
            </div>
            <div class="d-flex flex-column mt-3">
              <p style="font-size: 16px; font-family: 'Arial', sans-serif;">Déjà inscrit?</p>
              <router-link to="/login" class="btn btn-success">SE CONNECTER</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  

<style scoped></style>
