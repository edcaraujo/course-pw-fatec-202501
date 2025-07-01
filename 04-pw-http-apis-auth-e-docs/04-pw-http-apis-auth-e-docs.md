---
marp: true

author: "Eduardo Cruz Araujo"
title: "Programação Web"
description: "Disciplina de Programação Web."

theme: "default"
class: "invert"

footer: "Eduardo Cruz Araujo | Programação Web | Fatec | 2025.01"

paginate: "true"

---

# Programação Web :mortar_board:

*HTTP* 

---

## Métodos

Os **métodos HTTP**, também conhecidos como verbos HTTP, indicam a ação que você deseja realizar em um recurso específico. Eles são a base da comunicação cliente-servidor na web.

---

  * **GET**: Solicita a representação de um recurso específico. Não deve ter efeitos colaterais (não muda o estado do servidor).
    * Exemplo: `GET /produtos/123` (Obter detalhes do produto com ID 123)

---

  * **POST**: Envia dados para serem processados a um recurso específico. Geralmente resulta na criação de um novo recurso.
    * Exemplo: `POST /usuarios` (Criar um novo usuário)

---

  * **PUT**: Atualiza um recurso existente ou cria um se ele não existir, utilizando a carga de dados fornecida. É idempotente (múltiplas requisições resultam no mesmo estado).
      * Exemplo: `PUT /produtos/123` (Atualizar o produto com ID 123)

---

  * **DELETE**: Remove um recurso específico.
      * Exemplo: `DELETE /produtos/123` (Remover o produto com ID 123)

---

  * **PATCH**: Aplica modificações parciais a um recurso. É uma alternativa ao PUT para atualizações incrementais.
      * Exemplo: `PATCH /usuarios/456` (Atualizar apenas o email do usuário com ID 456)

---

  * **HEAD**: É semelhante ao GET, mas solicita apenas os cabeçalhos de resposta, sem o corpo. Útil para verificar a existência de um recurso ou seus metadados.
  * **OPTIONS**: Descreve as opções de comunicação para o recurso de destino.

---

## Códigos de Status

Os **códigos de status HTTP** são respostas numéricas que o servidor envia ao cliente para indicar o status da requisição. Eles são essenciais para depurar e entender o que aconteceu durante a interação.

---

  * **1xx - Informacional**: A requisição foi recebida e o processo continua.
  * **2xx - Sucesso**: A ação foi recebida, entendida e aceita.
    * **200 OK**: Requisição bem-sucedida.
    * **201 Created**: Novo recurso foi criado com sucesso.
    * **204 No Content**: Ação bem-sucedida, mas sem conteúdo para retornar.

---

  * **3xx - Redirecionamento**: É necessária uma ação adicional para completar a requisição.
    * **301 Moved Permanently**: O recurso foi movido permanentemente para uma nova URL.
    * **302 Found (Previously "Moved Temporarily")**: O recurso foi encontrado temporariamente em uma nova URL.

---

  * **4xx - Erro do Cliente**: A requisição contém sintaxe incorreta ou não pode ser satisfeita.
    * **400 Bad Request**: A requisição é inválida.
    * **401 Unauthorized**: Autenticação é necessária.
    * **403 Forbidden**: O cliente não tem permissão para acessar o recurso.
    * **404 Not Found**: O recurso solicitado não foi encontrado.
    * **405 Method Not Allowed**: O método HTTP usado não é permitido para o recurso.

---

  * **5xx - Erro do Servidor**: O servidor falhou ao cumprir uma requisição aparentemente válida.
    * **500 Internal Server Error**: Um erro inesperado ocorreu no servidor.
    * **502 Bad Gateway**: O servidor atuando como gateway ou proxy recebeu uma resposta inválida de um servidor upstream.
    * **503 Service Unavailable**: O servidor não está pronto para lidar com a requisição (ex: sobrecarga ou manutenção).

