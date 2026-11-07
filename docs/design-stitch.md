# Referência gerada no Stitch

Projeto: https://stitch.withgoogle.com/projects/18133765567353970117

Conteúdo original gerado pelo Stitch; funcionalidades e conteúdo do MVP prevalecem sobre exemplos conceituais abaixo.

---
name: Bancada Técnica Editorial
colors:
  surface: '#101418'
  surface-dim: '#101418'
  surface-bright: '#36393f'
  surface-container-lowest: '#0b0e13'
  surface-container-low: '#191c21'
  surface-container: '#1d2025'
  surface-container-high: '#272a2f'
  surface-container-highest: '#32353a'
  on-surface: '#e1e2e9'
  on-surface-variant: '#c0c7d4'
  inverse-surface: '#e1e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#8b919d'
  outline-variant: '#414752'
  surface-tint: '#a2c9ff'
  primary: '#a2c9ff'
  on-primary: '#00315c'
  primary-container: '#58a6ff'
  on-primary-container: '#003a6b'
  inverse-primary: '#0060aa'
  secondary: '#ffb787'
  on-secondary: '#512400'
  secondary-container: '#964901'
  on-secondary-container: '#ffcfb1'
  tertiary: '#67df70'
  on-tertiary: '#00390d'
  tertiary-container: '#40ba51'
  on-tertiary-container: '#004411'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a2c9ff'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#004882'
  secondary-fixed: '#ffdcc7'
  secondary-fixed-dim: '#ffb787'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#733600'
  tertiary-fixed: '#83fc89'
  tertiary-fixed-dim: '#67df70'
  on-tertiary-fixed: '#002105'
  on-tertiary-fixed-variant: '#005317'
  background: '#101418'
  on-background: '#e1e2e9'
  surface-variant: '#32353a'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

A plataforma foi concebida sob o prisma de uma oficina técnica refinada: um ambiente de estudo e experimentação de código limpo, focado e desprovido de ruídos artificiais. Em contraste direto com interfaces saturadas de gamificação estridente ou clones frios de plataformas competitivas, este design system estabelece um ritmo calmo, acolhedor e profundamente focado para iniciantes brasileiros que estão escrevendo seus primeiros scripts em Python.

A personalidade do produto combina rigor instrutivo com calidez humana. O estilo visual funde **Minimalismo Técnico** e **Sensibilidade Editorial**, priorizando superfícies em ardósia escura, grafite mineral e contrastes tipográficos refinados. Elementos visuais comunicam precisão artesanal: bordas discretas de baixo contraste, iluminação sutil pontual em âmbar aquecido e azul técnico cadenciado, transmitindo respeito pelo tempo e pela curva de aprendizado do estudante.

## Colors

A paleta cromática foi estruturada para mitigar a fadiga ocular em sessões prolongadas de digitação e depuração de código, ancorada num ecossistema estritamente escuro:

- **Base e Superfícies Neutras (`#12151A`)**: Um grafite profundo com matiz levemente frio de ardósia, servindo de base estrutural. As superfícies elevadas escalonam suavemente para `#181C22`, `#1F242C` e `#282E37`, criando planos legíveis sem contrastes violentos.
- **Primária — Azul Técnico (`#58A6FF`)**: Um azul celeste suave, preciso e funcional. Utilizado para representar estados interativos principais, cursor ativo, referências estruturais de funções e comandos primários do fluxo de execução.
- **Secundária — Âmbar Cobre Aquecido (`#E0823D`)**: Um tom editorial quente com presença terrosa. Empregado para destacar chamadas analíticas, avisos de sintaxe, marcos de raciocínio lógico e anotações conceituais de suporte.
- **Terciária — Verde Compilação (`#3FB950`)**: Um verde equilibrado reservado para validações de sucesso, suítes de testes aprovadas e saídas de console sem erros.
- **Cores de Texto**: Primário em `#E6EDF3` (cinza-giz de altíssima legibilidade), secundário em `#8B949E` (ardósia neutro) e atenuado em `#656D76` para metadados de baixo peso.

## Typography

A arquitetura tipográfica foi desenhada para estabelecer uma distinção nítida entre instrução conceitual, texto de suporte e código executável:

- **Títulos (`Space Grotesk`)**: Traz uma cadência técnica, geométrica e limpa, expressando modernidade sóbria sem parecer genérica.
- **Corpo e Explicações (`Plus Jakarta Sans`)**: Fonte humanista acolhedora que suaviza o peso cognitivo de novos conceitos, proporcionando leitura fluida em parágrafos longos e enunciados de problemas.
- **Código e Metadados (`JetBrains Mono`)**: Fonte monospaçada projetada especificamente para desenvolvedores. Oferece diferenciação cristalina de caracteres semelhantes (`0` vs `O`, `l` vs `1`), pontuação evidente e altura de x generosa, indispensável para quem está aprendendo a sintaxe de Python.

