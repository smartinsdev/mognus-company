# Migração: dependências, Tailwind v4 e Biome

Executada em 2026-09-20, na branch `chore/upgrade-nextjs-16`, em sete commits
revertíveis isoladamente.

## Resumo

- Todas as dependências foram para a última versão estável.
- Tailwind CSS migrado da v3 para a v4 (configuração em CSS, sem
  `tailwind.config.ts`).
- ESLint substituído pelo Biome. O projeto não usava Prettier.
- Componentes shadcn/ui re-vendorizados na revisão para Tailwind v4.
- Removido o código morto comprovado e quatro dependências órfãs.

`next`, `react` e `react-dom` **não** foram tocados: já estavam na última versão
(16.3.5 / 19.3.0), atualizados numa passagem anterior.

## Tabela de versões

### Atualizados

| Pacote | De | Para |
|---|---|---|
| `@hookform/resolvers` | 3.9 | 5.9.1 |
| `@radix-ui/react-icons` | 1.3.0 | 1.3.2 |
| `@types/node` | 20 | 26.6.2 |
| `@types/nodemailer` | 6.4.15 | 8.0.2 |
| `class-variance-authority` | 0.7.0 | 0.7.1 |
| `embla-carousel-react` | 8.1.8 | 8.6.0 |
| `nodemailer` | 6.9.14 | 10.0.10 |
| `postcss` | 8.x | 8.5.28 |
| `react-hook-form` | 7.53 | 7.88.0 |
| `react-icons` | 5.2.1 | 5.7.0 |
| `sonner` | 1.5 | 2.0.8 |
| `tailwind-merge` | 2.4 | 3.7.0 |
| `tailwindcss` | 3.4.1 | 4.3.3 |
| `typescript` | 5.x | 5.9.3 |
| `zod` | 3.23.8 | 4.6.5 |

`clsx`, `next-intl` e `next-themes` já estavam na última versão.

### Adicionados

| Pacote | Versão | Motivo |
|---|---|---|
| `@biomejs/biome` | 2.5.14 | substitui o ESLint |
| `@tailwindcss/postcss` | 4.3.3 | plugin PostCSS exigido pela v4 |
| `tw-animate-css` | 1.4.0 | sucessor do `tailwindcss-animate` na v4 |
| `radix-ui` | 1.6.7 | pacote unificado usado pelos componentes shadcn v4 |
| `lucide-react` | 1.47.0 | ícones dos componentes shadcn v4 |

### Removidos

| Pacote | Motivo |
|---|---|
| `eslint`, `eslint-config-next` | substituídos pelo Biome |
| `@radix-ui/react-toast` | única consumidora era o cluster morto de toast |
| `@radix-ui/react-dropdown-menu` | substituído pelo pacote `radix-ui` unificado |
| `@radix-ui/react-label` | idem |
| `@radix-ui/react-slot` | idem |
| `tailwindcss-animate` | plugin v3; substituído por `tw-animate-css` |

## Por que TypeScript 5.9.3 e não 7.x

O TypeScript 7.0.2 é a última versão publicada, mas é um compilador diferente
(reescrita nativa) e o suporte ao plugin `{ "name": "next" }` do `tsconfig.json`
ainda diverge. Adotá-lo introduziria erros sem relação com esta migração.

## Tailwind v4

A migração usou `npx @tailwindcss/upgrade@4.3.3`, que converteu
`tailwind.config.ts` num bloco `@theme` dentro de `src/app/globals.css`, trocou o
plugin do PostCSS e aplicou os codemods de nome de classe
(`outline-none`→`outline-hidden`, `shadow-sm`→`shadow-xs`,
`bg-gradient-to-*`→`bg-linear-to-*`, `break-words`→`wrap-break-word`).

A paleta laranja e o `--radius: 0.75rem` foram preservados: medidos nos dois
builds, `background` e `foreground` do `<body>` continuam em `255,255,255` e
`12,10,9`.

