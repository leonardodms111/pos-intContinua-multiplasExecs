# Pipeline de Integração Contínua (CI)

## Objetivo

O objetivo desse projeto é trabalhar algumas possibilidades de execução da pipeline de testes no CI/CD. Trabalharemos especificamente com três tipos de execução:

 * Manual
 * Agendada
 * Por push


---

## Funcionamento da Pipeline

O arquivo de workflow está localizado em:

```text
.github/workflows/ci.yml
```

A pipeline é executada automaticamente em três cenários:

### 1. Push para branches principais

Sempre que um commit é enviado para as branches:

* main
* develop

a pipeline é disparada automaticamente.

```yaml
on:
  push:
    branches:
      - main
      - develop
```

Essa estratégia garante que todas as alterações ligadas às branches principais sejam validadas através execução dos testes.

---

### 2. Execução Manual

O workflow também pode ser executado manualmente através do GitHub Actions.

```yaml
workflow_dispatch:
```

Essa funcionalidade é útil para reexecutar testes sem a necessidade de realizar novos commits.

---

### 3. Execução Agendada

A pipeline possui uma execução programada.

```yaml
schedule:
  - cron: '0 8 * * 1-5'
```

"O" formato da CRON segue a seguinte logica:
"0" = minuto (executa no minuto zero)
"8" = hora (executa as 08:00)
"*" = Dia do mês (Neste caso, executa TODOS os dias do mês)
"*" =  mês (Neste caso executa TODOS os meses)
1-5" = Dias da semana (Executa de segunda a sexta)

O objetivo dessa execução agendada é identificar possíveis problemas causados por dependências externas, indisponibilidade de ambientes ou outras falhas que possam ocorrer mesmo sem alterações recentes no código.

---

## Ambiente de Execução

A execução ocorre em um runner hospedado pelo GitHub utilizando sistema operacional Windows.

```yaml
runs-on: windows-latest
```

A escolha do ambiente Windows garante compatibilidade com aplicações ou dependências que necessitem desse sistema operacional.

---

## Etapas da Pipeline

### 1. Checkout do Código

```yaml
- name: Checkout do código
  uses: actions/checkout@v4
```

Realiza o download do código-fonte do repositório para o ambiente de execução da pipeline.

Sem essa etapa o workflow não teria acesso aos arquivos do projeto.

---

### 2. Configuração do Node.js

```yaml
- name: Configurar Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 24.x
```

Instala e configura a versão 24 do Node.js necessária para execução da aplicação e dos testes.

A padronização da versão evita comportamentos diferentes entre ambientes locais e o ambiente de CI.

---

### 3. Instalação das Dependências

```yaml
- name: Instalar dependências
  run: npm ci
```

Instala todas as dependências definidas no arquivo `package-lock.json`.

---

### 4. Execução dos Testes Automatizados

```yaml
- name: Executar testes (Mocha)
  run: npm test
```

Executa a suíte de testes automatizados configurada no projeto.

Caso algum teste falhe, a pipeline será marcada como falha, Não deixando problemas passarem despecebidos.

---

### 5. Publicação dos Artefatos

```yaml
- name: Publicar artefatos de teste
  if: always()
  uses: actions/upload-artifact@v4
```

Ao final da execução, os resultados dos testes são armazenados como artefatos do GitHub Actions.

```yaml
with:
  name: mocha-report
  path: test-results/
  retention-days: 30
```

Os arquivos presentes na pasta `test-results` ficam disponíveis para download por até 30 dias.

A condição:

```yaml
if: always()
```

garante que os artefatos sejam publicados mesmo quando ocorrer falha na execução dos testes, facilitando a análise e investigação de erros.


---

## Fluxo Resumido

1. Desenvolvedor realiza alteração no código.
2. O push para `main` ou `develop` dispara a pipeline.
3. O GitHub Actions prepara o ambiente.
4. As dependências são instaladas.
5. Os testes automatizados são executados.
6. Os relatórios são armazenados como artefatos.
7. A equipe consulta os resultados da execução.

```
```
