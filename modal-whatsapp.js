document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-whatsapp');
  if (!modal) return;

  const gatilhos = document.querySelectorAll('[data-whatsapp-modal]');
  const fecharBotoes = modal.querySelectorAll('[data-modal-fechar]');

  function abrirModal(evento) {
    evento.preventDefault();
    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  gatilhos.forEach((botao) => botao.addEventListener('click', abrirModal));
  fecharBotoes.forEach((el) => el.addEventListener('click', fecharModal));

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharModal();
  });
});