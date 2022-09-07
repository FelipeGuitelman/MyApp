const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const playPauseButtonTemp = document.getElementById('play-pause-temp');
const botones = document.querySelectorAll('.boton');
const cuentaVueltas = document.getElementById('cuenta-vueltas');
const borraVueltas = document.getElementById('borra-vueltas');
const fondo = document.getElementById('fondo');
const output = document.getElementById('output');

let stopwatchInterval;
let runningTime = 0;
let vueltas = [];

const marcarVuelta = () => {
  borraVueltas.hidden = false
  vueltas.push(runningTime)
  let inner = ''
  for (var i = 0; i < vueltas.length; i++) {
    let dif = vueltas[i]
    if (i > 0) { dif = vueltas[i] - vueltas[i - 1] }
    inner = inner + `<li id = "${dif}">
    <p>Vuelta N°${i + 1}: ${vueltas[i]} - Diferencia: ${dif}  -</p>
    <p contenteditable="true">Sin nombre</p>
  </li>`;
  }
  output.innerHTML = inner
}

const borrarVueltas = () => {
  vueltas = []
  output.innerHTML = ''
}

const playPause = () => {
  const isPaused = !playPauseButton.classList.contains('running');
  if (isPaused) {
    playPauseButton.classList.add('running');
    start();
  } else {
    playPauseButton.classList.remove('running');
    pause();
  }
}

const pause = () => {
  playPauseButton.value = 'Iniciar Cronómetro'
  clearInterval(stopwatchInterval);
}

const stop = () => {
  playPauseButton.classList.remove('running');
  playPauseButtonTemp.classList.remove('runningTemp');
  cuentaVueltas.hidden = true
  playPauseButton.disabled = false
  playPauseButton.value = 'Iniciar Cronómetro';
  playPauseButtonTemp.value = 'Iniciar Temporizador';
  output.innerHTML = ''
  vueltas = []
  runningTime = 0;
  clearInterval(stopwatchInterval);
  stopwatch.textContent = 0;
  borraVueltas.hidden = true

}

const start = () => {
  playPauseButtonTemp.disabled = true;
  playPauseButton.value = 'Detener Cronómetro'
  cuentaVueltas.hidden = false
  let startTime = Date.now() - runningTime;
  stopwatchInterval = setInterval(() => {
    runningTime = Date.now() - startTime;
    stopwatch.textContent = calculateTime(runningTime);
  }, 1000)
}

const calculateTime = runningTime => {
  const total_seconds = Math.floor(runningTime / 1000);
  return total_seconds
}

const playPauseTemp = () => {
  playPauseButton.disabled = true;
  const isPaused = playPauseButtonTemp.classList.contains('pausedTemp');
  const tempok = playPauseButtonTemp.classList.contains('tempok');
  console.log(isPaused);
  console.log(tempok);
  if (isPaused) {
    playPauseButtonTemp.classList.add('runningTemp');
    startTemp();
  }
  else if (tempok) {
    playPauseButton.disabled = false;
    playPauseButtonTemp.classList.remove('tempok');
    playPauseButtonTemp.classList.add('pausedTemp');
    fondo.classList = "body";
    playPauseButtonTemp.value = 'Iniciar Temporizador';
  }
  else {
    playPauseButtonTemp.classList.remove('runningTemp');
    pauseTemp();
  }
}

const pauseTemp = () => {
  playPauseButtonTemp.value = 'Iniciar Temporizador'
  clearInterval(stopwatchInterval);
}

const stopTemp = () => {
  playPauseButtonTemp.classList.remove('runningTemp');
  cuentaVueltas.hidden = true
  playPauseButtonTemp.value = 'Iniciar Temporizador';
  output.innerHTML = ''
  vueltas = []
  runningTime = 0;
  clearInterval(stopwatchInterval);
  stopwatch.textContent = 0;
  borraVueltas.hidden = true

}
// const normalizar = () => {
//   if (playPauseButtonTemp.value = 'Temporizador OK')
//     fondo.classList = "body";
//   playPauseButtonTemp.value = 'Iniciar Temporizador';
// }

const startTemp = () => {
  stopwatch.textContent = calculateTimeTemp(runningTime) - 1
  playPauseButtonTemp.value = 'Detener Temporizador'
  cuentaVueltas.hidden = true
  let startTime = Date.now() + Math.ceil(runningTime);
  stopwatchInterval = setInterval(() => {
    runningTime = startTime - Date.now();
    if (calculateTimeTemp(runningTime) > 0) {
      stopwatch.textContent = calculateTimeTemp(runningTime);
    }
    else {
      stop()
      fondo.classList = "parpadea"
      playPauseButtonTemp.value = 'Temporizador OK';
      playPauseButtonTemp.classList.remove('pausedTemp');
      playPauseButtonTemp.classList.remove('runningTemp');
      playPauseButtonTemp.classList.add('tempok');
    }
  }, 1000)
}

const calculateTimeTemp = runningTime => {
  const total_seconds = Math.floor(runningTime / 1000);
  return total_seconds
}

botones.forEach(boton => {
  boton.addEventListener('click', function (e) {
    const estilos = e.currentTarget.classList;

    if (estilos.contains('disminuir')) {
      runningTime = runningTime - 1000;
    }
    else if (estilos.contains('aumentar')) {
      runningTime = runningTime + 1000;
    }
    stopwatch.textContent = calculateTime(runningTime);

    if (runningTime >= 0 && playPauseButtonTemp.classList.contains('runningTemp')) {
      playPauseButton.disabled = true
    }

    else if (runningTime >= 0 && !playPauseButtonTemp.classList.contains('runningTemp')) {
      playPauseButton.disabled = false
      playPauseButtonTemp.disabled = false;
      stopwatch.style.color = '#000'
    }
    if (runningTime < 0) {
      playPauseButton.disabled = true;
      playPauseButtonTemp.disabled = true;
      stopwatch.style.color = '#ba215a'
    }
  })
});