document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-whatsapp');
  if (!modal) return;

  const dialog = modal.querySelector('.modal-whatsapp__caixa');
  const gatilhos = document.querySelectorAll('[data-whatsapp-modal]');
  const fecharBotoes = modal.querySelectorAll('[data-modal-fechar]');

  if (!dialog || gatilhos.length === 0) return;

  // Permite focar o diálogo como alternativa caso não haja controles focáveis.
  dialog.setAttribute('tabindex', '-1');

  const seletorFoco = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  let elementoAnterior = null;
  let overflowAnterior = '';

  function obterElementosFocaveis() {
    return [...dialog.querySelectorAll(seletorFoco)].filter((elemento) => {
      return elemento.getAttribute('aria-hidden') !== 'true'
        && elemento.getClientRects().length > 0;
    });
  }

  function abrirModal(evento) {
    evento.preventDefault();

    if (modal.classList.contains('aberto')) return;

    elementoAnterior = evento.currentTarget;
    overflowAnterior = document.body.style.overflow;

    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const elementosFocaveis = obterElementosFocaveis();
    (elementosFocaveis[0] || dialog).focus();
  }

  function fecharModal() {
    if (!modal.classList.contains('aberto')) return;

    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = overflowAnterior;

    if (elementoAnterior?.isConnected) {
      elementoAnterior.focus();
    }

    elementoAnterior = null;
  }

  gatilhos.forEach((gatilho) => {
    gatilho.addEventListener('click', abrirModal);
  });

  fecharBotoes.forEach((botao) => {
    botao.addEventListener('click', fecharModal);
  });

  document.addEventListener('keydown', (evento) => {
    if (!modal.classList.contains('aberto')) return;

    if (evento.key === 'Escape') {
      evento.preventDefault();
      fecharModal();
      return;
    }

    if (evento.key !== 'Tab') return;

    const elementosFocaveis = obterElementosFocaveis();
    if (elementosFocaveis.length === 0) {
      evento.preventDefault();
      dialog.focus();
      return;
    }

    const primeiro = elementosFocaveis[0];
    const ultimo = elementosFocaveis[elementosFocaveis.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  });
});