---

  * [https://http.cat/](https://http.cat/)
  * [https://http.dog/](https://http.dog/)

---

# Programação Web :mortar_board:

*APIs* 

---

## REST e RESTful

**REST (*Representational State Transfer*)** é um estilo arquitetural para sistemas distribuídos que utiliza um subconjunto de HTTP. APIs que seguem os princípios REST são chamadas de **APIs RESTful**.

---

### REST

  * **Cliente-Servidor**: Separação de responsabilidades, permitindo que cliente e servidor evoluam independentemente.
  * **Stateless (Sem Estado)**: Cada requisição do cliente para o servidor deve conter todas as informações necessárias para que o servidor entenda a requisição. O servidor não armazena informações sobre as requisições anteriores do cliente.
  * **Cacheable**: As respostas do servidor podem ser marcadas como cacheáveis ou não, permitindo que os clientes e intermediários armazenem em cache as respostas para melhorar a performance.

---

  * **Uniform Interface (Interface Uniforme)**: Simplifica a arquitetura e melhora a visibilidade.
      * **Identificação de Recursos**: Recursos são identificados por URIs.
      * **Manipulação de Recursos via Representações**: O cliente manipula recursos utilizando representações (ex: JSON, XML).
      * **Mensagens Auto-descritivas**: Cada mensagem contém informações suficientes para o cliente entender como processá-la.
      * **HATEOAS (Hypermedia As The Engine Of Application State)**: O cliente interage com a aplicação inteiramente através de hiperlinks contidos nas representações dos recursos.

---

## Representações

**JSON (*JavaScript Object Notation*)** e **XML (*Extensible Markup Language*)** são formatos amplamente utilizados para troca de dados em APIs web.

---

  * **JSON** para a maioria dos **novos desenvolvimentos de APIs web**, onde leveza, agilidade e facilidade de uso são prioritárias.
  * **XML** para cenários que exigem **validação de dados rigorosa, integração com sistemas legados ou representação de documentos hierárquicos muito complexos**.


---

### JSON

  * **Sintaxe**: Baseado na notação de objetos do JavaScript.
  * **Estrutura**: `{ "chave": "valor", "array": [1, 2, 3] }`
  * **Vantagens**: Leve, fácil de ler e escrever por humanos e máquinas, amplamente suportado por linguagens de programação.
  * **Uso Comum**: Preferido na maioria das APIs RESTful modernas.

---

### XML

  * **Sintaxe**: Linguagem de marcação com tags.
  * **Estrutura**:
    ```xml
    <produto>
        <nome>Notebook</nome>
        <preco>2500.00</preco>
    </produto>
    ```
  * **Vantagens**: Bem estruturado, robusto para documentos complexos, suporte a schemas (XSD) para validação.
  * **Uso Comum**: Ainda presente em sistemas legados e algumas APIs SOAP.

---


# Programação Web :mortar_board:

*Autenticação e Autorização* 

---

## Autenticação e Autorização

**Autenticação** verifica a identidade do usuário, enquanto **Autorização** determina o que o usuário autenticado pode fazer.

---

### Métodos

  * Basic Auth
  * API Keys
  * OAuth 2.0
  * JWT (JSON Web Tokens)

---

### Basic Authentication (Basic Auth)

**Como funciona:** É a forma mais simples de autenticação HTTP. Envia o nome de usuário e a senha (codificados em Base64) em um cabeçalho `Authorization` a cada requisição.

**Exemplo de cabeçalho:** `Authorization: Basic QWxpY2U6c2VjcmV0` (onde `QWxpY2U6c2VjcmV0` é a codificação Base64 de `Alice:secret`).

---

### :white_check_mark: Basic Authentication (Basic Auth) 

* **Simplicidade Pura:** Extremamente fácil de implementar tanto no lado do cliente quanto no servidor. Não exige bibliotecas complexas ou configurações elaboradas.
* **Compatibilidade Universal:** Praticamente todos os navegadores, ferramentas e bibliotecas HTTP entendem e suportam Basic Auth.
* **Sem Gerenciamento de Sessão:** É "stateless", ou seja, o servidor não precisa guardar informações de sessão, o que pode simplificar a arquitetura para APIs RESTful.

---

### :no_entry: Basic Authentication (Basic Auth) 

* **Vulnerabilidade Crítica (Sem HTTPS):** As credenciais são apenas codificadas em Base64, não criptografadas. Se não for usado **exclusivamente com HTTPS**, qualquer pessoa que intercepte a requisição pode facilmente decodificar e obter o nome de usuário e a senha.
* **Exposição de Credenciais Diretas:** A cada requisição, as credenciais "reais" do usuário são enviadas. Se comprometidas, podem dar acesso total à conta do usuário em vários serviços.
* **Controle de Acesso Limitado:** Dificilmente oferece controle granular. Geralmente, é acesso total ou nenhum. Não é fácil conceder permissões específicas ou revogar acesso a um endpoint sem afetar toda a conta do usuário.

---

### :no_entry: Basic Authentication (Basic Auth) 

* **Revogação Complicada:** Para revogar o acesso, normalmente é necessário alterar a senha do usuário, o que impacta todos os serviços onde essa senha é usada.
* **Dificuldade para Rastreamento:** É mais difícil rastrear o uso da API por aplicação ou cliente específico.

---

### API Keys (Chaves de API)

**Como funciona:** São strings únicas geradas pelo provedor da API e fornecidas a usuários ou aplicações autorizadas. Geralmente, são incluídas como um parâmetro de consulta (`?api_key=suachave`) ou em um cabeçalho HTTP personalizado (`X-API-Key: suachave`).

**Exemplo de cabeçalho:** `X-API-Key: abcdef12345`

---

### :white_check_mark: API Keys (Chaves de API)

* **Controle Mais Granular:** O provedor da API pode emitir chaves diferentes para diferentes aplicações, permitindo rastrear e controlar o uso por aplicação.
* **Revogação Fácil:** Se uma chave de API for comprometida, ela pode ser rapidamente revogada ou regenerada sem afetar outras chaves ou as credenciais principais do usuário.
* **Rastreamento de Uso Simplificado:** Facilita a coleta de métricas de uso por aplicação, o que é ótimo para análise, limitação de taxa (rate limiting) e faturamento.

---

### :white_check_mark: API Keys (Chaves de API)

* **Menos Sensíveis (Normalmente):** A chave em si geralmente não dá acesso à conta principal do usuário, apenas à API à qual está associada.
* **Ideal para Automação:** Perfeitas para comunicação de servidor para servidor ou quando uma aplicação precisa de acesso programático sem a interação direta de um usuário final.

---

### :no_entry: API Keys (Chaves de API)

* **Não é Autenticação de Usuário Final:** As chaves de API identificam a *aplicação* que faz a requisição, não necessariamente o *usuário final*. Para autenticar usuários, geralmente precisam ser combinadas com outros métodos (como OAuth).
* **Vulnerabilidade à Exposição:** Se a chave for embutida diretamente no código do lado do cliente (navegador, apps móveis) ou exposta em repositórios públicos, ela pode ser roubada e utilizada indevidamente.

---

### :no_entry: API Keys (Chaves de API)

* **Gerenciamento de Chaves:** Exige um bom gerenciamento de segurança, incluindo armazenamento seguro, rotação regular e distribuição cuidadosa.
* **Ainda Precisa de HTTPS:** Assim como o Basic Auth, as chaves de API devem **sempre** ser transmitidas via HTTPS para evitar a interceptação.

---

### OAuth 2.0

**Como funciona:** É um framework de autorização que permite a uma aplicação de terceiros obter acesso limitado a uma conta de usuário em um serviço HTTP. Não é uma autenticação em si, mas sim um protocolo de autorização que delega o acesso. Um "token de acesso" temporário é emitido, que a aplicação usa para acessar os recursos protegidos.

---

**Fluxo Comum:**
1.  Usuário tenta acessar um recurso via aplicação.
2.  Aplicação redireciona o usuário para o provedor de identidade (ex: Google, Facebook) para login e autorização.
3.  Usuário aprova a solicitação de acesso.
4.  Provedor de identidade retorna um "código de autorização" para a aplicação.
5.  Aplicação troca o código de autorização por um "token de acesso" (e opcionalmente um "refresh token") com o provedor de identidade.
6.  Aplicação usa o token de acesso para acessar os recursos protegidos do usuário.

---

### :white_check_mark: OAuth 2.0

* **Autorização Delegada Segura:** O usuário concede permissão a uma aplicação para acessar seus dados sem compartilhar suas credenciais.
* **Controle Granular de Permissões:** O usuário pode conceder ou negar permissões específicas (escopos) à aplicação (ex: "acessar apenas minha lista de amigos", "ler meu perfil", etc.).
* **Tokens Temporários:** Os tokens de acesso têm vida útil limitada, o que reduz o risco em caso de vazamento.
* **Refresh Tokens:** Permitem que a aplicação obtenha novos tokens de acesso sem que o usuário precise se autenticar novamente.

---

### :white_check_mark: OAuth 2.0

* **Separação de Preocupações:** O provedor de identidade (quem autentica o usuário) é separado da aplicação que usa os dados.
* **Amplamente Adotado:** É o padrão de fato para autenticação e autorização em diversas plataformas (Google, Facebook, GitHub, etc.).

---

### :no_entry: OAuth 2.0

* **Complexidade:** É significativamente mais complexo de implementar do que Basic Auth ou API Keys, com vários "flows" (fluxos de concessão) dependendo do cenário (aplicações web, móveis, SPAs, etc.).
* **Gerenciamento de Tokens:** Exige um bom gerenciamento e armazenamento seguro dos tokens (especialmente refresh tokens).
* **Overhead de Múltiplas Requisições:** O fluxo de obtenção do token pode envolver várias requisições HTTP e redirecionamentos.

---

### :no_entry: OAuth 2.0

* **Erro Humano:** Se não for implementado corretamente, pode introduzir vulnerabilidades (ex: redirecionamentos inseguros).
* **Ainda Precisa de HTTPS:** Todas as comunicações do OAuth devem ocorrer sobre HTTPS.

---

### JSON Web Tokens (JWT)

**Como funciona:** Um JWT é um padrão aberto (RFC 7519) para criar tokens de acesso que afirmam informações (claims) sobre uma entidade (normalmente o usuário). Ele é compacto, seguro para URL e assinado digitalmente, o que significa que pode ser verificado para garantir sua autenticidade e integridade. Geralmente, é usado em conjunto com o OAuth 2.0. O token é tipicamente enviado no cabeçalho `Authorization` como `Bearer <token>`.

---

**Estrutura de um JWT:**
Um JWT é composto por três partes separadas por pontos (`.`):
1.  **Header:** Contém o tipo do token (JWT) e o algoritmo de assinatura (ex: HS256, RS256).
2.  **Payload:** Contém as "claims" (informações sobre o usuário, permissões, expiração, etc.).
3.  **Signature:** Uma assinatura criptográfica do header e do payload, garantindo a integridade do token.

---

### :white_check_mark: JSON Web Tokens (JWT)

* **Stateless (Sem Estado):** O servidor não precisa armazenar informações de sessão, pois todas as informações necessárias estão contidas e assinadas no próprio token. Isso escala bem para microserviços.
* **Self-Contained (Autocontido):** O token contém todas as informações necessárias para autenticar e autorizar a requisição, reduzindo a necessidade de consultas ao banco de dados em cada requisição.
* **Assinado Criptograficamente:** A assinatura garante que o token não foi adulterado, protegendo a integridade dos dados.

---

### :white_check_mark: JSON Web Tokens (JWT)

* **Performance:** A verificação do token no servidor é geralmente mais rápida do que uma consulta a banco de dados para uma sessão.
* **Interoperabilidade:** Por ser um padrão aberto, pode ser usado em diversas plataformas e linguagens.

---

###  :no_entry: JSON Web Tokens (JWT)

* **Tamanho do Token:** Se o payload contiver muitas informações, o token pode ficar grande, aumentando o tamanho do cabeçalho da requisição.
* **Revogação Complexa:** A revogação de um JWT antes de sua expiração é um desafio, pois ele é "stateless". Geralmente, exige a manutenção de uma "blacklist" de tokens revogados no servidor, o que anula parcialmente a vantagem do stateless.
* **Vulnerabilidade à Exposição:** Se um JWT for roubado, ele pode ser usado até sua expiração. Por isso, tokens de acesso devem ter um tempo de vida curto.

---

###  :no_entry: JSON Web Tokens (JWT)

* **Não Criptografado (Por Padrão):** O payload é apenas codificado (Base64), não criptografado. Informações sensíveis não devem ser colocadas no payload de um JWT a menos que o token seja adicionalmente criptografado (JWE).
* **Dependência de HTTPS:** Embora a assinatura garanta a integridade, o token ainda precisa ser enviado via HTTPS para evitar que seja interceptado.

---

## CORS (Cross-Origin Resource Sharing)

**CORS** é um mecanismo de segurança que permite que um navegador web solicite recursos de um servidor em um domínio diferente daquele que serviu a página web. É uma medida de segurança implementada pelos navegadores.

---

### Como o CORS Funciona?

  * Por padrão, navegadores impõem a **Same-Origin Policy (Política de Mesma Origem)**, que impede que scripts em uma página web façam requisições a um domínio diferente.
  * CORS permite que o servidor indique explicitamente que outras origens têm permissão para acessar seus recursos.
  
---

### Como o CORS Funciona?

  * Isso é feito através de **cabeçalhos HTTP** na resposta do servidor (ex: `Access-Control-Allow-Origin`).
  * Requisições "preflight" (OPTIONS) são usadas para verificar permissões antes de requisições complexas (PUT, DELETE, requisições com cabeçalhos personalizados).

---

# Programação Web :mortar_board:

*Documentação* 

---

## Swagger (OpenAPI)

**Swagger** (hoje parte da especificação **OpenAPI**) é um conjunto de ferramentas de código aberto construídas em torno da especificação OpenAPI, que permite a criação, documentação, consumo e visualização de APIs RESTful.

---

### Por que usar Swagger/OpenAPI?

  * **Documentação Interativa**: Gera documentação automaticamente a partir do código, que pode ser facilmente visualizada e testada.
  * **Design-First**: Permite projetar e definir a API antes de escrever o código.
  * **Geração de Código**: Pode gerar código cliente e servidor (stubs) a partir da especificação.
  * **Testes Simplificados**: Facilita o teste manual de endpoints da API diretamente na interface da documentação.

---

```yaml
openapi: 3.0.0
info:
  title: Exemplo de API de Produtos
  version: 1.0.0
```

---

```yaml
paths:
  /produtos:
    get:
      summary: Lista todos os produtos
      responses:
        '200':
          description: Uma lista de produtos
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Produto'
```

---

```yaml
    post:
      summary: Cria um novo produto
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProdutoInput'
      responses:
        '201':
          description: Produto criado com sucesso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Produto'
```

---

```yaml
components:
  schemas:
    Produto:
      type: object
      properties:
        id:
          type: integer
          format: int64
        nome:
          type: string
        preco:
          type: number
          format: float
```

---

```yaml
    ProdutoInput:
      type: object
      properties:
        nome:
          type: string
        preco:
          type: number
          format: float
      required:
        - nome
        - preco
```

---

### Exemplos

  * [https://petstore.swagger.io/](https://petstore.swagger.io/)
  * [https://apidadosabertos.saude.gov.br/v1/#/CNES/get_cnes_estabelecimentos](https://apidadosabertos.saude.gov.br/v1/#/CNES/get_cnes_estabelecimentos)

---

## Postman e Insomnia

**Postman** e **Insomnia** são ferramentas populares para desenvolver, testar e documentar APIs. Eles fornecem uma interface gráfica para enviar requisições HTTP e inspecionar as respostas, facilitando muito o trabalho com APIs.

---

### Funções Comuns

  * **Criação e Envio de Requisições**: Permitem construir requisições GET, POST, PUT, DELETE, etc., com cabeçalhos, corpo e parâmetros.
  * **Visualização de Respostas**: Exibem a resposta do servidor de forma formatada (JSON, XML, HTML).
  * **Ambientes**: Permitem configurar variáveis de ambiente para diferentes cenários (desenvolvimento, teste, produção).
  * **Coleções/Projetos**: Organizar requisições em coleções para fácil reuso e compartilhamento.
  * **Testes Automatizados**: Capacidade de escrever scripts para validar as respostas das APIs.

---

# Obrigado :metal:

---

## Eduardo Cruz Araujo

- E-mail: [eduardo.araujo28@fatec.sp.gov.br](eduardo.araujo28@fatec.sp.gov.br)
- Instagram: [edcaraujo](https://www.linkedin.com/in/edcaraujo/)
- Linkedin: [edcaraujo](https://www.instagram.com/)
- Github: [edcaraujo](https://github.com/edcaraujo)