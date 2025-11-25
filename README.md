# Microbit BLE Controller 🎮

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Controle seu robô BBC micro:bit através de uma interface web moderna usando Web Bluetooth API e joysticks virtuais arrastar-e-soltar.

## � Acesso Online

**Acesse direto pelo navegador:** [https://soware.com.br/apps/microbit-controller](https://soware.com.br/apps/microbit-controller)

Compatível com dispositivos desktop e mobile!

## �🌟 Funcionalidades

- 🎮 **Dois joysticks virtuais** - Controle preciso com arrastar e soltar
- 🔵 **Web Bluetooth** - Conexão direta sem apps adicionais
- 📱 **PWA (Progressive Web App)** - Instale como app nativo
- 🖥️ **Modo Tela Cheia** - Interface sem bordas do navegador
- 📡 **Envio contínuo** - 10 comandos por segundo
- 🔄 **Detecção de orientação** - Layout adaptado para vertical/horizontal
- ⚡ **Tempo real** - Comandos enviados instantaneamente via UART
- 🎨 **Interface moderna** - Design glassmorphism com gradientes

## 🚀 Começando

### Pré-requisitos

- **Bun** (runtime JavaScript)
- Navegador compatível com Web Bluetooth (Chrome, Edge, Opera)
- BBC micro:bit com Bluetooth habilitado

### Instalação Local

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/microbit-ble-controller.git
cd microbit-ble-controller

# Instalar dependências
bun install

# Iniciar servidor de desenvolvimento
bun run dev
```

O servidor estará disponível em `https://localhost:5174`

> ⚠️ **Nota**: Você precisará aceitar o certificado SSL auto-assinado no navegador (Avançado → Ir para localhost)

### Build para Produção

```bash
# Gerar build otimizado
bun run build

# Preview do build
bun run preview
```

Os arquivos estarão em `dist/` prontos para deploy.

## 📱 Instalação como PWA (App Nativo)

### No Celular (Android/iOS):

1. **Acesse pelo Chrome**: [https://soware.com.br/apps/microbit-controller](https://soware.com.br/apps/microbit-controller)

2. **Instale o app**:
   - **Android**: Menu (⋮) → "Instalar app" ou "Adicionar à tela inicial"
   - **iOS**: Botão compartilhar → "Adicionar à Tela de Início"

3. **Abra pelo ícone** na tela inicial

4. **Aproveite**:
   - ✅ Tela cheia (sem barra do navegador)
   - ✅ Ícone personalizado
   - ✅ Funciona offline após instalado
   - ✅ Experiência nativa

### No Desktop:

1. Acesse pelo Chrome/Edge
2. Barra de endereço → ícone de instalação (➕)
3. Clique em "Instalar"

## 🎯 Como Usar

### 1. Conectar ao micro:bit

- Clique no botão **"🔌 Conectar ao Micro:bit"** (topo)
- Selecione seu dispositivo **BBC micro:bit** na lista
- Aguarde a conexão (botão ficará verde: **"🤖 Conectado"**)

### 2. Controlar com Joysticks

**Joystick Esquerdo (MOVIMENTO)**:
- Arraste o círculo central para controlar direção
- ⬆️ **Cima** = Y positivo (frente)
- ⬇️ **Baixo** = Y negativo (trás)
- ➡️ **Direita** = X positivo
- ⬅️ **Esquerda** = X negativo

**Joystick Direito (ROTAÇÃO)**:
- Arraste para controlar rotação
- **Horizontal** = Rotação X
- **Vertical** = Rotação Y

### 3. Monitorar Comandos

- Abra o console do navegador (F12)
- Veja os comandos UART sendo enviados em tempo real

## 📡 Comandos UART

| Joystick | Comando | Exemplo | Descrição |
|----------|---------|---------|-----------|
| Esquerdo | `move:X,Y` | `move:75,100` | Movimento (X, Y) |
| Direito | `rotate:X,Y` | `rotate:-50,80` | Rotação (X, Y) |

**Valores**: -100 a 100 (normalizados)

**Frequência**: 10 comandos por segundo (100ms de intervalo)

## 🛠️ Tecnologias

- **[Bun](https://bun.sh/)** - Runtime JavaScript ultra-rápido
- **[Vite](https://vitejs.dev/)** - Build tool moderno
- **[Hybrids](https://hybrids.js.org/)** - Web Components funcionais
- **[Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)** - Comunicação BLE
- **Pointer Events** - Suporte unificado touch/mouse/pen
- **Service Worker** - Para PWA offline

## 📁 Estrutura do Projeto

```
microbit-ble-controller/
├── public/
│   ├── icon.svg              # Ícone SVG customizado
│   ├── manifest.json         # Manifesto PWA
│   └── sw.js                 # Service Worker
├── src/
│   ├── components/
│   │   └── microbit-control.js    # Componente principal com joysticks
│   ├── services/
│   │   └── bluetooth.js           # Serviço Web Bluetooth
│   ├── main.js                    # Entry point
│   └── style.css                  # Estilos globais
├── index.html                     # HTML principal
├── vite.config.js                 # Configuração Vite + SSL
├── package.json
└── bun.lock
```

## 🔧 Configuração do Micro:bit

Para usar este controlador, seu micro:bit precisa:

1. Ter o **serviço UART Bluetooth** habilitado
2. Escutar comandos no formato `move:X,Y` e `rotate:X,Y`
3. UUID do serviço UART: `6e400001-b5a3-f393-e0a9-e50e24dcca9e`

Exemplo de código MakeCode/MicroPython disponível na documentação do micro:bit.

## 🌐 Compatibilidade

### Navegadores Suportados

| Navegador | Desktop | Mobile | PWA | Web Bluetooth |
|-----------|---------|--------|-----|---------------|
| Chrome | ✅ | ✅ | ✅ | ✅ |
| Edge | ✅ | ✅ | ✅ | ✅ |
| Opera | ✅ | ✅ | ✅ | ✅ |
| Firefox | ❌ | ❌ | ❌ | ❌ |
| Safari | ❌ | ❌ | ❌ | ❌ |

### Requisitos

- ✅ **HTTPS** (certificado SSL válido em produção)
- ✅ **Bluetooth** habilitado no dispositivo
- ✅ **Permissão Bluetooth** concedida pelo usuário

## 🐛 Troubleshooting

### "Bluetooth não disponível"
- Verifique se o Bluetooth está ligado
- Use navegador compatível (Chrome, Edge, Opera)
- Acesse via HTTPS

### "Dispositivo não encontrado"
- Certifique-se que o micro:bit está ligado
- Reset o micro:bit se necessário
- Aproxime o dispositivo

### Certificado SSL inválido (desenvolvimento)
- Clique em "Avançado" → "Ir para localhost (não seguro)"
- Normal em desenvolvimento com certificado auto-assinado
- Em produção, use certificado válido

### PWA não instala / Barra do navegador aparece
- Só funciona com HTTPS válido (não auto-assinado)
- Limpe cache do navegador
- Desinstale e reinstale o app
- Verifique se Service Worker registrou (console: F12)

## 📱 Deploy

### Opções de Hospedagem Gratuita com HTTPS:

**Netlify** (Recomendado):
```bash
bun install -g netlify-cli
bun run build
netlify deploy --prod --dir=dist
```

**Vercel**:
```bash
bun install -g vercel
bun run build
vercel --prod
```

**GitHub Pages, Cloudflare Pages, etc.**: Simplesmente faça upload da pasta `dist/`

> **Importante**: PWA completo (tela cheia) só funciona com certificado SSL válido!

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👏 Créditos

- Desenvolvido com ❤️ para controle de robôs micro:bit
- Inspirado pela comunidade maker e IoT
- Projeto disponível em: [https://soware.com.br/apps/microbit-controller](https://soware.com.br/apps/microbit-controller)

## 📞 Contato

- Abra uma [issue](https://github.com/seu-usuario/microbit-ble-controller/issues) para reportar bugs
- Pull requests são sempre bem-vindos!

---

**Feito com 🎮 e ☕**
