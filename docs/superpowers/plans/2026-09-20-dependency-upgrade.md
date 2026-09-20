# Atualização de dependências, Tailwind v4 e Biome — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Levar todas as dependências do `mognus-next` para a última versão estável, migrar o Tailwind para v4, trocar o ESLint pelo Biome e remover código morto — sem alterar comportamento nem aparência.

**Architecture:** Oito tarefas sequenciais, uma por commit, cada uma deixando o projeto verde. Ferramental primeiro (Biome), depois limpeza, depois dependências em ordem crescente de risco, depois o visual (Tailwind + shadcn), e por fim a validação comparativa.

**Tech Stack:** Next.js 16.3.5 (App Router), React 19.3.0, TypeScript 5.9.3, Tailwind CSS 4.3.3, Biome 2.5.14, pnpm 11.20.0, next-intl 4.14.5.

**Spec:** `docs/superpowers/specs/2026-09-20-dependency-upgrade-design.md`

## Global Constraints

- Package manager é **pnpm**. Nunca rodar `npm install` ou `yarn` no projeto; `npx` só para ferramentas de migração one-shot (`@tailwindcss/upgrade`, `shadcn`).
- **Não existe suíte de testes.** O ciclo de teste de cada tarefa é `pnpm exec tsc --noEmit` + `pnpm build`, e nas tarefas visuais também a comparação de screenshots contra o baseline da Tarefa 1. Nenhuma tarefa adiciona testes.
- `next@16.3.5`, `react@19.3.0`, `react-dom@19.3.0` **não são atualizados** — já estão na última estável.
- `@types/react` e `@types/react-dom` ficam fixados em `19.3.0` pelos `overrides` do `pnpm-workspace.yaml`. Não alterar esses overrides.
- TypeScript alvo é **5.9.3**, não 7.x.
- Nenhuma versão canary, beta ou rc.
- Proibido alterar: lógica de negócio, textos, `messages/*.json`, rotas, i18n, `metadata`, assets, `next.config.mjs`.
- Remoção de código só com prova de **zero referências**.
- Um commit por tarefa. Toda mensagem de commit termina com `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- O bloco de `AGENTS.md` é reescrito pelo `next dev`; se aparecer como modificação não solicitada, commitar junto em vez de reverter.
- A paleta deve ser preservada exatamente: `--primary: 24.6 95% 53.1%` (light) / `20.5 90.2% 48.2%` (dark), `--radius: 0.75rem`.

---

### Task 1: Baseline verificável

Estabelece a referência contra a qual todas as mudanças visuais serão comparadas. Sem testes no projeto, este par de screenshots é o único controle real sobre "não alterar o comportamento".

**Files:**
- Create: `$SCRATCH/baseline/` (screenshots, fora do repo), onde
  `SCRATCH=/tmp/claude-1000/-home-martins-projects-mognus-company/110eba11-5df5-427f-9000-54f6c6a673cc/scratchpad`
- Nenhum arquivo do projeto é modificado.

**Interfaces:**
- Consumes: nada.
- Produces: diretório `baseline/` com screenshots nomeados `<locale>-<theme>-<viewport>.png`, consumido pelas Tarefas 6, 7 e 8.

- [ ] **Step 1: Confirmar o estado limpo da árvore**

```bash
cd /home/martins/projects/mognus-company
git status --short
```

Esperado: apenas `?? .agents/`, `?? .claude/`, `?? skills-lock.json` (não rastreados, ignorar).

- [ ] **Step 2: Registrar o typecheck verde**

```bash
pnpm exec tsc --noEmit && echo "BASELINE_TSC=OK"
```

Esperado: `BASELINE_TSC=OK`, sem erros.

- [ ] **Step 3: Registrar o build verde**

```bash
pnpm build 2>&1 | tail -30
```

Esperado: build completa. **Anotar** a listagem de rotas e os tamanhos de bundle — servem de comparação na Tarefa 8.

- [ ] **Step 4: Subir o dev server**

```bash
pnpm dev
```

Rodar em background. Esperado: servidor em `http://localhost:3000`.

- [ ] **Step 5: Capturar os screenshots de baseline**

Invocar a skill `agent-browser`. Para cada combinação, navegar e capturar:

| Locale | URL | Temas | Viewports |
|---|---|---|---|
| pt | `http://localhost:3000/pt` | light, dark | 390×844, 1440×900 |
| en | `http://localhost:3000/en` | light, dark | 390×844, 1440×900 |
| fr | `http://localhost:3000/fr` | light, dark | 390×844, 1440×900 |

