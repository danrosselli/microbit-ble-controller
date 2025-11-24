# Microbit BLE Controller 🎮

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Controle seu robô BBC micro:bit através de uma interface web usando Web Bluetooth API e joysticks virtuais.

## 🌟 Funcionalidades

- 🎮 **Dois joysticks virtuais** - Controle preciso com arrastar e soltar
- 🔵 **Web Bluetooth** - Conexão direta sem apps adicionais
- 📱 **Responsivo** - Funciona em desktop, tablet e smartphone
- 🔄 **Detecção de orientação** - Layout adaptado para vertical/horizontal
- ⚡ **Tempo real** - Comandos enviados instantaneamente via UART
- 🎨 **Interface moderna** - Design glassmorphism com gradientes

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ ou Bun
- Navegador compatível com Web Bluetooth (Chrome, Edge, Opera)
- BBC micro:bit com Bluetooth habilitado

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/microbit-ble-controller.git
cd microbit-ble-controller

# Instalar dependências
npm install
# ou
bun install

# Iniciar servidor de desenvolvimento
npm run dev
# ou
bun run dev
```

O servidor estará disponível em `https://localhost:5174`

> ⚠️ **Nota**: Você precisará aceitar o certificado SSL auto-assinado no navegador (Avançado → Ir para localhost)

## 🎯 Como Usar

1. **Conectar ao micro:bit**
   - Clique no botão "🔌 Conectar ao Micro:bit"
   - Selecione seu dispositivo BBC micro:bit na lista
   - Aguarde a conexão (botão ficará verde: "🤖 Conectado")

2. **Controlar com joysticks**
   - **Joystick Esquerdo (MOVIMENTO)**: Arraste para controlar direção
     - ⬆️ Cima = Y positivo (frente)
     - ⬇️ Baixo = Y negativo (trás)
     - ➡️ Direita = X positivo
     - ⬅️ Esquerda = X negativo
   
   - **Joystick Direito (ROTAÇÃO)**: Arraste para controlar rotação/velocidade
     - Horizontal = Rotação
     - Vertical = Velocidade

3. **Monitorar comandos**
   - Abra o console do navegador (F12)
   - Veja os comandos UART sendo enviados em tempo real

## 📡 Comandos UART

| Joystick | Comando | Exemplo |
|----------|---------|---------|
| Esquerdo | `move:X,Y` | `move:75,100` |
| Direito | `rotate:X,speed:Y` | `rotate:-50,80` |

**Valores**: -100 a 100 (normalizados)

## 🛠️ Tecnologias

- **[Vite](https://vitejs.dev/)** - Build tool ultra-rápido
- **[Hybrids](https://hybrids.js.org/)** - Web Components funcionais
- **[Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)** - Comunicação BLE
- **Pointer Events** - Suporte touch/mouse/pen unificado

## 📁 Estrutura do Projeto

```
microbit-ble-controller/
├── src/
│   ├── components/
│   │   └── microbit-control.js    # Componente principal com joysticks
│   ├── services/
│   │   └── bluetooth.js           # Serviço Web Bluetooth
│   ├── main.js                    # Entry point
│   └── style.css                  # Estilos globais
├── index.html                     # HTML principal
├── vite.config.js                 # Configuração Vite + SSL
└── package.json
```

## 🔧 Configuração do Micro:bit

Para usar este controlador, seu micro:bit precisa:

1. Ter o serviço UART Bluetooth habilitado
2. Escutar comandos no formato `move:X,Y` e `rotate:X,speed:Y`
3. UUID do serviço UART: `6e400001-b5a3-f393-e0a9-e50e24dcca9e`

Exemplo de código MakeCode/MicroPython disponível na pasta `examples/` (se aplicável).

## 🌐 Compatibilidade

### Navegadores Suportados

| Navegador | Desktop | Mobile | Notas |
|-----------|---------|--------|-------|
| Chrome | ✅ | ✅ | Recomendado |
| Edge | ✅ | ✅ | Baseado em Chromium |
| Opera | ✅ | ✅ | Baseado em Chromium |
| Firefox | ❌ | ❌ | Sem suporte Web Bluetooth |
| Safari | ❌ | ❌ | Sem suporte Web Bluetooth |

### Requisitos

- ✅ HTTPS (certificado SSL necessário)
- ✅ Bluetooth habilitado no dispositivo
- ✅ Permissão de Bluetooth concedida

## 🐛 Troubleshooting

### Erro: "Bluetooth não disponível"
- Verifique se o Bluetooth está ligado
- Use navegador compatível (Chrome, Edge, Opera)
- Acesse via HTTPS

### Erro: "Dispositivo não encontrado"
- Certifique-se que o micro:bit está ligado
- Reset o micro:bit se necessário
- Aproxime o dispositivo

### Certificado SSL inválido
- Clique em "Avançado" → "Ir para localhost (não seguro)"
- Isso é normal em desenvolvimento com certificado auto-assinado

## 📱 Deploy

Para usar em rede local ou produção:

```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

Para HTTPS em produção, você precisará de um certificado SSL válido.

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

## 📞 Contato

- Abra uma [issue](https://github.com/seu-usuario/microbit-ble-controller/issues) para reportar bugs
- Pull requests são sempre bem-vindos!

---

**Feito com 🎮 e ☕**
