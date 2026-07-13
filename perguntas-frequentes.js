document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.perguntas-frequentes-pergunta');
 
  botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
      const item = botao.closest('.perguntas-frequentes-item');
      const estaAberto = item.classList.contains('aberto');
 
      document.querySelectorAll('.perguntas-frequentes-item.aberto').forEach((aberto) => {
        aberto.classList.remove('aberto');
        aberto.querySelector('.perguntas-frequentes-pergunta').setAttribute('aria-expanded', 'false');
      });
 
      if (!estaAberto) {
        item.classList.add('aberto');
        botao.setAttribute('aria-expanded', 'true');
      }
    });
  });
});