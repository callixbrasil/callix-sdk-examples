# callix-sdk-examples

## Primeiros Passos

Este repositório contém aplicações de exemplo que utilizam o SDK da Callix. Antes de executar qualquer exemplo, você deve configurar as variáveis de ambiente e tokens de autenticação necessários.

---

## 1. Configurar Variáveis de Ambiente

Cada aplicação de exemplo pode exigir variáveis de ambiente específicas. Para o aplicativo de demonstração Next.js, copie o `.env.template` fornecido para `.env` e preencha os valores necessários:

```bash
cp apps/demo-next-app/.env.template apps/demo-next-app/.env
```

Edite `apps/demo-next-app/.env` e defina as seguintes variáveis:

- `NEXT_PUBLIC_CALLIX_DOMAIN` – Seu domínio Callix (ex: `api.callix.com`)
- `CALLIX_API_KEY` – Sua chave de API Callix
- `CALLIX_USERNAME` – Seu nome de usuário Callix

---

## 2. Configurar Autenticação npm

Este repositório utiliza pacotes npm privados do escopo `@callixbrasil`. Você deve fornecer um token de autenticação para o registro npm.

- O arquivo `.npmrc` espera que a variável de ambiente `CALLIX_SDK_TOKEN` esteja configurada com seu token do GitHub Package Registry.

**Exporte seu token antes de instalar as dependências:**

```bash
export CALLIX_SDK_TOKEN=seu_token_do_github_package
```

Substitua `seu_token_do_github_package` pelo seu token real.

---

## 3. Instalar Dependências

Após configurar suas variáveis de ambiente e token de autenticação, instale as dependências:

```bash
pnpm install
```

---

## 4. Executar o Exemplo

Navegue até o diretório da aplicação de exemplo desejada e inicie a aplicação conforme instruído em seu README ou com:

```bash
pnpm run dev
```

## 5. Documentação do SDK

Para informações detalhadas sobre a API do SDK da Callix e recursos disponíveis, consulte a documentação localizada em seu projeto em:

Você pode abrir esses arquivos em seu navegador ou editor de texto para explorar os recursos do SDK, referências de métodos e exemplos de implementação.

```bash
apps/demo-next-app/node_modules/@callixbrasil/client-sdk/docs/README.pt-BR.md
```

---

## Solução de Problemas

- Certifique-se de que todas as variáveis de ambiente necessárias estejam definidas em seu arquivo `.env`.
- Verifique se você exportou o token `CALLIX_SDK_TOKEN` em seu shell antes de executar `npm install`.
- Se encontrar erros de autenticação com o npm, verifique novamente seu token e a configuração do `.npmrc`.

---

Para mais informações, consulte a documentação de cada aplicação de exemplo ou entre em contato com a equipe de suporte da Callix.
