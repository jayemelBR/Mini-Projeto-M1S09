//Principais Funções da operação
let timerInterval;
let seconds = 59; // Tempo inicial do timer
let minutes = 24; // Tempo inicial do timer
let hours = 0;
let count = 0;
let segundosdescanso = 59 // Tempo de descanso do timer
let minutosdescanso = 4 // Tempo de descanso do timer
let timerreststop
let exerciseDetails = [];
let contadorExercise = parseInt(localStorage.getItem('contadordexercicio')) || 0
let contadorApi = parseInt(localStorage.getItem('contadorapi')) || 0


const exercises = [
  "Estique seus braços para cima e respire fundo por 10 segundos.",
  "Toque seus dedos dos pés e mantenha por 15 segundos.",
  "Gire seus ombros para trás 10 vezes e para frente 10 vezes.",
];

// Inicia o Timer
function startTimer() {
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'block';
  document.getElementById('stretchingExercise').style.display = 'none';
  timerInterval = setInterval(updateTimer, 1000);
}

// Para o Timer
function stopTimer() {
  document.getElementById('startButton').style.display = 'initial';
  document.getElementById('stopButton').style.display = 'none';
  clearInterval(timerInterval);
}

// Atualiza o timer
function updateTimer() {
  seconds--;
  if (seconds == 0){
    minutes -= 1
    seconds = 59
  }
  if (seconds == 1 && minutes == 0) {
    clearInterval(timerInterval);
    showExercise();
    let timerformatado = document.getElementById('timerDisplay')
    timerformatado.innerText = '00:00:00'
    timerdescanso()
    return;
  }
  document.getElementById('timerDisplay').textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
  return (time < 10 ? '0' : '') + time;
}

// Renderiza os exercicios na tela
function showExercise() {
  document.getElementById('stretchingExercise').style.display = 'block';
  const exerciseIndex = Math.floor(Math.random() * exercises.length);
  const exercise = exercises[exerciseIndex];
  document.getElementById('exerciseDescription').textContent = exerciseDetails[contadorExercise].name;
  document.getElementById('Exercisedifficulty').textContent = exerciseDetails[contadorExercise].difficulty;
  document.getElementById('Exercisedmuscle').textContent = exerciseDetails[contadorExercise].muscle;
  document.getElementById('Exerciseinstructions').textContent = exerciseDetails[contadorExercise].instructions;
  console.log(contadorExercise)
  minutes = 24
  seconds = 59
}

// Reinicia o timer
function completeExercise() {
  startTimer()
  contadorExercise += 1
  document.getElementById('startButton').style.display = 'initial';
  document.getElementById('stopButton').style.display = 'none';
  seconds = 5
  minutosdescanso = 4
  segundosdescanso = 59
  clearInterval(timerreststop)
  localStorage.setItem('contadordexercicio', contadorExercise)
  if (contadorExercise === 9)
  {
    contadorApi += 10
    contadorExercise = 0
    localStorage.setItem('contadorapi', contadorApi)
    console.log(contadorApi)
    acessarApi()
  }

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

// Aqui se realiza uma solicitação à API para obter novos exercícios
function fetchNewExercises() {}

function acessarApi() {

    // Definição de Url e Key da API
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?type=stretching&offset=${contadorApi}`
    const keyApi = 'p10cd8WJOFzU4kOpCYcbyA==u8lIuYysPkL8XQq0'

    // Fazendo as configurações necessárias para acessar os dados da Api
    const headers = {
        'X-Api-Key': keyApi,
        'Content-Type': 'application/json'
    }

    // Acessando API por meio do fetch
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

// Verificar se contadorExercise atingiu o valor de 9 antes de atualizar o localStorage
window.onload = function() {
  if (contadorExercise >= 9) {
      contadorExercise = 0      
      localStorage.setItem('contadordexercicio', contadorExercise)
  }
}

// Inicia um timer de 5 minutos de descanso para realização do exercicio e resumo do trabalho
function timerdescanso(){
 timerreststop = setInterval(() => {
  segundosdescanso -= 1
  if (segundosdescanso == 0) {
segundosdescanso = 59
minutosdescanso -= 1
}
  //Formata o Timer para mostrar exatos 0 segundsos ao terminar
document.getElementById('timerDisplay').textContent = formatTime(hours) + ':' + formatTime(minutosdescanso) + ':' + formatTime(segundosdescanso);
  if (segundosdescanso == 1 && minutosdescanso == 0){
    clearInterval(timerreststop)
    let timerformatado = document.getElementById('timerDisplay')
    timerformatado.innerText = '00:00:00'
  }
}, 1000);
}
