// Cargar y procesar la imagen
document.getElementById('imageInput').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  const output = document.getElementById('output');

  if (file) {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const image = new Image();
      image.src = e.target.result;

      output.textContent = 'Procesando imagen...';

      const result = await Tesseract.recognize(
        image.src,
        'spa',
        {
          logger: m => console.log(m)
        }
      );

      const extractedText = result.data.text;
      output.textContent = extractedText;
    };

    reader.readAsDataURL(file);
  }
});

// Controles de voz
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const speedSelect = document.getElementById('speed');
const output = document.getElementById('output');

let utterance;

playBtn.addEventListener('click', () => {
  const text = output.textContent.trim();
  if (!text) return;

  // Cancelar cualquier lectura anterior
  window.speechSynthesis.cancel();

  utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = parseFloat(speedSelect.value);
  utterance.lang = 'es-ES'; // Puedes cambiar esto según el idioma

  window.speechSynthesis.speak(utterance);
});

pauseBtn.addEventListener('click', () => {
  if (window.speechSynthesis.speaking) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.pause();
    }
  }
});
