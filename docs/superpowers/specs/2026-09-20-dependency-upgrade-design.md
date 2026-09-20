# Atualização de dependências, Tailwind v4 e migração para Biome

**Data:** 2026-09-20
**Branch:** `chore/upgrade-nextjs-16`
**Status:** aprovado, aguardando plano de implementação

## Objetivo

Levar todas as dependências do `mognus-next` para a última versão estável,
migrar o Tailwind CSS para a v4, substituir o ESLint pelo Biome e remover
código e dependências mortas — sem alterar o comportamento ou a aparência da
aplicação.

## Restrições

- Nenhuma mudança na lógica de negócio, nos textos, nas rotas, no i18n, nos
  metadados ou nos assets.
- Cada etapa termina com o projeto verde (`tsc --noEmit` e `pnpm build`).
- Um commit por etapa, revertível isoladamente.
- Sem versões canary ou beta.
- Remoção de código morto apenas com prova de zero referências.

## Estado inicial

| Item | Valor |
|---|---|
| Package manager | pnpm 11.20.0 (`pnpm-lock.yaml`, `pnpm-workspace.yaml`) |
| Node | v24.19.0 |
| Framework | Next.js 16.3.5 (App Router, i18n por `[locale]`) |
| Arquivos em `src/` | ~50 (`.ts`/`.tsx`), sem testes |
| Lint | ESLint 9.39.5 flat config + `eslint-config-next` |
| Formatter | nenhum (não há Prettier no projeto) |
| Baseline | `tsc --noEmit` passa |

`next`, `react`, `react-dom`, `@types/react` e `@types/react-dom` já estão na
última versão estável (16.3.5 / 19.3.0) e **não são tocados** nesta migração.
`@types/react` e `@types/react-dom` permanecem fixados em 19.3.0 pelos
`overrides` do `pnpm-workspace.yaml`, para casar com o React instalado.

## Alvos de versão

### Sem breaking change (etapa 3)

| Pacote | De | Para |
|---|---|---|
| `@radix-ui/react-dropdown-menu` | ^2.1.1 | 2.1.24 |
| `@radix-ui/react-icons` | ^1.3.0 | 1.3.2 |
| `@radix-ui/react-label` | ^2.1.0 | 2.1.15 |
| `@radix-ui/react-slot` | ^1.1.0 | 1.3.3 |
| `class-variance-authority` | ^0.7.0 | 0.7.1 |
| `embla-carousel-react` | ^8.1.8 | 8.6.0 |
| `react-hook-form` | ^7.53.0 | 7.88.0 |
| `react-icons` | ^5.2.1 | 5.7.0 |
| `typescript` | ^5 | 5.9.3 |
| `@types/node` | ^20 | 26.6.2 |
| `postcss` | ^8 | 8.5.28 |

`clsx` (2.1.1), `next-intl` (4.14.5) e `next-themes` (0.4.6) já estão na última
versão e não mudam.

### Com breaking change

| Pacote | De | Para | Etapa |
|---|---|---|---|
| `zod` | ^3.23.8 | 4.6.5 | 4 |
| `@hookform/resolvers` | ^3.9.0 | 5.9.1 | 4 |
| `nodemailer` | ^6.9.14 | 10.0.10 | 4 |
| `@types/nodemailer` | ^6.4.15 | 8.0.2 | 4 |
| `tailwindcss` | ^3.4.1 | 4.3.3 | 5 |
| `tailwind-merge` | ^2.4.0 | 3.7.0 | 5 |
| `sonner` | ^1.5.0 | 2.0.8 | 6 |

### Adicionados

| Pacote | Versão | Motivo |
|---|---|---|
| `@biomejs/biome` | 2.5.14 | substitui o ESLint |
| `@tailwindcss/postcss` | 4.3.3 | plugin PostCSS exigido pelo Tailwind v4 |
| `tw-animate-css` | 1.4.0 | sucessor do `tailwindcss-animate` na v4 |

### Removidos

| Pacote | Motivo |
|---|---|
| `eslint` | substituído pelo Biome |
| `eslint-config-next` | idem |
| `@radix-ui/react-toast` | única consumidora era o cluster morto de toast |
| `tailwindcss-animate` | substituído por `tw-animate-css` |

## Decisão: TypeScript 5.9.3, não 7.0.2

O TypeScript 7.0.2 (reescrita nativa) é a última versão publicada, mas o
suporte ao plugin `{ "name": "next" }` do `tsconfig.json` e a alguns recursos de
type-checking ainda diverge do 5.x. Adotá-lo introduziria erros não
relacionados à migração. Ficamos no 5.9.3, o último da linha 5.x.

## Decisão: estilo do formatter do Biome

O padrão do Biome é indentação por **tab**. O código atual usa **2 espaços,
aspas duplas e ponto-e-vírgula**. O `biome.json` preserva o estilo atual:

```json
{
  "formatter": { "indentStyle": "space", "indentWidth": 2, "lineWidth": 80 },
  "javascript": { "formatter": { "quoteStyle": "double", "semicolons": "always" } }
}
```

Assim o commit de formatação fica quase vazio e os diffs das etapas seguintes
contêm apenas mudanças reais.

## Auditoria de código morto

Levantamento por referência cruzada de imports em `src/`:

**Cluster morto confirmado** — `ui/toaster.tsx` não é importado por nenhum
arquivo; ele importa `hooks/use-toast.ts`, que importa `ui/toast.tsx`. Os três
formam um ciclo fechado sem entrada externa. A aplicação usa `sonner` através de
`ui/sonner.tsx`, importado em `app/[locale]/layout.tsx`.

Removidos na etapa 2:

- `src/components/ui/toast.tsx`
- `src/components/ui/toaster.tsx`
- `src/hooks/use-toast.ts`
- dependência `@radix-ui/react-toast`

**Falso positivo descartado** — `tailwindcss-animate` aparece uma única vez no
código (`tailwind.config.ts`), o que sugere dependência morta. Não é: fornece
60+ utilitários em uso (`animate-in` ×14, `fade-in-0` ×11, `animate-out` ×6,
`slide-in-from-*`, `zoom-in-95`, `zoom-out-95`). É substituído, não removido.

**Mantidos** — todo o resto de `src/components/ui/` tem pelo menos uma
referência externa. `@radix-ui/react-icons` e `react-icons` são ambos usados
(4 e 7 arquivos). Critério conservador: nada com ≥1 referência é removido.

## Impacto do Tailwind v4

Auditoria das mudanças da v4 contra este código:

| Mudança da v4 | Impacto aqui | Tratamento |
|---|---|---|
| `container` não é mais configurável | classe `container` **nunca usada** | remover a config, não recriar com `@utility` |
| `fontFamily` no `@theme` | `font-sans`/`serif`/`mono` **nunca usados** | declarar só `--font-montserrat` e `--font-poppins` |
| `darkMode: ["class"]` removido | usado (`next-themes` com `attribute="class"`) | `@custom-variant dark (&:is(.dark *))` |
| `shadow-sm`→`shadow-xs`, `shadow`→`shadow-sm` | 6 + 2 ocorrências | codemod |
| `rounded-sm`→`rounded-xs`, `rounded`→`rounded-sm` | 4 + 1 ocorrências | codemod |
| `outline-none`→`outline-hidden` | 15 ocorrências | codemod |
| `ring` agora é 1px (era 3px) | 13 ocorrências | codemod (→ `ring-3`) |
| `bg-gradient-to-*`→`bg-linear-to-*` | 1 ocorrência (`ProjectSlider.tsx`) | codemod |
| Modificadores de opacidade em cores do tema | 58 usos (`text-foreground/70` e afins) | funcionam via `color-mix()` desde que as cores estejam no `@theme`; **verificar no browser** |
| Plugin PostCSS | `postcss.config.mjs` usa `tailwindcss: {}` | trocar por `@tailwindcss/postcss: {}` |
| Diretivas `@tailwind` | 3 em `globals.css` | trocar por `@import "tailwindcss"` |

Fora de `src/components/ui/` (que a etapa 6 substitui), apenas 5 arquivos
contêm classes afetadas: `header/Logo.tsx`, `header/MenuMobile.tsx`,
`header/SwitcherLang.tsx`, `header/NavBar.tsx`, `ProjectSlider.tsx`.

A migração usa `npx @tailwindcss/upgrade` (ferramenta oficial, 4.3.3) para os
codemods e a conversão `tailwind.config.ts` → `@theme`, seguida de revisão
manual do diff. Ajustes que a ferramenta não cobre — `@custom-variant dark`, a
troca por `tw-animate-css`, a remoção da config de `container` — são feitos à
mão.

O `next.config.mjs` e o wrapper `createNextIntlPlugin` não mudam. A
documentação do Next 16 (`node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`)
confirma `tailwindcss` + `@tailwindcss/postcss` + `@import "tailwindcss"` como o
caminho suportado.

## Re-vendorização do shadcn/ui

Os 9 componentes em uso são baixados de novo na versão para Tailwind v4:
`button`, `card`, `carousel`, `dropdown-menu`, `form`, `input`, `label`,
`sonner`, `textarea`. `toast` e `toaster` não são re-baixados — foram apagados
na etapa 2 e o shadcn os descontinuou em favor do sonner.

O `components.json` passa a ter `tailwind.config: ""` (convenção da v4).

**Customizações a preservar após o re-vendor:**

- `ui/sonner.tsx` tem um bloco `toastOptions.classNames` customizado
  (`group-[.toaster]:bg-background` etc.) que a versão v4 não traz. Deve ser
  reaplicado.

