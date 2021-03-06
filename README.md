# Trabalho Final da disciplina de Arquitetura de Aplicações Móveis no curso de pós-graduação de Arquitetura de Software Distribuído da PUC-MG

## Nome e Matrícula

- André Luis Barbosa Coutinho - 138796

## Temática

A temática escolhida foi um aplicativo de listagem de herois do jogo [Dota 2](https://www.dota2.com/home)

A aplicação foi hospedada utilizando do [Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart?hl=pt-br) e pode ser encontrada no link [Dota 2 App](https://trabalho-final-arq-mobile.web.app/)

## Roteiro

Baseado no estudo de caso desenvolvido em sala (BurguerApp, cujo o código está disponível no Canvas para download) você deve construir um PWA com outra temática (saúde, gastronomia, música, carro, cultura, arte etc.) que contemple:

- Validação de todos os items necessários a um PWA (exceção do HTTPS porque nem todos tem servidores com ssl);
manifesto;
  - cor do theme;
  - ícones completos;
  - offline;
- Construção de um cache para armazenamento das Views estáticas;
- Construção de um cache para armazenamento de conteúdo (parte dinâmica da página vinda de um .JSON);
- Instalação do App:
  - Necessário uma interação com o ACEITAR / Ñ ACEITAR do usuário (ex: somente deixar ele seguir se instalar, ou dar uma mensagem de boas vindas somente após instalação).