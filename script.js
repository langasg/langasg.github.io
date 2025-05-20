const imageInput = document.getElementById('imageInput');
const output = document.getElementById('output');
const loading = document.getElementById('loading');

imageInput.addEventListener('change', async () => {
  const file = imageInput.files[0];
  if (!file) return;

  output.textContent = '';
  loading.style.display = 'block';

  const reader = new FileReader();
  reader.onload = async () => {
    const result = await Tesseract.recognize(reader.result, 'spa', {
      logger: m => console.log(m)
    });

    loading.style.display = 'none';
    output.textContent = result.data.text;
  };
  reader.readAsDataURL(file);
});