Quatro coisas o codemod **não** cobriu e foram feitas à mão:

1. **Variáveis de fonte.** As variáveis do `next/font` passaram a
   `--font-montserrat-sans` / `--font-poppins-sans` e migraram do `<body>` para
   o `<html>`. Na v4 o utilitário `font-montserrat` deriva do token
   `--font-montserrat` declarado em `:root`; com o nome antigo o token
   referenciava a si mesmo, e com as variáveis no `<body>` o `:root` não
   conseguia resolvê-las. **Sem essa correção o site inteiro caía para uma
   sans-serif genérica.**

2. **`tailwindcss-animate` → `tw-animate-css`.** Não era dependência morta,
   apesar de aparecer uma única vez no código: alimenta mais de 60 utilitários
   em uso (`animate-in`, `fade-in-0`, `slide-in-from-*`, `zoom-in-95`).

3. **`space-x` → `gap` no `NavBar`.** A v4 põe a margem à direita de todos os
   filhos menos o último; o botão de menu `md:hidden` deixava 12px de espaço
   sobrando no desktop. É a única linha `space-*` da aplicação com um filho
   `display:none`.

4. **`lg:leading-none` no `<h1>` do Hero.** Na v3 a entrelinha embutida em
   `lg:text-5xl` / `xl:text-7xl` sobrescrevia o `leading-snug`; na v4 não. Sem a
   classe explícita o título ganhava 27px por linha (108px no total, em 4
   linhas). No mobile já era idêntico nas duas versões.

Também foram removidos da configuração: o bloco `container` (a classe nunca é
usada no código) e as keyframes de accordion (não há componente accordion nem
`@radix-ui/react-accordion` no projeto).

## Biome

Não havia Prettier no projeto, então a substituição foi só do ESLint. O
`biome.json` configura o formatter para o estilo já praticado no código — 2
espaços, aspas duplas, ponto-e-vírgula — de modo que o commit de formatação
ficasse restrito aos arquivos shadcn vendorizados, que vinham sem
ponto-e-vírgula.

Scripts novos:

```
pnpm lint     # biome lint .
pnpm format   # biome format --write .
pnpm check    # biome check --write .
```

Regras ajustadas deliberadamente, para que a troca de ferramenta não virasse um
refactor:

| Regra | Ajuste | Motivo |
|---|---|---|
| `style/noNonNullAssertion` | `off` | Os 6 casos são leituras de `process.env` em `lib/nodemailer.ts`; satisfazer a regra mudaria o comportamento em runtime. |
| `suspicious/noUnknownAtRules` | `off` | At-rules do Tailwind. Também foi ligado `css.parser.tailwindDirectives` para o `@apply` ser parseado. |
| `a11y/noSvgWithoutTitle` | `warn` | Problemas reais e preexistentes, mas corrigi-los exige mudar markup — fora do escopo desta migração. |
| `a11y/noStaticElementInteractions` | `warn` | idem |
| `a11y/useKeyWithClickEvents` | `warn` | idem |
| `a11y/useSemanticElements` | `warn` | idem |
| `suspicious/noArrayIndexKey` | `warn` | idem |

Hoje `pnpm lint` termina com 0 erros e 7 avisos, todos nas categorias acima.
Eles ficam registrados como dívida a tratar quando houver espaço para mexer em
markup.

## Código removido

**Cluster morto de toast.** `src/components/ui/toaster.tsx` não tinha nenhum
importador; ele puxava `src/hooks/use-toast.ts`, que puxava
`src/components/ui/toast.tsx` — um ciclo fechado sem porta de entrada. A
aplicação emite toasts pelo `sonner`, via `ui/sonner.tsx`, montado no layout de
locale. Os três arquivos foram apagados (`src/hooks/` ficou vazio e sumiu) e a
dependência `@radix-ui/react-toast` foi removida junto.

**Prop `isScrolled` do `Logo`.** Declarada, desestruturada e nunca lida; o
`NavBar` renderiza `<Logo />` sem props.

