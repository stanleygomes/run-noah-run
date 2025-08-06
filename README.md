
# 🕹️ Run Noah, Run

## A aventura começa quando a internet acaba!

Noah Run é um jogo endless runner inspirado no clássico T-Rex do Google Chrome, criado para ser jogado diretamente no navegador, sem necessidade de instalação ou dependências de backend. O objetivo é desviar de obstáculos, como cactos, e alcançar a maior pontuação possível. O projeto foi desenvolvido com foco em simplicidade, performance e visual retrô, utilizando apenas HTML, CSS puro e JavaScript.

Ideal para quem busca diversão rápida, aprendizado em desenvolvimento web ou deseja contribuir com melhorias e novas funcionalidades. Abra o arquivo `index.html` ou rode localmente para jogar!

<div align="center">
  <img src="assets/images/banner.png" alt="banner" />
</div>

## ⚡ Stack Tecnológica

- **Linguagem**: Javascript
- **Estilização**: Pure CSS

## 🚀 Rodar localmente

Para rodar o Run Noah Run em ambiente local, basta utilizar o comando abaixo. Certifique-se de ter o Node.js (versão 18 ou superior) instalado:

```bash
npm install
npm start
```

O projeto será servido localmente usando a biblioteca `serve` instalada no próprio repositório. Acesse o endereço mostrado no terminal para jogar.

> **Recomendação:** Use Node.js versão 18 ou superior para melhor compatibilidade.

## Features

- 🎮 **Endless Runner Gameplay** - Jump over cacti and duck under birds
- 🎨 **Clean Pixel Art Style** - Retro aesthetic like the original

## Game Controls

- **Space Bar** or **Up Arrow** - Jump over obstacles

## 🏷️ Versionamento & Deploy

Este projeto utiliza um fluxo automatizado para versionamento e deploy:

1. **Pull Request (PR):**
   - Todo novo código deve ser enviado via PR para a branch `master`.
   - O workflow do GitHub Actions (`pr-checks.yml`) valida os commits (padrão Conventional Commits) e a formatação do código (Prettier).
   - O PR só pode ser aprovado se todos os checks passarem.

2. **Merge na master:**
   - Ao aprovar e fazer merge do PR na branch `master`, dois processos automáticos são disparados:
     - **Deploy na Vercel:** O projeto é publicado automaticamente na Vercel, tornando a nova versão disponível online.
     - **Versionamento automático:** O workflow (`release.yml`) executa o `semantic-release`, que:
       - Atualiza o changelog.
       - Incrementa a versão no `package.json`.
       - Cria e publica uma nova tag no repositório automaticamente.
       - Abre um Pull Request com as mudanças do changelog que precisa ser aprovado para refletir no repositório.

Esse fluxo garante rastreabilidade, organização e publicação contínua do projeto, sem necessidade de comandos manuais.

## 🤝 Como contribuir

Suas contribuições são muito bem-vindas! Se você tem uma ideia de melhoria, correção de bug ou nova funcionalidade, sinta-se à vontade para abrir uma issue ou pull request. Colaboração e novas perspectivas são altamente valorizadas aqui. Vamos construir algo incrível juntos!

Por favor, siga nosso código de conduta em todas as interações com o projeto.

### Passo a passo para contribuir

1. **Crie uma branch**: Sempre crie uma nova branch a partir da `master` usando o padrão `feature/xxx`, `fix/xxx` ou outro prefixo apropriado.

2. **Faça commits pequenos e focados**: Cada commit deve representar uma alteração lógica única. Evite commits grandes com muitas mudanças não relacionadas. Isso facilita a revisão e validação do código.

3. **Padrão de mensagens de commit**: Todos os commits devem seguir a especificação [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) (Versionamento Semântico). Exemplos:
  - `feat: adicionar funcionalidade de login do usuário`
  - `fix: corrigir bug no login`
  - `chore: atualizar dependências`
  - `docs: atualizar README`
  - `test: adicionar testes para login`


> **Recomendações:**
>
> Prefira escrever as mensagens de commit em português e sem acentuação. Isso facilita a padronização e evita problemas de encoding em diferentes sistemas.
>
> Apenas commits do tipo `feat` e `fix` geram tag de deploy e disparam uma release. Outros tipos como `chore`, `docs`, `test`, etc., não geram tag de deploy.
>
> Commits que não seguirem esse padrão **não** serão mergeados, pois quebram o processo de geração de release.
>
> Nem todos os commits precisam ser `feat` ou `fix`, mas sempre use o tipo correto para sua alteração.

4. **Pull Request (PR)**: Abra um PR para a `master` com um título claro e descritivo. Na descrição do PR, explique o que está sendo feito e por quê. Referencie issues relacionadas, se aplicável.

6. **Release e Deploy**: Para detalhes sobre deploy e versionamento, consulte a [seção de Versionamento no README.md](./README.md).

Esse fluxo garante qualidade, rastreabilidade e entrega contínua de valor. Seguindo essas orientações você evita erros e agiliza o processo de revisão e release.

## Créditos

O motor e a lógica do jogo foram adaptados a partir do excelente trabalho do repositório [dino-game](https://github.com/CodingWith-Adam/dino-game) criado por [CodingWith-Adam](https://github.com/CodingWith-Adam).

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