Mais, em `pt` / light / 1440×900: `/pt/cookies-policy`, `/pt/privacy-policy`, `/pt/terms-of-services`.

Alternar o tema pelo `ModeToggle` no header. Capturar página inteira, não só a dobra.

- [ ] **Step 6: Capturar os estados interativos de baseline**

Em `pt` / light / 1440×900, capturar: dropdown de idioma aberto (`SwitcherLang`), dropdown de tema aberto (`ModeToggle`), carrossel de projetos após um clique em "próximo", e o formulário de contato com erros de validação visíveis (submeter vazio). Em 390×844, capturar o menu mobile aberto (`MenuMobile`).

- [ ] **Step 7: Anotar o baseline**

Escrever `baseline/NOTES.md` no scratchpad com: a saída de rotas do build, o resultado do `tsc`, e a lista de screenshots capturados. Não commitar — é material de trabalho, fica fora do repo.

- [ ] **Step 8: Sem commit**

Esta tarefa não altera o repositório. Nada a commitar.

---

### Task 2: Biome substitui o ESLint

Troca o ferramental de lint/format antes de qualquer outra mudança, para que os diffs das tarefas seguintes contenham apenas mudanças reais. Não há Prettier no projeto — "remover Prettier" é no-op.

**Files:**
- Create: `biome.json`
- Delete: `eslint.config.mjs`
- Modify: `package.json` (scripts + devDependencies)
- Modify: todos os `.ts`/`.tsx` tocados pelo formatter

**Interfaces:**
- Consumes: nada.
- Produces: scripts `pnpm lint`, `pnpm format`, `pnpm check`; `biome.json` na raiz. Tarefas 3 e 8 usam `pnpm check`.

- [ ] **Step 1: Instalar o Biome**

```bash
pnpm add -D @biomejs/biome@2.5.14
```

- [ ] **Step 2: Remover o ESLint**

```bash
pnpm remove eslint eslint-config-next
rm eslint.config.mjs
```

- [ ] **Step 3: Criar o `biome.json`**

Preserva o estilo atual do código (2 espaços, aspas duplas, ponto-e-vírgula), para que o commit de formatação seja quase vazio.

```json
{
  "$schema": "https://biomejs.dev/schemas/2.5.14/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "includes": [
      "**",
      "!.next/**",
      "!node_modules/**",
      "!next-env.d.ts",
      "!tsconfig.tsbuildinfo",
      "!pnpm-lock.yaml"
    ]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "semicolons": "always",
      "trailingCommas": "es5"
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedImports": "error",
        "noUnusedVariables": "error"
      },
      "style": {
        "useImportType": "error"
      }
    }
  },
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

- [ ] **Step 4: Adicionar os scripts ao `package.json`**

Substituir `"lint": "eslint ."` por:

```json
"lint": "biome lint .",
"format": "biome format --write .",
"check": "biome check --write ."
```

- [ ] **Step 5: Rodar o Biome e ver o que ele aponta**

```bash
pnpm exec biome check . 2>&1 | tail -40
```

Esperado: uma lista de diffs de formatação e possivelmente erros de `noUnusedImports`. **Ler a lista antes de aplicar.** Se aparecer alguma regra que queira reescrever lógica (não só formato), desligar a regra em vez de aceitar a correção.

- [ ] **Step 6: Aplicar as correções seguras**

```bash
pnpm exec biome check --write .
```

- [ ] **Step 7: Revisar o diff**

```bash
git diff --stat
git diff -- src/ | head -100
```

Esperado: só mudanças de formatação e ordenação de imports. **Se algum diff alterar comportamento, reverter aquele arquivo** e ajustar o `biome.json`.

- [ ] **Step 8: Verificar que o projeto segue verde**

```bash
pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -20
```

Esperado: ambos passam.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore(lint): replace ESLint with Biome

Drops eslint and eslint-config-next for @biomejs/biome 2.5.14. The
formatter is configured to match the code's existing style (two-space
indent, double quotes, semicolons) so this commit carries no gratuitous
reformatting and later diffs stay signal-only.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Remover o cluster morto de toast

Feito antes das atualizações para não gastar codemod do Tailwind nem re-vendorização do shadcn em arquivos que serão apagados.

**Files:**
- Delete: `src/components/ui/toast.tsx`, `src/components/ui/toaster.tsx`, `src/hooks/use-toast.ts`
- Modify: `package.json` (remove `@radix-ui/react-toast`)

**Interfaces:**
- Consumes: nada.
- Produces: `src/hooks/` fica vazio e é removido. `src/components/ui/` fica com 9 componentes, que é a lista que a Tarefa 7 re-vendoriza.

- [ ] **Step 1: Reconfirmar as zero referências antes de apagar**

```bash
cd /home/martins/projects/mognus-company
grep -rn "ui/toaster\|ui/toast\"\|ui/toast'\|use-toast\|useToast" src/ --include=*.ts --include=*.tsx \
  | grep -v "^src/components/ui/toast.tsx:" \
  | grep -v "^src/components/ui/toaster.tsx:" \
  | grep -v "^src/hooks/use-toast.ts:"