**Imports não utilizados.** Seis arquivos, em sua maioria `import * as React`
remanescente do transform JSX clássico.

Critério aplicado: só foi removido o que tem zero referências comprovadas. Nada
foi removido por suspeita.

## Mudanças visuais conhecidas e aceitas

A migração foi verificada comparando, a cada etapa, 20 screenshots (3 locales ×
2 temas × 2 viewports, mais as páginas de política e os estados interativos)
contra um baseline capturado antes de qualquer alteração, e comparando estilos
computados elemento a elemento contra um build do commit anterior ao Tailwind.

Biome, remoção de código morto, as 11 atualizações sem breaking change e a
migração zod 4 / nodemailer 10 produziram **20 de 20 screenshots byte-idênticos**
ao baseline — zero mudança visual.

O Tailwind v4 e a re-vendorização do shadcn produziram estas diferenças, todas
intencionais ou inerentes:

1. **Campos de formulário inválidos ganham borda destrutiva.** É o estilo
   `aria-invalid` dos componentes shadcn v4. Antes só havia o texto vermelho
   abaixo do campo.
2. **Padding dos `Card` redistribuído.** Saiu de `CardHeader`/`CardContent`
   (`p-6`) para o próprio `Card` (`py-6` + `gap-6`).
3. **Texto do CTA do header em 14px, era 12px.** O `text-sm` do próprio botão
   passou a vencer o `text-xs` do link filho.
4. **`FormLabel` passou a ter layout de bloco** e `FormItem` virou `grid gap-2`.
   Isso também corrigiu um bug: na v4 o `space-y-2` colocava uma margem
   vertical no `<label>`, que é `display:inline` e portanto a ignorava,
   encolhendo cada campo em 8px.
5. **Anel de foco do `Button`:** `ring-[3px] ring-ring/50`, antes `ring-1
   ring-ring`.
6. **`neutral-400` foi de `163,163,163` para `161,161,161`**, efeito da paleta
   OKLCH da v4. As cores próprias do projeto não mudaram.
7. **Entrelinha de parágrafos com `leading-relaxed` foi de 24px para 26px**, nos
   breakpoints onde há também um `md:text-base` ou `lg:text-base`. Na v3 a
   entrelinha embutida no `text-*` responsivo sobrescrevia silenciosamente o
   `leading-relaxed`; na v4 o `leading-relaxed` passa a valer, que é o que o
   código pede em 55 lugares. Afeta sobretudo as três páginas de política e a
   seção "Sobre nós". **Se preferir o espaçamento anterior, basta acrescentar
   `md:leading-normal` (ou `lg:leading-normal`) junto de cada
   `leading-relaxed`** — o commit do Tailwind pode ser ajustado sem tocar no
   resto.

Correção latente que a v4 trouxe de brinde: `header/SwitcherLang.tsx` usa
`focus:ring-3`. A escala da v3 era 0/1/2/4/8, então essa classe não produzia
estilo nenhum. Na v4 `ring-3` é válida e o anel de foco passa a aparecer no
botão de troca de idioma.

## Pendente de verificação manual

**Envio real de e-mail.** Não existe `.env` no projeto, então o `nodemailer` 10
só pôde ser exercitado até o ponto da conexão. O que foi verificado:

- `createTransport` e `sendMail` mantêm a mesma assinatura;
- uma chamada real falha com `ESOCKET` / `ECONNREFUSED`, ou seja, falha de
  rede por não haver host configurado, e não incompatibilidade de API;
- no browser, uma submissão válida percorre o caminho completo e exibe o toast
  de erro esperado.

**Falta testar com credenciais reais**: o envio bem-sucedido e o toast de
sucesso.

## Fora de escopo

- TypeScript 7
- Introdução de uma suíte de testes (o projeto não tem nenhuma)
- Atualização de `next` / `react` / `react-dom`, já na última versão
- Correção dos 7 avisos de acessibilidade do Biome
- Qualquer refactor não exigido pelas migrações acima
