# BlazorDashboard

## 📌 Visão Geral

Dashboard analítico construído em Blazor WebAssembly (.NET 8), com gráficos interativos via ECharts e dados servidos por uma fake API REST (json-server) — sem backend próprio para manter.

Pontos que se destacam:

- Consumo de API via `HttpClient` nomeado (`IHttpClientFactory`), com modelos fortemente tipados para os dados do dashboard.
- Gráficos (linha, pizza, barra, área) renderizados com ECharts via JS Interop, recebendo os dados dinamicamente do componente Blazor — nada hardcoded no JS.
- Dark/Light mode com `ThemeService` centralizado e propagação de tema para os gráficos em tempo real.
- Fake API com json-server (`db.json`) simulando um backend real, incluindo CORS e um endpoint agregador (`/db`) que devolve todo o dataset em uma única chamada.
- Tratamento de estado de carregamento e erro (API fora do ar) diretamente na UI.

## 🗂️ Estrutura do Projeto

```
BlazorDashboard/
├── Models/
│   └── DashboardData.cs         ← DTOs que espelham o db.json (stats, gráficos, etc.)
├── Pages/
│   ├── Dashboard.razor          ← página principal, busca os dados na fake API
│   └── Dashboard.razor.css
├── Shared/
│   ├── MainLayout.razor
│   └── MainLayout.razor.css
├── Properties/
│   └── launchSettings.json
├── wwwroot/
│   ├── css/app.css
│   ├── js/charts.js             ← inicialização/atualização dos gráficos ECharts
│   ├── lib/bootstrap/
│   └── index.html
├── demonstração/
│   └── demonstração da aplicação.mp4
├── db.json                      ← "banco de dados" da fake API (json-server)
├── package.json                 ← script `npm run api`
├── Program.cs                   ← DI: HttpClient da fake API, MudBlazor, ThemeService
├── ThemeService.cs              ← estado e eventos do dark/light mode
├── App.razor
├── _Imports.razor
└── BlazorDashboard.csproj
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- .NET 8 SDK
- Node.js 18+ (para rodar a fake API com json-server)

### 🔧 Instalação

1. **Clone o repositório**:

```bash
git clone https://github.com/pedrogoncaloDev/BlazorDashboard.git
cd BlazorDashboard
```

2. **Restaure as dependências .NET**:

```bash
dotnet restore
```

3. **Instale as dependências Node (fake API)**:

```bash
npm install
```

4. **Suba a fake API** (terminal 1):

```bash
npm run api
```

Isso inicia o json-server em `http://localhost:3001`, servindo o conteúdo de `db.json`.

5. **Rode a aplicação** (terminal 2):

```bash
dotnet run
```

Acesse `http://localhost:5289` no navegador.

## 🧩 Tecnologias & Decisões

- **.NET 8 / Blazor WebAssembly**: SPA rodando inteiramente no navegador, sem servidor de aplicação próprio.
- **ECharts**: biblioteca de gráficos carregada via CDN e controlada por JS Interop.
- **MudBlazor**: componentes de UI baseados em Material Design.
- **json-server**: fake API REST gerada a partir de um único `db.json`, com CORS habilitado por padrão — ideal para prototipar o front sem depender de um backend real.
- **System.Net.Http.Json**: desserialização direta das respostas da API para os modelos em `Models/DashboardData.cs`.

### Camadas da aplicação

**Dashboard.razor**
- Busca os dados em `OnInitializedAsync` via `HttpClientFactory.CreateClient("DashboardApi")`.
- Renderiza cards de estatísticas e métricas secundárias a partir de listas vindas da API (`@foreach`), sem valores fixos no markup.
- Exibe estado de carregamento e uma mensagem de erro caso a fake API esteja fora do ar.

**charts.js**
- Recebe o payload de gráficos (linha, pizza, barra, área) como parâmetro do Blazor, em vez de manter os dados no JavaScript.
- Guarda o último payload recebido para poder redesenhar os gráficos ao trocar de tema, sem nova chamada à API.

**ThemeService.cs**
- Estado singleton do dark/light mode, com evento `OnThemeChanged` consumido pela página para re-renderizar e atualizar as cores dos gráficos.

## 📊 Dashboard

O dashboard cobre quatro áreas:

- **Estatísticas principais** — receita total, usuários ativos, pedidos e taxa de conversão, cada uma com indicador de tendência.
- **Evolução de vendas** — vendas vs. meta ao longo de 12 meses (gráfico de linha).
- **Distribuição por categoria e top produtos** — participação por categoria (pizza) e ranking dos produtos mais vendidos (barra).
- **Tráfego do site** — visitas nos últimos 30 dias (gráfico de área) e métricas secundárias (sessão média, rejeição, pedidos/hora, ticket médio).

Todos os valores vêm do `db.json` — para simular novos cenários, basta editar o arquivo e recarregar a página (o json-server serve o conteúdo atualizado automaticamente).

## About

Dashboard analítico em Blazor WebAssembly com gráficos ECharts, dark mode e dados consumidos de uma fake API REST (json-server), aplicando boas práticas como tipagem forte dos dados, separação de responsabilidades entre C# e JS, e tratamento de estado de carregamento/erro.