```

Esperado: **saída vazia**. Se qualquer linha aparecer, parar e reavaliar — a premissa da tarefa caiu.

- [ ] **Step 2: Confirmar que o app usa o sonner**

```bash
grep -rn "Toaster" "src/app/[locale]/layout.tsx"
```

Esperado: `import { Toaster } from "@/components/ui/sonner";` e `<Toaster position="bottom-center" />`.

- [ ] **Step 3: Apagar os três arquivos**

```bash
rm src/components/ui/toast.tsx src/components/ui/toaster.tsx src/hooks/use-toast.ts
rmdir src/hooks 2>/dev/null || true
```

- [ ] **Step 4: Remover a dependência órfã**

```bash
pnpm remove @radix-ui/react-toast
```

- [ ] **Step 5: Verificar**

```bash
pnpm exec tsc --noEmit && pnpm exec biome check . && pnpm build 2>&1 | tail -20
```

Esperado: os três passam. O build deve continuar listando as mesmas rotas do baseline.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor(ui): drop the unused Radix toast implementation

ui/toaster.tsx had no importer; it pulled hooks/use-toast.ts, which
pulled ui/toast.tsx — a closed cycle with no entry point. The app
toasts through sonner via ui/sonner.tsx, mounted in the locale layout.
Removing the cycle orphans @radix-ui/react-toast, so that goes too.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Dependências sem breaking change

Onze pacotes em saltos de patch/minor. Agrupados num commit porque nenhum exige mudança de código e um reviewer não rejeitaria um sem rejeitar os outros.

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`

**Interfaces:**
- Consumes: nada.
- Produces: `typescript@5.9.3` disponível para o typecheck das tarefas seguintes.

- [ ] **Step 1: Atualizar as dependências de runtime**

```bash
pnpm add @radix-ui/react-dropdown-menu@2.1.24 @radix-ui/react-icons@1.3.2 \
  @radix-ui/react-label@2.1.15 @radix-ui/react-slot@1.3.3 \
  class-variance-authority@0.7.1 embla-carousel-react@8.6.0 \
  react-hook-form@7.88.0 react-icons@5.7.0
```

- [ ] **Step 2: Atualizar as devDependencies**

```bash
pnpm add -D typescript@5.9.3 @types/node@26.6.2 postcss@8.5.28
```

- [ ] **Step 3: Confirmar que next/react não se moveram**

```bash
pnpm list next react react-dom @types/react @types/react-dom --depth 0
```

Esperado: `next 16.3.5`, `react 19.3.0`, `react-dom 19.3.0`, `@types/react 19.3.0`, `@types/react-dom 19.3.0`. Se algum mudou, reverter e investigar.

- [ ] **Step 4: Verificar peer dependencies**

```bash
pnpm install 2>&1 | grep -i "peer\|warn" || echo "SEM_AVISOS"
```

Esperado: `SEM_AVISOS`, ou avisos já existentes no baseline. Um conflito novo de peer dep precisa ser resolvido antes de seguir.

- [ ] **Step 5: Verificar**

```bash
pnpm exec tsc --noEmit && pnpm exec biome check . && pnpm build 2>&1 | tail -20
```

Esperado: os três passam. `@types/node@26` sobre TypeScript 5.9.3 é o risco mais provável — se surgirem erros de tipo em APIs de Node, eles aparecem aqui.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore(deps): update non-breaking dependencies

Patch and minor bumps across the Radix primitives, cva, embla,
react-hook-form, react-icons, TypeScript (5.9.3), @types/node and
postcss. No source changes were needed.

TypeScript stays on the 5.x line: 7.x is a different compiler and its
support for the tsconfig `next` plugin still diverges.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: zod 4, @hookform/resolvers 5 e nodemailer 10

Mudanças de lógica, isoladas do visual de propósito: se a Tarefa 6 revelar uma regressão visual, a causa é inequívoca.

