# Codelearn

Prática de lógica de programação em Python para estudo individual e com colegas: catálogo, editor, testes editáveis, correção automática, dicas e progresso local. Sem conta e sem servidor de correção.

## Executar

Requer Node.js 22.12 ou superior e npm. A instalação inicial precisa de internet.

```sh
npm ci
npm run dev
```

Abra o endereço informado pelo Vite. O comando prepara automaticamente os arquivos do runtime Python. A primeira execução no navegador carrega cerca de 12 MB de arquivos não comprimidos; o tempo depende da conexão e do dispositivo.

```sh
npm test
npm run build
npm run preview
```

O build estático fica em `dist/`. Use um servidor HTTP para abrir o projeto; não abra `index.html` por `file://`.

## O que está disponível

- Três exercícios: área de terreno, diferença entre números e soma dos negativos.
- Editor Python com sintaxe, indentação e numeração de linhas.
- Testes de prática em abas, com indicadores de execução, aprovação e falha; submissão com testes oficiais independentes.
- Python em Worker novo por teste, com cancelamento, limite de tempo e saída.
- Dicas graduais, rascunhos, histórico das últimas 20 submissões e progresso por versão.
- Busca, filtro de temas, navegação entre exercícios e links diretos por fragmento de URL.
- Painel com abas para testes de prática, resultado e histórico, reduzindo a rolagem.
- Tema automático do sistema, com opções claro e noturno; preferência salva neste navegador.

Os testes ocultos estão escondidos apenas na interface: podem ser inspecionados nos arquivos do site. Não há proteção contra fraude. Seu código é executado no próprio navegador, sem envio a um servidor. Não há limite rígido de memória; execute apenas código que você deseja rodar no seu dispositivo.

O progresso existe apenas neste navegador. Limpar seus dados pode apagá-lo. A fonte visual pode ser carregada do Google Fonts; se estiver indisponível, a interface usa fontes locais. O runtime Python é servido junto com o site.

## Publicar no GitHub Pages

O workflow em `.github/workflows/pages.yml` está preparado para testar, compilar e publicar, sem contratar servidor:

1. Envie o projeto para um repositório GitHub com branch `main`.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions** como origem.
3. Faça push para `main` ou execute manualmente o workflow **Validar e publicar no GitHub Pages**.
4. Após sucesso, abra o endereço apresentado pelo job de deploy. Para compartilhar um exercício, copie o endereço completo com `#/exercicio/...`.

Não foi publicado nesta sessão, pois o repositório local não tem remoto configurado. A disponibilidade gratuita depende das condições da sua conta GitHub; o projeto não requer serviços pagos de execução de Python.

## Documentação e verificação

- [Requisitos e critérios de aceite](docs/requisitos.md).
- [Decisões e andamento](docs/decisoes.md).
- [Arquitetura, limites e contratos internos](docs/arquitetura.md).
- [Conteúdo piloto e como adicionar exercícios](docs/conteudo.md).

Os testes automatizados usam Pyodide real no Node e verificam correção, erros, loops, excesso de saída, cancelamento, isolamento e persistência. Os testes DOM também verificam as abas, navegação por teclado, indicadores e edição dos casos; testes de tema cobrem o sistema e a preferência manual. Não houve revisão em navegador nesta sessão porque a ferramenta de acesso ao navegador estava indisponível. A revisão visual, o uso em dispositivos móveis e a validação no GitHub Pages publicado permanecem pendentes.
