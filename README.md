# callix-sdk-examples

## Primeiros Passos

Este repositório contém aplicações de exemplo que utilizam o SDK da Callix. Antes de executar qualquer exemplo, você deve configurar as variáveis de ambiente e tokens de autenticação necessários.

## 1. Configurar Variáveis de Ambiente

Cada aplicação de exemplo pode exigir variáveis de ambiente específicas. Para o aplicativo de demonstração Next.js, copie o `.env.template` fornecido para `.env` e preencha os valores necessários:

```bash
cp apps/demo-next-app/.env.template apps/demo-next-app/.env
```

Edite `apps/demo-next-app/.env` e defina as seguintes variáveis:

- `NEXT_PUBLIC_CALLIX_DOMAIN` – Seu domínio Callix (ex: `api.callix.com`)
- `CALLIX_API_KEY` – Sua chave de API Callix
- `CALLIX_USERNAME` – Seu nome de usuário Callix

## 2. Instalar Dependências

Após configurar suas variáveis de ambiente e token de autenticação, instale as dependências:

```bash
pnpm install
```

## 3. Executar o Exemplo

Navegue até o diretório da aplicação de exemplo desejada e inicie a aplicação conforme instruído em seu README ou com:

```bash
pnpm run dev
```

## 4. Documentação do SDK

Para informações detalhadas sobre a API do SDK da Callix e recursos disponíveis, consulte a documentação localizada em seu projeto em:

```sh
cat apps/demo-next-app/node_modules/@callixbrasil/client-sdk/docs/README.pt-BR.md
```

Você pode abrir esse arquivo em seu navegador ou editor de texto para explorar os recursos do SDK, referências de métodos e exemplos de implementação.

## Solução de Problemas

- Certifique-se de que todas as variáveis de ambiente necessárias estejam definidas em seu arquivo `.env`.

---

Para mais informações, consulte a documentação de cada aplicação de exemplo ou entre em contato com a equipe de suporte da Callix.