**Files:**
- Modify: `src/lib/contact-schema.ts`
- Modify (talvez): `src/components/sections/Contact.tsx:8` (import do `zodResolver`)
- Modify (talvez): `src/lib/nodemailer.ts`
- Modify: `package.json`, `pnpm-lock.yaml`

**Interfaces:**
- Consumes: nada.
- Produces: `FormSchema` e `FormSchemaType` mantêm exatamente os mesmos nomes e a mesma forma (`{ name, email, phone, subject, body }`, todos `string`). `send(sender: FormSchemaType)` mantém a assinatura. `sendEmail(values: FormSchemaType)` continua devolvendo `{ accepted: boolean } | undefined`.

- [ ] **Step 1: Atualizar os três pacotes**

```bash
pnpm add zod@4.6.5 @hookform/resolvers@5.9.1 nodemailer@10.0.10
pnpm add -D @types/nodemailer@8.0.2
```

- [ ] **Step 2: Ver o que quebrou**

```bash
pnpm exec tsc --noEmit 2>&1 | head -30
```

Esperado: erro em `src/lib/contact-schema.ts` por causa de `.email()`. Anotar a lista exata antes de corrigir.

- [ ] **Step 3: Reescrever o schema para a API do zod 4**

`src/lib/contact-schema.ts` inteiro. As regras, os limites e **todas as mensagens** são idênticas ao original; muda só `z.string().email({...})` → `z.email({...})`, que virou top-level no zod 4.

```ts
import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export type FormSchemaType = z.infer<typeof FormSchema>;

export const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(80, { message: "Name must be at most 80 characters long" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Phone number not valid" })
    .min(1, { message: "Phone number is required" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .max(80, { message: "Subject must be at most 80 characters long" }),
  body: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(500, { message: "Message must be at most 500 characters long" })
    .trim(),
});
```

Se o `tsc` reclamar de `{ message: ... }`, trocar para `{ error: ... }` — é o nome novo no zod 4, com `message` mantido como alias depreciado. Preservar o texto das mensagens em qualquer caso.

- [ ] **Step 4: Confirmar o import do resolver**

```bash
grep -n "hookform/resolvers" src/components/sections/Contact.tsx
```

Esperado: `import { zodResolver } from "@hookform/resolvers/zod";`. O caminho `/zod` segue válido na v5. Se o `tsc` acusar erro de tipo em `resolver: zodResolver(FormSchema)`, é a incompatibilidade conhecida entre o genérico de `useForm<FormSchemaType>` e o resolver tipado da v5 — resolver anotando `useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) })` sem mudar o comportamento.

- [ ] **Step 5: Conferir o nodemailer 10**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -i nodemailer || echo "NODEMAILER_OK"
```

Esperado: `NODEMAILER_OK`. `createTransport` e `sendMail` mantêm a assinatura na v10; o salto de major é sobretudo requisito de Node (temos v24.19.0) e remoção de callbacks, que este código não usa.

- [ ] **Step 6: Verificar**

```bash
pnpm exec tsc --noEmit && pnpm exec biome check . && pnpm build 2>&1 | tail -20
```

Esperado: os três passam.

- [ ] **Step 7: Validar o formulário no browser**

Com `pnpm dev` no ar, invocar a skill `agent-browser` em `http://localhost:3000/pt#contact`:

1. Submeter o formulário vazio → as cinco mensagens de validação devem aparecer, com **o mesmo texto** do baseline da Tarefa 1.
2. Digitar `nao-e-email` no campo de e-mail e submeter → "Invalid email address".
3. Digitar `abc` no telefone → "Phone number not valid".
4. Digitar 5 caracteres na mensagem → "Message must be at least 10 characters long".
5. Preencher tudo válido e submeter → sem `.env`, o envio falha e o **toast vermelho de erro** deve aparecer. É o caminho esperado.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(deps): migrate to zod 4, resolvers 5 and nodemailer 10

zod 4 promotes the string formats to top level, so the contact schema's
email field becomes z.email(). Every rule, bound and message is carried
over unchanged; the form's validation behaviour is identical.

nodemailer 10 keeps createTransport/sendMail signatures — the major is
a Node floor bump and callback removal, neither of which this code hits.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Tailwind CSS v4

A maior tarefa. Usa a ferramenta oficial de upgrade para os codemods e a conversão do config, seguida de ajustes manuais que a ferramenta não cobre.

