<template>
  <div class="wrapper">
    <div class="">
      <header>
        <Navbar />
      </header>
      <main>
        <div class="container config">
          <span>Nombre total de paires : {{ images.length }}</span>
          <span>Nombre d'essais : {{ nbreTentatives }} </span>
          <span>Temps du jeu : {{ timestamp }} </span>
          <span>Nombre de bonnes réponses : {{ pairesTrouver }} </span>
          <button class="restart" v-if="!jeuEnCours" @click="demarrerJeu">Démarrer le jeu</button>
          <button ref="myButton" :disabled="isButtonDisabled" class="restart" @click="recommencer">&#x21BB; Recommencer</button>
        </div>
        <div class="container cards">
          <div class="modal" v-if="pairesTrouver === 9">
            <div class="modal-content">
              <h2>Félicitations !</h2>
              <p>Vous avez trouvé toutes les paires de cartes !</p>
              <button class="modal-close-button" @click="closeModal">Fermer</button>
            </div>
          </div>
          <div class="card" v-for="(element, i) in pairesImages" :key="i" :data-id="element._id" @click.self="rotate" :ref="ref => cardRefs[i] = ref" :class="{ 'pair-found': element.found }">
            <div class="card__front">
              
              <div class="card-body">
                <img :src="element.img.url" :alt="element.img.name" class="rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import  clientHttp from "@/libs/clientHttp";
import { ref, onMounted, watch } from "vue"



type Card = {
  _id: number;
  img: {
    url: string;
    name: string;
  };
  found: boolean;
};

/* const images = ref([]); */
const images = ref<Array<Card>>([]);
const pairesImages = ref<Card[]>([]);
const nbreTentatives = ref(0);
/* const paires = ref([]); */
const paires = ref<Array<HTMLElement>>([]);
const timer = ref();
const startTimer = ref<boolean>(false);
const pairesTrouver = ref(0);
const timestamp = ref("0");
const jeuEnCours = ref<boolean>(false);


const fetchImages = async () => {
  try {
    const response = await clientHttp.get('http://localhost:3000/api/image/all');
    images.value = response.data;
    console.log(images.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des images', error);
  }
};

const melange = () => {
  let createPairs: Card[] = []; 
  for (let i = 0; i < images.value.length; i++) {
    createPairs.push(
      { _id: i, img: images.value[i], found: false },
      { _id: i, img: images.value[i], found: false }
    );
  }
  pairesImages.value = createPairs.sort(() => 0.5 - Math.random());
};

watch(
  startTimer,
  (startTimer) => {
    if (startTimer.valueOf()) {
      let minutes = 0;
      let secondes = 0;
      timer.value = setInterval(() => {
        secondes++;
        if (secondes < 10) {
          secondes = 0 + secondes;
        }
        if (secondes > 60) {
          secondes = 0;
          minutes++;
        }
        timestamp.value = minutes + 'min' + secondes + 'sec';
      }, 1000);
    }
  }
);

const myButton = ref(null);
const isButtonDisabled = ref(true);

function rotate(e: MouseEvent) {
  isButtonDisabled.value = false;
  startTimer.value = true;
  if (paires.value.length < 2) {
    paires.value.push(e.target as HTMLElement);
    (e.target as HTMLElement).classList.toggle("rotate");
    if (paires.value.length === 2) {
      nbreTentatives.value++;
      if (paires.value[0].dataset.id === paires.value[1].dataset.id) {
        pairesTrouver.value++;
        paires.value = [];
        if (pairesTrouver.value === 9) {
          clearInterval(timer.value);
          startTimer.value = false;
        }
      } else {
        setTimeout(() => {
          (paires.value[0] as HTMLElement).classList.remove('rotate');
          (paires.value[1] as HTMLElement).classList.remove('rotate');
          paires.value = [];
        }, 1000);
      }
    }
  }
}
function demarrerJeu() {
  jeuEnCours.value = true;
  afficherCartes();
}

function afficherCartes() {
  if (jeuEnCours.value) {
    reset();
  }
}

function recommencer() {
  jeuEnCours.value = false;
  nbreTentatives.value = 0;
  pairesImages.value = [];
  timestamp.value = '0';
  startTimer.value = false;
  isButtonDisabled.value = true;
  clearInterval(timer.value);
  paires.value = [];
  melange();
  reset();
  closeModal();
}

const cardRefs = ref<HTMLElement[]>([]);
function reset() {
  cardRefs.value.forEach(cardRef => {
    if (cardRef) {
      cardRef.classList.add("rotate");
    }
    setTimeout(() => {
      cardRefs.value.forEach(cardRef => {
        if (cardRef) {
          cardRef.classList.remove("rotate");
        }
      });
      jeuEnCours.value = false;
    }, 10000);
  });
}

function closeModal() {
  pairesTrouver.value = 0;
}

onMounted(() => {
  fetchImages();
  watch(images, (newImages) => {
    if (newImages.length === 9) {
      melange();
    }
  });
});


</script>

<style scoped>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  border: 0;
}

.wrapper {
  overflow-x: hidden;
  background-color: whitesmoke;
  min-height: 100vh;
  display: flex;
  max-height: 100vh;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
}

main {
  overflow-y: hidden;
  margin-top: 25px;
  gap: 15px;
}

.container {
  border-radius: 5px;
  padding: 0 10px;
  margin: 0 auto;
}

.config {
  height: 4rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-close-button {
  margin-top: 20px;
  background-color: #3498db;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.restart {
  padding: 5px 10px;
  background-color: #3498db;
  border-radius: 0 10px;
  cursor: pointer;
}

.cards {
  display: grid;
  gap: 10px;
  perspective: 1000px;
  transform-style: preserve-3d;
  margin-top: 10px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin-top: 10px;
}

.card {
  height: 140px;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  transition: 0.3s all ease-in-out;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card-body { 
  height: 140px;
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.card-body img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card__front {
  cursor: default;
  transform: rotateY(180deg);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.rotate {
  transform: rotateY(180deg);
}
</style>