let timerInterval;
let seconds = 5; // Tempo inicial do timer
let minutes = 0;
let hours = 0;
let count = 0;
let exerciseDetails = [];
let contadorExercise = 0
let contadorApi = 0

const exercises = [
  "Estique seus braços para cima e respire fundo por 10 segundos.",
  "Toque seus dedos dos pés e mantenha por 15 segundos.",
  "Gire seus ombros para trás 10 vezes e para frente 10 vezes.",
  // Adicione mais exercícios aqui
];

function startTimer() {
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'block';
  document.getElementById('stretchingExercise').style.display = 'none';
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  document.getElementById('startButton').style.display = 'block';
  document.getElementById('stopButton').style.display = 'none';
  clearInterval(timerInterval);
}

function updateTimer() {
  seconds--;
  if (seconds < 0) {
    clearInterval(timerInterval);
    showExercise();
    return;
  }
  document.getElementById('timerDisplay').textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
  return (time < 10 ? '0' : '') + time;
}

function showExercise() {
  document.getElementById('stretchingExercise').style.display = 'block';
  const exerciseIndex = Math.floor(Math.random() * exercises.length);
  const exercise = exercises[exerciseIndex];
  document.getElementById('exerciseDescription').textContent = exercise;

  // Salvar o exercício atual no localStorage
  localStorage.setItem('currentExerciseIndex', exerciseIndex);
}

function completeExercise() {
  // Incrementar o contador de exercícios concluídos
  count++;
  if (count >= 9) {
    // Se o contador atingir 9, resetá-lo e solicitar uma nova página de alongamento
    count = 0;
    fetchNewExercises();
  }
  
  // Esconder o exercício concluído
  document.getElementById('stretchingExercise').style.display = 'none';
}

function fetchNewExercises() {
  // Aqui você faria uma solicitação à API para obter novos exercícios
  // Por enquanto, só vamos limpar o localStorage
  localStorage.removeItem('currentExerciseIndex');
}

function acessarApi() {

    // Definição de Url e Key da API
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?type=stretching&offset=${contadorApi}`
    const keyApi = 'p10cd8WJOFzU4kOpCYcbyA==u8lIuYysPkL8XQq0'

    // Setando configurações necessárias para acessar dados da Api
    const headers = {
        'X-Api-Key': keyApi,
        'Content-Type': 'application/json'
    }

    // Acessando API por meio do fetch()
    fetch(apiUrl, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            exerciseDetails = data.map(exercise => {
                return {
                    name: exercise.name,
                    difficulty: exercise.difficulty,
                    muscle: exercise.muscle,
                    instructions: exercise.instructions,
                    status: false
                }
            })
            console.log(exerciseDetails)
        })
        .catch(error => console.error('Erro;', error))
}
acessarApi()

function renderizarApi() {
    console.log(exerciseDetails[contadorExercise])
    exerciseDetails[contadorExercise].status = true
    contadorExercise += 1

    if (contadorExercise === 10) {
        acessarApi()
        contadorApi += 10
        contadorExercise = 0
    }
}