**Files:**
- Modify: `src/app/globals.css` (reescrito)
- Delete: `tailwind.config.ts`
- Modify: `postcss.config.mjs`
- Modify: `src/app/[locale]/layout.tsx` (renomeia as CSS vars de fonte)
- Modify: `package.json`, `pnpm-lock.yaml`
- Modify: os 6 arquivos com classes v3 e os 9 de `ui/`

**Interfaces:**
- Consumes: baseline visual da Tarefa 1.
- Produces: `globals.css` com bloco `@theme` expondo `--color-*`, `--radius-*`, `--font-montserrat` e `--font-poppins`. A Tarefa 7 depende desses tokens existirem.

- [ ] **Step 1: Ler a documentação do Next sobre CSS**

```bash
sed -n '1,70p' node_modules/next/dist/docs/01-app/01-getting-started/11-css.md
```

Confirma o caminho suportado: `tailwindcss` + `@tailwindcss/postcss`, `@import "tailwindcss"`. O `AGENTS.md` exige essa leitura antes de escrever código.

- [ ] **Step 2: Criar um ponto de retorno**

```bash
git rev-parse HEAD
```

Anotar o SHA. Se o upgrade automático fizer algo indesejado, `git checkout <SHA> -- .` restaura.

- [ ] **Step 3: Rodar a ferramenta oficial de upgrade**

```bash
npx --yes @tailwindcss/upgrade@4.3.3 --force
```

Ela instala `tailwindcss@4` e `@tailwindcss/postcss`, converte `tailwind.config.ts` para `@theme` no CSS, atualiza o `postcss.config.mjs` e aplica os codemods de classe.

- [ ] **Step 4: Revisar o que ela fez, arquivo a arquivo**

```bash
git diff --stat
git diff -- src/app/globals.css postcss.config.mjs
git diff -- src/components/sections/Hero.tsx src/components/header/ src/components/ProjectSlider.tsx
```

Conferir especificamente:
- `postcss.config.mjs` usa `"@tailwindcss/postcss": {}`
- `globals.css` começa com `@import "tailwindcss";`
- `Hero.tsx:38` — o `rounded` nu virou `rounded-sm`
- `NavBar.tsx:20` — `shadow-sm` virou `shadow-xs`
- `ProjectSlider.tsx:86` — `bg-gradient-to-b` virou `bg-linear-to-b`
- `outline-none` virou `outline-hidden` em `Logo.tsx` e `MenuMobile.tsx`

- [ ] **Step 5: Garantir o `@custom-variant dark`**

O projeto usa `next-themes` com `attribute="class"`, então a v4 precisa da variante explícita. Confirmar que `globals.css` contém, logo após os imports:

```css
@custom-variant dark (&:is(.dark *));
```

Se a ferramenta não tiver adicionado, adicionar à mão.

- [ ] **Step 6: Trocar `tailwindcss-animate` por `tw-animate-css`**

`tailwindcss-animate` é um plugin de v3 e não funciona na v4. **Não é dependência morta** — alimenta 60+ utilitários em uso (`animate-in` ×14, `fade-in-0` ×11, `animate-out` ×6, `slide-in-from-*`, `zoom-in-95`, `zoom-out-95`).

```bash
pnpm remove tailwindcss-animate
pnpm add -D tw-animate-css@1.4.0
```

E em `globals.css`, logo abaixo do `@import "tailwindcss";`:

```css
@import "tw-animate-css";
```

- [ ] **Step 7: Resolver a colisão do nome das variáveis de fonte**

Este passo é obrigatório e a ferramenta de upgrade não o cobre. Na v4, o utilitário `font-montserrat` vem do token `--font-montserrat` no `@theme`. Mas `next/font` **já** define `--font-montserrat` no elemento, então `--font-montserrat: var(--font-montserrat)` é uma referência circular e inválida.

Em `src/app/[locale]/layout.tsx`, renomear as variáveis geradas pelo `next/font`:

```ts
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-sans",
});

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins-sans",
});
```

O restante do `layout.tsx` não muda: `montserrat.variable` e `poppins.variable` continuam aplicados no `className` do `<body>`.

- [ ] **Step 8: Escrever o bloco `@theme` definitivo**

Conferir/ajustar `globals.css` para que o `@theme` fique exatamente assim. As cores são as mesmas do `tailwind.config.ts` original, em HSL, preservando a paleta laranja e o raio de 0.75rem.

```css
@theme {
  --font-montserrat: var(--font-montserrat-sans), sans-serif;
  --font-poppins: var(--font-poppins-sans), sans-serif;

  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
```

