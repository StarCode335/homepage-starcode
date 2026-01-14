# Documentação StarCode - Guia de Conteúdo

Este guia orienta como substituir os placeholders por conteúdos reais, gerenciar itens da equipe e do portfólio, e realizar ajustes básicos de estilo.

------

## 🖼️ Como Gerenciar Imagens

Todas as imagens devem ser colocadas na pasta `ASSETS/`.

### 1. Logo Oficial

- Substitua `ASSETS/logo.png` pela sua logo oficial.
- **Dica**: Utilize o formato PNG com fundo transparente para um visual mais profissional.

### 2. Fotos da Equipe e Prints de Projetos

Agora o código já possui as tags `<img>` prontas. Para alterar as fotos, basta mudar o caminho no atributo `src`:

1. **Equipe**: No `index.html`, localize a tag `<img>` dentro de `.team-photo` e altere o `src`:
   ```html
   <img src="ASSETS/fotos-equipe/sua-foto.jpg" alt="Nome do Membro" />
   ```
   _Nota: O site agora utiliza molduras maiores (240x320px). Recomenda--se fotos em proporção retrato 3:4._
2. **Portfólio**: Localize a tag `<img>` dentro de `.project-screenshot` e altere o `src`:
   ```html
   <img src="ASSETS/seu-projeto.jpg" alt="Nome do Projeto" />
   ```
   _Nota: A área de destaque foi ajustada para 380px de altura para garantir que o conteúdo caiba em diferentes telas. O site ajusta o print automaticamente para preencher este espaço._\_

---

## 👥 Gerenciando a Seção Equipe

A seção de equipe é composta por blocos chamados `.team-card` dentro da div `.team-scroll`.

### Como alterar um membro existente:

1. Abra o arquivo `index.html`.
2. Procure pela seção `<!-- Seção Equipe -->`.
3. Altere os textos entre as tags:
   - `<h3>`: Nome do colaborador.
   - `<p class="team-role">`: Cargo ou função.
   - `<p class="team-skills">`: Habilidades ou ferramentas.

### Como adicionar um novo membro:

1. Copie todo o bloco de um membro existente (do `<!-- Membro X -->` até o fechamento da `</div>` do `.team-card`).
2. Cole logo após o último membro, antes do fechamento da `</div>` da classe `.team-scroll`.
3. O site ajustará o scroll automaticamente para incluir o novo integrante.

### Como excluir um membro:

1. Localize o bloco `.team-card` do membro que deseja remover.
2. Apague o bloco completo (da linha `<div class="team-card">` até a respectiva `</div>`).

---

## 📁 Gerenciando a Seção Portfólio

Os projetos são exibidos em um carrossel. Cada projeto é um bloco `.project-card` dentro de `.carousel-track`.

### Como alterar um projeto existente:

1. Abra o arquivo `index.html`.
2. Procure pela seção `<!-- Seção Portfólio -->`.
3. Altere as informações:
   - `<h3>`: Nome do projeto.
   - `<p>`: Descrição curta.
   - `<a>` (links): No campo `href="#"`, substitua o `#` pelo link do site ou do repositório GitHub.

### Como adicionar um novo projeto:

1. Copie o bloco de um projeto existente (da `<div class="project-card">` até a sua `</div>`).
2. Cole logo após o último projeto, dentro da `<div class="carousel-track">`.
3. O carrossel identificará o novo projeto automaticamente e adicionará um novo "passo" na navegação.

### Como excluir um projeto:

1. Localize o bloco `.project-card` correspondente.
2. Apague o bloco completo.

---

## 🎨 Personalização de Estilos

### Cores e Temas

No arquivo `style.css`, você pode alterar as cores globais no topo do arquivo:

```css
:root {
  --cor-primaria: #1f71b1;
  --cor-secundaria: #085ea9;
  /* ... outras cores */
}
```

### Fontes

Para trocar a fonte, altere o link do Google Fonts no `<head>` do `index.html` e atualize a variável `--font-main` (se existir) ou a propriedade `font-family` no `body` do `style.css`.

### Ícones e Redes Sociais

O projeto utiliza o **FontAwesome** para os ícones. Os links de redes sociais no footer possuem cores de marca automáticas ao passar o mouse.

**Como alterar os links sociais:**

1. No `index.html`, localize o bloco `<div class="social-links">`.
2. Altere o `href` de cada rede social:
   - **WhatsApp**: `https://wa.me/SEUNUMERO`
   - **LinkedIn**: `https://linkedin.com/in/SEUPERFIL`
   - **GitHub**: `https://github.com/SEUUSUARIO`
   - **Instagram**: `https://instagram.com/SEUPERFIL`
   - **E-mail**: `mailto:seuemail@exemplo.com`

**Como trocar um ícone:**
Substitua a classe `<i>` dentro do link pelo código do ícone desejado do [FontAwesome](https://fontawesome.com/search). Exemplo: `<i class="fa-brands fa-x-twitter"></i>`.

---

## ⚙️ Configurações Técnicas (script.js)

- **Velocidade do Carrossel**: Altere o valor `5000` (milissegundos) para mudar a velocidade de transição automática dos projetos.
- **Velocidade do Scroll da Equipe**: Altere o valor `4000` para mudar o intervalo de movimento da equipe.
