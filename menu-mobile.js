document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('menu');
  if (!checkbox) return;

  const itensClicaveis = document.querySelectorAll(
    '.menu__lista__link, .menu__botao-whatsapp'
  );

  itensClicaveis.forEach((item) => {
    item.addEventListener('click', () => {
      checkbox.checked = false;
    });
  });
});