Os blocos `:root` e `.dark` com os valores HSL crus permanecem **intactos**, exatamente como estão hoje.

- [ ] **Step 9: Remover a configuração de `container` e as keyframes de accordion**

Ambas são configuração morta e não devem ser recriadas na v4:

- `container` (`center`, `padding: 2rem`, `screens.2xl: 1400px`) — a classe `container` **nunca é usada** no código. Não recriar com `@utility`.
- keyframes/animations `accordion-down` e `accordion-up` — não há componente accordion nem `@radix-ui/react-accordion` no projeto. O `tw-animate-css` já as fornece caso um accordion seja adicionado depois.

Verificar que sumiram:

```bash
grep -n "container\|accordion" src/app/globals.css || echo "CONFIG_MORTA_REMOVIDA"
```

- [ ] **Step 10: Preservar as regras de base**

Confirmar que `globals.css` ainda termina com estas duas regras, inalteradas:

```css
@layer base {
  * {
    @apply border-border;
  }
}

@layer components {
  .letter-logo {
    @apply fill-foreground;
  }
}
```

A `.letter-logo` é usada nos `<path>` do SVG em `header/Logo.tsx`; sem ela o logo perde a cor no tema escuro.

- [ ] **Step 11: Apagar o config antigo e atualizar o tailwind-merge**

```bash
rm -f tailwind.config.ts
pnpm add tailwind-merge@3.7.0
```

`tailwind-merge` 3 é a versão que entende as classes da v4; a 2 produziria merges errados.

- [ ] **Step 12: Verificar o build**

```bash
pnpm exec tsc --noEmit && pnpm exec biome check . && pnpm build 2>&1 | tail -20
```

Esperado: os três passam.

- [ ] **Step 13: Comparar visualmente com o baseline**

Reiniciar `pnpm dev` (o PostCSS mudou; hot-reload não basta). Recapturar, pela skill `agent-browser`, **a mesma matriz** da Tarefa 1 e comparar par a par.

Pontos de atenção, em ordem de probabilidade de falha:
1. Os **58 usos de `text-foreground/70`** e afins — se as cores no `@theme` estiverem erradas, o texto fica transparente ou preto.
2. As fontes — se o passo 7 falhou, o corpo cai para a fonte do sistema.
3. O logo no tema escuro (`.letter-logo`).
4. As animações de entrada (`animate-in`, `fade-in-0`, `slide-in-from-*`) — se o `tw-animate-css` não carregou, os elementos aparecem sem transição ou invisíveis.
5. O gradiente do hover nos cards de projeto (`bg-linear-to-b`).

Qualquer diferença tem de ser explicada ou corrigida antes de commitar.

- [ ] **Step 14: Confirmar o hot-reload**

Com o dev server no ar, editar uma classe do Tailwind em `src/components/sections/Hero.tsx`, salvar e confirmar que o browser reflete a mudança. Depois desfazer a edição.

- [ ] **Step 15: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
build(css): migrate to Tailwind CSS v4

Replaces tailwind.config.ts with an @theme block in globals.css, run
through the official @tailwindcss/upgrade codemods. The HSL palette and
the 0.75rem radius carry over unchanged.

Three things the codemod does not cover, done by hand:

- next/font's CSS variables are renamed to --font-*-sans. In v4 the
  font-montserrat utility reads the --font-montserrat theme token, which
  would otherwise reference itself.
- tailwindcss-animate is a v3 plugin; tw-animate-css replaces it. It is
  not dead weight — it backs 60+ animate-in/fade-in/slide-in utilities.
- The container config and the accordion keyframes are dropped: the
  container class is never used and the project has no accordion.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Re-vendorizar o shadcn/ui e atualizar o sonner

**Files:**
- Modify: `components.json`
- Modify: os 9 arquivos de `src/components/ui/`
- Modify: `package.json`, `pnpm-lock.yaml`

**Interfaces:**
- Consumes: os tokens `--color-*` e `--radius-*` do `@theme` da Tarefa 6.
- Produces: componentes de UI na convenção v4. As exportações nomeadas (`Button`, `buttonVariants`, `Card`, `CardContent`, `Form`, `FormControl`, `FormField`, `FormItem`, `FormLabel`, `FormMessage`, `Input`, `Textarea`, `Toaster`, e as do `carousel` e `dropdown-menu`) **não mudam** — `Contact.tsx`, `ServiceCard.tsx`, `ProjectSlider.tsx`, `ModeToggle.tsx` e `SwitcherLang.tsx` importam por esses nomes.