## Layout & Spacing

O layout é orientado pela metáfora de uma bancada técnica dividida em dois eixos complementares: **Painel Editorial** (instruções, contexto e teoria) e **Bancada de Execução** (editor de código interativo, console de saída e casos de teste).

- **Grid Desktop (>= 1024px)**: Sistema de colunas fluido com proporção áurea ou divisão assimétrica de trabalho (40% de leitura conceitual / 60% de espaço de trabalho de código). Margens externas de `2.5rem` (`margin-desktop`) e gutters de `1.5rem` (`gutter-desktop`).
- **Tablet (768px - 1023px)**: Layout empilhado ou abas segmentadas com alternância rápida entre enunciado e console. Margens de `1.5rem`.
- **Mobile (< 768px)**: Visualização sequencial em coluna única com alternador fixo de abas inferiores ("Instruções", "Editor", "Terminal"). Margem externa de `1rem`.

O ritmo interno de componentes utiliza escala modular estrita baseada em múltiplos de 4px, preservando folga visual entre linhas de código e painéis de dados.

## Elevation & Depth

A profundidade é expressa quase que exclusivamente por **camadas tonais de superfície** e **linhas de contorno de baixo contraste**, rejeitando sombras projetadas dramáticas ou efeitos ópticos dispersivos:

- **Plano 0 (Base do Canvas)**: `#12151A`, o fundo imersivo sobre o qual repousa toda a aplicação.
- **Plano 1 (Módulos da Bancada)**: `#181C22`, delimitado por bordas finas de 1px em `#2D333B` (opacidade sutil de 80%).
- **Plano 2 (Superfícies de Foco e Modais)**: `#1F242C`, com borda em `#373E47` e uma sombra difusa ambiental mínima (`0 8px 24px rgba(0, 0, 0, 0.45)`) apenas para separar camadas sobrepostas.
- **Destaques de Linha**: Acentos de foco ativo recebem uma borda de 1px sutilmente iluminada no azul técnico (`#58A6FF`) ou âmbar (`#E0823D`), reforçando o controle de foco de teclado sem poluição visual.

## Shapes

A linguagem formal adota o nível de arredondamento **Soft** (`roundedness: 1`), transmitindo o acabamento sóbrio e contido de instrumentos de laboratório ou ferramentas profissionais de engenharia:

- Botões, campos de entrada, abas e tags usam raio base de `0.25rem` (4px).
- Painéis da bancada técnica, blocos de código e caixas de alerta utilizam `0.5rem` (8px).
- Diálogos modais e menus suspensos recebem `0.75rem` (12px).
- Nenhuma forma é circular ou em formato de pílula completa, evitando infantilizar a experiência educacional.

## Components

### Botões
- **Primário ("Executar Código")**: Fundo `#58A6FF`, texto `#0D1117` em peso semi-bold (`Space Grotesk` ou `JetBrains Mono`), padding de `0.5rem 1.25rem`, borda imperceptível. No hover, ganha tonalidade `#79B8FF`.
- **Secundário ("Enviar Resposta")**: Fundo `#1F242C`, borda de 1px em `#E0823D`, texto em `#E0823D`. Ao interagir, preenchimento suave com 10% de opacidade de âmbar.
- **Terciário/Ação de Console ("Limpar Terminal", "Dica")**: Fundo transparente, texto `#8B949E`, sem borda estática; sob hover, texto `#E6EDF3` e fundo `#181C22`.

### Editor de Código e Terminal
- **Bancada de Código**: Fundo `#14181E`, numeração de linhas em `JetBrains Mono` com cor `#484F58`. Linha ativa realçada por sutil preenchimento de fundo em `#1F242C`.
- **Terminal de Saída**: Fundo `#0D1015`, cabeçalho do console em `label-sm` com indicador de status circular de 6px (Verde para sucesso, Âmbar para aviso, Vermelho técnico `#F85149` para Traceback).

### Cards e Blocos Editoriais
- **Explicativos Teóricos**: Painéis com fundo `#181C22`, borda lateral esquerda de 3px em tom de cobre aquecido (`#E0823D`), integrando texto conceitual e trechos curtos de exemplo.
- **Cards de Exercício**: Exibem nível de proficiência em `JetBrains Mono` reduzido, estimativa de leitura/prática em minutos e indicador discreto de progresso com barra de 2px.

### Inputs e Campos de Teste
- Fundo `#12151A`, contorno de 1px em `#2D333B`, texto em `Plus Jakarta Sans` ou `JetBrains Mono` (conforme o tipo de dado esperado). Em foco, borda `#58A6FF` sem anéis de sombra adicionais.

### Caixas de Seleção e Alternadores
- Checkboxes e radio buttons têm geometria quadrada e compacta com raio de 2px, borda cinza-grafite `#373E47`, preenchimento ativo em `#58A6FF` com ícone de marcação nítido em contraste escuro.
