import ErrorRepository from './js/ErrorRepository';

const errorRepo = new ErrorRepository();
const errorList = document.getElementById('errorList');
const resultDiv = document.getElementById('result');

errorList.innerHTML = Array.from(errorRepo.errors.entries()).map(([code, desc]) => `
    <div class="error-card">
        <div class="code">${code}</div>
        <div class="desc">${desc}</div>
    </div>
`).join('');

document.getElementById('translateBtn').addEventListener('click', () => {
  const code = parseInt(document.getElementById('errorCode').value, 10);
  const result = errorRepo.translate(code);

  resultDiv.className = `result ${errorRepo.errors.has(code) ? 'success' : 'error'}`;
  resultDiv.textContent = `Результат: ${result}`;

  console.log(`Код ${code} -> ${result}`);
});

console.log('=== Error Repository Demo ===');
console.log('Все ошибки:', Array.from(errorRepo.errors.entries()));
console.log('Перевод 404:', errorRepo.translate(404));
console.log('Перевод 999:', errorRepo.translate(999));
