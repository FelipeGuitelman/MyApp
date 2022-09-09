const stopwatch = document.getElementById('stopwatch');
const stopwatch1 = document.getElementById('stopwatch1');
const playPauseButton = document.getElementById('play-pause');
const playPauseButtonTemp = document.getElementById('play-pause-temp');
const botones = document.querySelectorAll('.boton');
const cuentaVueltas = document.getElementById('cuenta-vueltas');
const borraVueltas = document.getElementById('borra-vueltas');
const fondo = document.getElementById('fondo');
const output = document.getElementById('output');
const contadorInput = document.getElementById('contador');
const tiempoInput = document.getElementById('tiempo');

stopwatch1.addEventListener('input', function(event){
  playPauseButtonTemp.disabled = false;
  stopwatch1.textContent = event.target.innerText;
  let runtemp = stopwatch1.textContent.split(':')
  runningTime= runtemp[2]*10 + runtemp[1]*1000 + runtemp[0]*60000
})

let stopwatchInterval;
let runningTime = 0;
let vueltas = [];

const contador = () => {
  stop()
  stopwatch1.hidden = true
  stopwatch.hidden = false

}

const tiempo = () => {
  stop()
  stopwatch1.hidden = false
  stopwatch.hidden = true

}

const marcarVuelta = () => {
  if (!tiempoInput.checked) {
    borraVueltas.hidden = false
    vueltas.push(runningTime)
    let inner = ''
    for (var i = 0; i < vueltas.length; i++) {
      let dif = vueltas[i]
      if (i > 0) { dif = vueltas[i] - vueltas[i - 1] }
      inner = inner + `<li id = "${dif}">
    <p>Vuelta N°${i + 1}: ${Math.floor(vueltas[i] / 1000)} - Diferencia: ${Math.floor(dif / 1000)}  -</p>
    <p contenteditable="true">Sin nombre</p>
  </li>`;
    }
    output.innerHTML = inner
  }
  else if (tiempoInput.checked) {
    borraVueltas.hidden = false
    vueltas.push(runningTime)
    let inner = ''
    for (var i = 0; i < vueltas.length; i++) {
      const calculateTime = runningTime => {
        const total_seconds = Math.floor(runningTime / 1000);
        const total_minutes = Math.floor(total_seconds / 60);
        const total_miliseg = Math.floor(runningTime / 10);

        const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
        const display_minutes = total_minutes.toString().padStart(2, "0");
        const display_miliseg = (total_miliseg % 100).toString().padStart(2, "0");

        return `${display_minutes}:${display_seconds}:${display_miliseg}`
      }
      let dif = vueltas[i]
      if (i > 0) { dif = vueltas[i] - vueltas[i - 1] }
      inner = inner + `<li id = "${dif}">
    <p>Vuelta N°${i + 1}: ${calculateTime(vueltas[i])} - Diferencia: ${calculateTime(dif)}  -</p>
    <p contenteditable="true">Sin nombre</p>
  </li>`;
    }
    output.innerHTML = inner
  }
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
  playPauseButtonTemp.disabled = false;
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
  stopwatch1.textContent = '00:00:00';
  borraVueltas.hidden = true

}

const start = () => {
  console.log(stopwatch1);
  playPauseButtonTemp.disabled = true;
  playPauseButton.value = 'Detener Cronómetro'
  cuentaVueltas.hidden = false
  let startTime = Date.now() - runningTime;
  stopwatchInterval = setInterval(() => {
    runningTime = Date.now() - startTime;
    stopwatch.textContent = calculateTime(runningTime);
    stopwatch1.textContent = calculateTime(runningTime);

  }, 1)
}

const calculateTime = runningTime => {
  if (contadorInput.checked) {
    const total_seconds = Math.floor(runningTime / 1000);
    return total_seconds
  }
  else if (tiempoInput.checked) {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);
    const total_miliseg = Math.floor(runningTime / 10);

    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2, "0");
    const display_miliseg = (total_miliseg % 100).toString().padStart(2, "0");

    return `${display_minutes}:${display_seconds}:${display_miliseg}`
  }

}

const playPauseTemp = () => {
  playPauseButton.disabled = true;
  const isPaused = playPauseButtonTemp.classList.contains('pausedTemp');
  const tempok = playPauseButtonTemp.classList.contains('tempok');
  if (isPaused) {
    playPauseButtonTemp.classList.remove('pausedTemp')
    playPauseButtonTemp.classList.add('runningTemp');
    startTemp();
  }
  else if (tempok) {
    playPauseButton.disabled = false;
    playPauseButtonTemp.disabled = true
    playPauseButtonTemp.classList.remove('tempok');
    playPauseButtonTemp.classList.add('pausedTemp');
    fondo.classList = "body";
    playPauseButtonTemp.value = 'Iniciar Temporizador';
  }
  else {
    playPauseButtonTemp.classList.add('pausedTemp')
    playPauseButtonTemp.classList.remove('runningTemp');
    pauseTemp();
  }
}

const pauseTemp = () => {
  playPauseButtonTemp.value = 'Iniciar Temporizador'
  playPauseButton.disabled = false;
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

const startTemp = () => {
  if (contadorInput.checked) {
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
  else if (tiempoInput.checked) {
    stopwatch1.textContent = calculateTimeTemp(runningTime)
    playPauseButtonTemp.value = 'Detener Temporizador'
    cuentaVueltas.hidden = true
    let startTime = Date.now() + runningTime;
    stopwatchInterval = setInterval(() => {
      runningTime = startTime - Date.now();
      if (runningTime > 0) {
        stopwatch1.textContent = calculateTimeTemp(runningTime);
      }
      else {
        stop()
        fondo.classList = "parpadea"
        playPauseButtonTemp.value = 'Temporizador OK';
        playPauseButtonTemp.classList.remove('pausedTemp');
        playPauseButtonTemp.classList.remove('runningTemp');
        playPauseButtonTemp.classList.add('tempok');
      }
    }, 1)
  }
}

const calculateTimeTemp = runningTime => {
  if (contadorInput.checked) {
    const total_seconds = Math.floor(runningTime / 1000);
    return total_seconds
  }
  else if (tiempoInput.checked) {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);
    const total_miliseg = Math.floor(runningTime / 10);


    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2, "0");
    const display_miliseg = (total_miliseg % 100).toString().padStart(2, "0");

    return `${display_minutes}:${display_seconds}:${display_miliseg}`
  }
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
    stopwatch1.textContent = calculateTimeTemp(runningTime);


    if (runningTime >= 0 && playPauseButtonTemp.classList.contains('runningTemp')) {
      playPauseButton.disabled = true
    }
    else if (runningTime > 0 && !playPauseButtonTemp.classList.contains('runningTemp')) {
      playPauseButtonTemp.disabled = false
    }
    else if (runningTime === 0 && !playPauseButtonTemp.classList.contains('runningTemp')) {
      playPauseButtonTemp.disabled = true
    }
    else if (runningTime >= 0 && !playPauseButtonTemp.classList.contains('runningTemp')) {
      playPauseButton.disabled = false
    }
    if (runningTime < 0) {
      playPauseButton.disabled = true;
      playPauseButtonTemp.disabled = true;
    }
  })
});