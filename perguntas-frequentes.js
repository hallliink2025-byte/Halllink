document.addEventListener('DOMContentLoaded', () => {
  const itens = document.querySelectorAll('.perguntas-frequentes-item');

  function fecharItem(item) {
    const botao = item.querySelector('.perguntas-frequentes-pergunta');
    const resposta = item.querySelector('.perguntas-frequentes-resposta');

    if (!botao || !resposta) return;

    item.classList.remove('aberto');
    botao.setAttribute('aria-expanded', 'false');
    resposta.setAttribute('aria-hidden', 'true');
    resposta.inert = true;
  }

  function abrirItem(item) {
    const botao = item.querySelector('.perguntas-frequentes-pergunta');
    const resposta = item.querySelector('.perguntas-frequentes-resposta');

    if (!botao || !resposta) return;

    item.classList.add('aberto');
    botao.setAttribute('aria-expanded', 'true');
    resposta.setAttribute('aria-hidden', 'false');
    resposta.inert = false;
  }

  itens.forEach((item) => {
    const botao = item.querySelector('.perguntas-frequentes-pergunta');

    if (!botao) return;

    botao.addEventListener('click', () => {
      const estaAberto = botao.getAttribute('aria-expanded') === 'true';

      itens.forEach(fecharItem);

      if (!estaAberto) abrirItem(item);
    });
  });
});
