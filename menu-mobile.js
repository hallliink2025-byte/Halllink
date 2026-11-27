document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const botao = menu?.querySelector('.menu__botao');
  const painel = menu?.querySelector('.menu__painel');
  const fundo = menu?.querySelector('.menu__fundo');

  if (!menu || !botao || !painel || !fundo) return;

  const links = painel.querySelectorAll('a');
  const primeiroLink = painel.querySelector('a');
  const mediaDesktop = window.matchMedia('(min-width: 1024px)');

  function obterItensFocaveis() {
    return painel.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  function abrirMenu() {
    if (mediaDesktop.matches) return;

    menu.classList.add('aberto');
    document.body.classList.add('menu-aberto');
    botao.setAttribute('aria-expanded', 'true');
    botao.setAttribute('aria-label', 'Fechar menu');
    painel.setAttribute('aria-hidden', 'false');
    painel.inert = false;

    primeiroLink?.focus();
  }

  function fecharMenu({ restaurarFoco = false } = {}) {
    if (!menu.classList.contains('aberto')) return;

    menu.classList.remove('aberto');
    document.body.classList.remove('menu-aberto');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
    painel.setAttribute('aria-hidden', 'true');
    painel.inert = true;

    if (restaurarFoco) botao.focus();
  }

  botao.addEventListener('click', () => {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';

    if (estaAberto) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  });

  fundo.addEventListener('click', () => {
    fecharMenu({ restaurarFoco: true });
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      fecharMenu();
    });
  });

  document.addEventListener('keydown', (evento) => {
    if (!menu.classList.contains('aberto')) return;

    if (evento.key === 'Escape') {
      fecharMenu({ restaurarFoco: true });
      return;
    }

    if (evento.key === 'Tab') {
      const itensFocaveis = obterItensFocaveis();
      const primeiroItem = itensFocaveis[0];
      const ultimoItem = itensFocaveis[itensFocaveis.length - 1];

      if (!primeiroItem || !ultimoItem) {
        evento.preventDefault();
        return;
      }

      if (evento.shiftKey && document.activeElement === primeiroItem) {
        evento.preventDefault();
        ultimoItem.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimoItem) {
        evento.preventDefault();
        primeiroItem.focus();
      }
    }
  });

  mediaDesktop.addEventListener('change', (evento) => {
    if (evento.matches) fecharMenu();
  });
});