- [ ] **Step 1: Guardar as customizações que serão sobrescritas**

```bash
SCRATCH=/tmp/claude-1000/-home-martins-projects-mognus-company/110eba11-5df5-427f-9000-54f6c6a673cc/scratchpad
mkdir -p "$SCRATCH/ui-antes"
cp src/components/ui/*.tsx "$SCRATCH/ui-antes/"
```

A que importa é o bloco `toastOptions.classNames` de `ui/sonner.tsx` (`group-[.toaster]:bg-background` etc.), que a versão v4 do shadcn não traz.

- [ ] **Step 2: Atualizar o `components.json` para a convenção v4**

`tailwind.config` passa a string vazia — na v4 não há arquivo de config.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

- [ ] **Step 3: Re-vendorizar os 9 componentes**

`toast` e `toaster` **não** entram na lista: foram apagados na Tarefa 3 e o shadcn os descontinuou em favor do sonner.

```bash
npx --yes shadcn@4.21.0 add button card carousel dropdown-menu form input label sonner textarea --overwrite
```

- [ ] **Step 4: Conferir se o `globals.css` foi sobrescrito**

```bash
git diff -- src/app/globals.css
```

O shadcn pode reescrever o CSS com a paleta padrão em OKLCH. Se isso aconteceu, **restaurar a paleta original**: os blocos `:root` e `.dark` devem voltar aos valores HSL da Tarefa 6, com `--primary: 24.6 95% 53.1%` (light), `--primary: 20.5 90.2% 48.2%` (dark) e `--radius: 0.75rem`. O bloco `@theme`, o `@custom-variant dark`, o `@import "tw-animate-css"` e as regras `@layer base` / `.letter-logo` também precisam sobreviver.

- [ ] **Step 5: Reaplicar a customização do sonner**

Em `src/components/ui/sonner.tsx`, restaurar o bloco `toastOptions` do arquivo salvo no passo 1:

```tsx
toastOptions={{
  classNames: {
    toast:
      "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
    description: "group-[.toast]:text-muted-foreground",
    actionButton:
      "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
    cancelButton:
      "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
  },
}}
```

Manter também `theme={theme as ToasterProps["theme"]}` vindo do `useTheme()` do `next-themes`.

- [ ] **Step 6: Atualizar o sonner**

```bash
pnpm add sonner@2.0.8
```

- [ ] **Step 7: Conferir que as exportações não mudaram**

```bash
pnpm exec tsc --noEmit 2>&1 | head -30
```

Esperado: sem erros. Qualquer erro aqui significa que um componente re-vendorizado mudou uma assinatura que os consumidores usam — corrigir no componente, **não** no consumidor, para manter o comportamento.

- [ ] **Step 8: Verificar**

```bash
pnpm exec biome check --write . && pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -20
```

O `biome check --write` reformata os arquivos recém-baixados para o estilo do projeto.

- [ ] **Step 9: Comparar visualmente com o baseline**

Recapturar a matriz da Tarefa 1 e comparar. Diferenças **esperadas e aceitas**:

- O anel de foco do `Button` passa de `ring-1 ring-ring` para `ring-[3px] ring-ring/50`.
- `Input` e `Textarea` ganham estilos `aria-invalid:`.

Diferenças **não** aceitas, que exigem correção: qualquer mudança de cor, de raio, de espaçamento, de tipografia, ou no layout do formulário, do carrossel e dos dropdowns.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor(ui): re-vendor shadcn components for Tailwind v4

Pulls the nine components in use at their v4 revision (data-slot
attributes, v4 utility names) and moves components.json to the v4
convention of an empty tailwind.config. sonner goes to 2.0.8.

The project's orange palette and 0.75rem radius are kept; the custom
toastOptions.classNames block in ui/sonner.tsx is reapplied, since the
upstream v4 file does not carry it.

Button's focus ring changes from ring-1 to ring-[3px] ring-ring/50 —
an accepted visual consequence of taking the upstream components.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Validação final e MIGRATION.md

**Files:**
- Create: `MIGRATION.md`

**Interfaces:**
- Consumes: baseline da Tarefa 1; resultado de todas as tarefas anteriores.
- Produces: documentação final. Nada depende desta tarefa.

- [ ] **Step 1: Varredura final do Biome**

O código mudou bastante desde a Tarefa 2; rodar de novo para pegar imports que ficaram órfãos.

```bash
pnpm exec biome check --write . && pnpm exec biome lint . && echo "BIOME_OK"
```

Esperado: `BIOME_OK`.

- [ ] **Step 2: Typecheck**

