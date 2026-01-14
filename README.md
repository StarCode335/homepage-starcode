# Documentação StarCode - Guia de Conteúdo

Este guia orienta como substituir os placeholders por conteúdos reais e como realizar ajustes básicos de estilo.

## 🖼️ Como Adicionar Imagens

Todas as imagens devem ser colocadas na pasta `ASSETS/`.

### 1. Logo

- Substitua `ASSETS/logo.png` pela sua logo oficial. Recomenda-se fundo transparente (PNG).

### 2. Prints de Projetos (Portfólio)

- No arquivo `index.html`, procure pela classe `project-screenshot`.
- Substitua o `<div class="screenshot-placeholder">` por uma tag `<img>`:
  ```html
  <div class="project-screenshot">
    <img src="ASSETS/projeto1.jpg" alt="Descrição do Projeto" />
  </div>
  ```
- No `style.css`, a classe `.project-screenshot img` deve ser configurada com `width: 100%; height: 100%; object-fit: cover;`.

### 3. Fotos da Equipe

- No arquivo `index.html`, procure pela classe `team-photo`.
- Substitua o `<div class="photo-placeholder">` por uma tag `<img>`:
  ```html
  <div class="team-photo">
    <img src="ASSETS/membro1.jpg" alt="Nome do Membro" />
  </div>
  ```
- **Importante**: Utilize fotos em proporção retrato (ex: 3:4) para melhor encaixe.

---

## ✍️ Como Alterar Textos

Abra o arquivo `index.html` e edite os seguintes campos:

1. **Portfólio**:

   - `<h3>Nome do Projeto</h3>`: Título do seu trabalho.
   - `<p>Breve descrição...</p>`: Explicação do que foi feito.
   - `href="#"`: Substitua o `#` pelo link real do site ou repositório.

2. **Equipe**:

   - `<h3>Nome do Membro</h3>`: Nome completo.
   - `<p class="team-role">`: Cargo ou função.
   - `<p class="team-skills">`: Lista de competências.

3. **Footer (Redes Sociais)**:
   - Procure por `class="social-links"`.
   - Substitua os links `href="https://wa.me/"` etc., pelos seus perfis reais.

---

## 🎨 Como Personalizar Cores e Estilos

No topo do arquivo `style.css`, você encontrará as variáveis de cores:

```css
:root {
  --cor-primaria: #1f71b1; /* Azul Principal */
  --cor-secundaria: #085ea9; /* Azul Escuro */
  --cor-terciaria: #3e97c9; /* Azul Médio */
  --cor-quaternaria: #2d83bd; /* Azul Brilhante */
  --cor-quintaria: #4bacd9; /* Azul Claro */
}
```

- Altere os códigos hexadecimais para mudar o tema de cores de todo o site instantaneamente.
- Para alterar fontes, mude o link do Google Fonts no `<head>` do `index.html` e atualize a propriedade `font-family` no `body` do `style.css`.

---

## ⚙️ Configurações Técnicas

- **Velocidade do Carrossel**: No arquivo `script.js`, procure por `5000` (Portfólio) ou `4000` (Equipe) para ajustar o tempo em milissegundos.
- **Transições**: As animações de fade-in podem ser ajustadas na classe `.section` no `style.css`.