**Mudança visual aceita:** o `button` da v4 usa
`focus-visible:ring-[3px] ring-ring/50` no lugar do `focus-visible:ring-1
focus-visible:ring-ring` atual. O anel de foco muda de aparência. É inerente à
escolha de re-vendorizar e fica registrado no `MIGRATION.md`.

**Paleta:** as cores atuais (primary `24.6 95% 53.1%`, ou seja, a base `orange`
do shadcn) e o `--radius: 0.75rem` customizado devem ser preservados
exatamente. Se a re-vendorização reescrever `globals.css` com a paleta padrão,
os valores originais são restaurados.

## Migração do zod 3 → 4

`src/lib/contact-schema.ts` é o único consumidor. As regras de validação
(mensagens, `min`/`max`/`regex`, o `phoneRegex`) são preservadas 1:1; muda só a
sintaxe:

- `z.string().email({ message })` → `z.email({ message })`
- conferir a assinatura de `{ message }` vs `{ error }` na versão 4.6.5
- `z.infer<typeof FormSchema>` permanece válido

`@hookform/resolvers` 5 mudou os caminhos de import na v4; confirmar que
`import { zodResolver } from "@hookform/resolvers/zod"` em
`components/sections/Contact.tsx` continua correto para a v5.

## Ordem de execução

| # | Etapa | Verificação |
|---|---|---|
| 0 | Baseline: `tsc` + `build` + screenshots de referência (pt/en/fr × light/dark × mobile/desktop) | referência visual salva |
| 1 | Biome substitui ESLint; `biome check --write` (commit de formatação) | `tsc` + `build` |
| 2 | Remoção do cluster morto de toast + `@radix-ui/react-toast` | `tsc` + `build` |
| 3 | Deps sem breaking change | `tsc` + `build` |
| 4 | `zod` 4 + `@hookform/resolvers` 5 + `nodemailer` 10 | `tsc` + `build` + formulário no browser |
| 5 | Tailwind v4 + `tailwind-merge` 3 | `build` + `dev` + diff visual vs baseline |
| 6 | Re-vendor shadcn + `sonner` 2 | `build` + diff visual |
| 7 | Validação final + `MIGRATION.md` | tudo + varredura completa no agent-browser |

A etapa 0 vem primeiro porque, na ausência de testes, o par de screenshots
baseline/final é o único controle real sobre "não alterar o comportamento".

A etapa 2 vem antes das atualizações para não gastar codemod e re-vendorização
em arquivos que serão apagados.

A etapa 4 (mudanças de lógica) vem antes da 5 (mudanças visuais) para que
qualquer regressão visual detectada na etapa 5 tenha causa inequívoca.

## Validação final (etapa 7)

1. `pnpm biome check` sem erros
2. `pnpm tsc --noEmit` sem erros
3. `pnpm build` sem erros nem avisos novos
4. `pnpm dev` sobe e o hot-reload funciona
5. Varredura no agent-browser, comparada com o baseline da etapa 0:
   - home nas três locales (`pt`, `en`, `fr`)
   - tema claro e escuro, viewport mobile e desktop
   - dropdown de troca de idioma (`SwitcherLang`)
   - dropdown de tema (`ModeToggle`)
   - carrossel de projetos (`ProjectSlider`)
   - menu mobile (`MenuMobile`)
   - formulário de contato: validação com dados inválidos e submissão
   - as três páginas de política (`cookies-policy`, `privacy-policy`,
     `terms-of-services`)
6. Nova passada do `biome lint` para imports não usados, já que o código mudou
   desde a etapa 1

## Riscos e limitações declarados

**Envio de e-mail não é verificável.** Não existe `.env` no projeto. O
`nodemailer` 10 é exercitado só por typecheck. No browser dá para validar a
validação do formulário, o estado `isPending` e o toast de **erro** (o caminho
que ocorre justamente sem as variáveis de ambiente). O toast de **sucesso** e o
`sendMail` real ficam sem cobertura. Registrar como pendência no
`MIGRATION.md` para verificação manual com credenciais.

**Ausência de testes.** Nenhuma regressão é detectável automaticamente. A
mitigação é o par de screenshots baseline/final e o `tsc --noEmit` estrito
(`strict: true` já está ligado).

**Modificadores de opacidade.** Os 58 usos de `text-foreground/70` e similares
dependem de as cores do tema estarem declaradas como valores de cor
resolvíveis no `@theme`. É o ponto de falha mais provável da etapa 5 e o
primeiro a conferir no diff visual.

## Fora de escopo

- Lógica de negócio, textos, `messages/*.json`, rotas, i18n, metadata, assets
- Atualização de `next`, `react`, `react-dom` (já na última versão)
- TypeScript 7
- Introdução de uma suíte de testes
- Qualquer refactor não exigido pelas migrações acima