```bash
pnpm exec tsc --noEmit && echo "TSC_OK"
```

- [ ] **Step 3: Build de produção**

```bash
pnpm build 2>&1 | tail -30
```

Comparar a listagem de rotas com a anotada na Tarefa 1: as mesmas rotas devem estar presentes para `pt`, `en` e `fr`. Diferenças de tamanho de bundle são esperadas e devem ser anotadas.

- [ ] **Step 4: Conferir que nenhuma dependência morta sobrou**

```bash
for p in $(node -e "const p=require('./package.json');console.log([...Object.keys(p.dependencies),...Object.keys(p.devDependencies)].join(' '))"); do
  n=$(grep -rl "$p" src/ *.json *.mjs *.ts 2>/dev/null | wc -l)
  [ "$n" -eq 0 ] && echo "SEM REFERÊNCIA DIRETA: $p"
done
```

Revisar a lista **à mão**. Ferramentas de build (`typescript`, `postcss`, `tailwindcss`, `@tailwindcss/postcss`, `@biomejs/biome`, `tw-animate-css`, `@types/*`) aparecem sem referência direta e **devem ficar**. Só remover o que for comprovadamente não usado nem em build nem em runtime.

- [ ] **Step 5: Subir o dev server e confirmar o hot-reload**

```bash
pnpm dev
```

Editar uma classe em `src/components/sections/Hero.tsx`, confirmar que o browser atualiza, desfazer.

- [ ] **Step 6: Varredura completa no agent-browser**

Invocar a skill `agent-browser`. Percorrer, comparando com o baseline da Tarefa 1:

1. Home em `pt`, `en`, `fr` — tema claro e escuro, 390×844 e 1440×900
2. `ModeToggle` — alternar entre claro, escuro e sistema; confirmar que a preferência persiste no reload
3. `SwitcherLang` — trocar de idioma e confirmar que a rota e os textos mudam
4. `MenuMobile` em 390×844 — abrir, navegar por âncora, fechar
5. `ProjectSlider` — navegar pelo carrossel nos dois sentidos, conferir o gradiente no hover
6. Formulário de contato — validação com dados inválidos, depois submissão válida (deve dar o toast de erro, sem `.env`)
7. `/pt/cookies-policy`, `/pt/privacy-policy`, `/pt/terms-of-services`
8. Console do browser — nenhum erro novo

- [ ] **Step 7: Escrever o `MIGRATION.md`**

Na raiz do projeto. Deve conter, em seções:

- **Resumo** — o que mudou, em uma frase por eixo (deps, Tailwind, Biome, código morto)
- **Tabela de versões** — cada pacote, de → para; os adicionados; os removidos com o motivo
- **Tailwind v4** — o que a ferramenta de upgrade fez, e os três ajustes manuais (rename das vars de fonte, `tw-animate-css`, remoção de `container`/accordion)
- **Biome** — o que substituiu, os scripts novos (`lint`, `format`, `check`), e por que o formatter usa espaços em vez do padrão de tabs
- **Código removido** — os três arquivos do cluster de toast, com a prova de zero referências
- **Mudanças visuais conhecidas e aceitas**, nominalmente:
  1. Anel de foco do `Button`: `ring-1 ring-ring` → `ring-[3px] ring-ring/50`
  2. `header/SwitcherLang.tsx:25` usa `focus:ring-3`, que não existia na escala da v3 e portanto não produzia estilo nenhum. Na v4 `ring-3` é válida e o anel passa a aparecer. É um bug preexistente que a v4 corrige — decidir depois se o valor desejado é `ring-3` mesmo.
  3. `Input`/`Textarea` ganham estilos `aria-invalid:`
- **Pendente de verificação manual** — o envio real de e-mail. Não há `.env` no projeto, então o `nodemailer` 10 só foi coberto por typecheck; o toast de sucesso e o `sendMail` real precisam ser testados com credenciais.
- **Fora de escopo** — TypeScript 7, suíte de testes, atualização de `next`/`react` (já na última versão)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
docs: record the dependency, Tailwind and tooling migration

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 9: Revisar o diff completo da branch**

```bash
git log --oneline main..HEAD | cat
git diff main..HEAD --stat | tail -30
```

Confirmar que são 7 commits novos (Tarefas 2 a 8) e que nenhum arquivo fora do escopo foi tocado — em especial `messages/`, `public/`, `next.config.mjs`, `src/i18n*.ts`, `src/navigation.ts`, `src/proxy.ts` e `src/actions/`.
