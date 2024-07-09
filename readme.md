# Firebase Increment ID Generator

Este projeto é uma aplicação de Firebase Cloud Functions desenvolvida para gerar e incrementar IDs únicos dentro da coleção de Firestore de um usuário. A função garante que cada usuário tenha um ID incremental armazenado em seu caminho específico de documento Firestore.

## Instalação

Para configurar e executar este projeto, siga os passos abaixo:

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Firebase CLI
- Conta no Google Cloud

### Passos

1. **Clone o Repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd <diretorio-do-repositorio>
   ```

2. **Instale as Dependências:**

   Navegue até o diretório `functions` e instale as dependências necessárias:

   ```bash
   cd functions
   npm install
   ```

3. **Configure o Firebase:**

   Certifique-se de ter o Firebase CLI instalado e configurado:

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init
   ```

4. **Implante as Funções:**

   Implante suas funções do Firebase na nuvem:

   ```bash
   firebase deploy --only functions
   ```

## Uso

A principal função deste projeto é `incrementIdGenerator`, que incrementa e retorna um ID único para um usuário. Esta função é acionada na adição de um usuário.

### Fazer uma Requisição HTTP

Você pode fazer uma requisição HTTP para a função `addRecord` utilizando a URL especificada. Aqui está um exemplo de como fazer isso usando `curl`:

```bash
curl -X POST http://127.0.0.1:5001/fir-back-a92e9/us-central1/addRecord \
  -H "Content-Type: application/json" \
  -d '{
        "nome": "userId123"
      }'
```

## Estrutura do Projeto

- `functions/`: Contém o código das Cloud Functions.
  - `index.js`: Ponto de entrada principal para as Cloud Functions.
  - `services/`: Contém a codigo com o service resposnsavel por incrementar o id;
- `firebase.json`: Configuração do projeto Firebase.
- `firestore.indexes.json`: Configuração de índices do Firestore.
- `firestore.rules`: Regras de segurança do Firestore.
- `package-lock.json`: Arquivo de bloqueio de dependências.
- `readme.md`: Arquivo README do projeto.

---
