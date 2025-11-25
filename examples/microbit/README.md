# Código Micro:bit para Robô com Nezha V2

Este diretório contém o código de exemplo para programar o BBC micro:bit que controla um robô usando a placa Nezha V2.

## 📄 Arquivo

- **[microbit-ble-controller.makecode.js](microbit-ble-controller.makecode.js)** - Código JavaScript para MakeCode

## 🎯 Funcionalidade

Este código permite que o micro:bit:

1. **Receba comandos Bluetooth** via UART do controlador web
2. **Processe comandos** no formato `move:X,Y` e `rotate:X,Y`
3. **Controle motores** da placa Nezha V2 (M1 e M2)
4. **Mostre status** no display LED do micro:bit

## 🔧 Como Usar

### 1. Importar no MakeCode

1. Acesse [makecode.microbit.org](https://makecode.microbit.org)
2. Crie um novo projeto
3. Clique em "JavaScript" no topo
4. Cole o código de [microbit-ble-controller.makecode.js](microbit-ble-controller.makecode.js)
5. Ou importe como blocos usando o editor visual

### 2. Adicionar Extensões Necessárias

No MakeCode, adicione estas extensões:

- **Bluetooth** - Pesquise por "Bluetooth" nas extensões
- **Nezha V2** - Pesquise por "Nezha" nas extensões

### 3. ⚠️ Configurar Bluetooth (IMPORTANTE!)

Esta etapa é **obrigatória** para que o micro:bit aceite conexões do controlador web:

1. No MakeCode, clique no ícone de **engrenagem (⚙️)** no canto superior direito
2. Selecione **"Project Settings"**
3. Marque:
   - ✅ **"No Pairing Required: Anyone can connect via Bluetooth."**
4. Clique em **"Done"**

> **⚠️ CRÍTICO**: Se esta opção não estiver marcada, o micro:bit NÃO aceitará a conexão Bluetooth do controlador web!

### 4. Fazer Upload

1. Conecte o micro:bit via USB
2. Clique em "Download" no MakeCode
3. Copie o arquivo `.hex` para o micro:bit

### 5. Emparelhar Bluetooth

1. Ligue a micro:bit e aguarde a animação de losangos
2. No seu aplicativo do controller, clique no botão de conectar
3. Selecione a micro:bit no seu celular e clique em parear
4. Uma carinha feliz deve aparecer na micro:bit
5. Pronto para controlar!

## 📡 Comandos Recebidos

| Comando | Formato | Exemplo | Descrição |
|---------|---------|---------|-----------|
| Movimento | `move:X,Y` | `move:50,100` | X = lateral, Y = frente/trás |
| Rotação | `rotate:X,Y` | `rotate:-50,80` | Capturado mas não usado |

### Processamento do Movimento

- **moveY** (Y): Velocidade base frente/trás (-100 a 100)
- **moveX** (X): Curva lateral (-100 a 100)
  - Negativo = curva esquerda (reduz velocidade roda esquerda)
  - Positivo = curva direita (reduz velocidade roda direita)

**Exemplo**:
```
move:0,100   → Frente reto (ambas rodas 100%)
move:50,100  → Frente virando direita (esq:100%, dir:50%)
move:-50,100 → Frente virando esquerda (esq:50%, dir:100%)
move:0,-100  → Ré reto
```

## 🤖 Hardware Usado

- **BBC micro:bit** (v1.5 ou v2)
- **Placa Nezha V2** - Controladora de motores
- **2 Motores DC** - Conectados em M1 e M2

## 🔍 Detalhes do Código

### Eventos Bluetooth

```typescript
bluetooth.onBluetoothConnected()    // Mostra 😊 quando conecta
bluetooth.onBluetoothDisconnected() // Mostra 😢 quando desconecta
bluetooth.onUartDataReceived()      // Recebe comandos
```

### Controle dos Motores

```typescript
nezhaV2.comboStart(leftSpeed, rightSpeed)
```
- Controla dois motores simultaneamente
- Velocidade: -100 (máximo ré) a 100 (máximo frente)

### Inicialização

```typescript
nezhaV2.setComboMotor(M1, M2)  // Define quais portas usar
bluetooth.startUartService()    // Inicia serviço Bluetooth UART
```

## 🎨 Indicadores LED

- **Conectando**: Animação de losangos
- **Aguardando**: Ponto central
- **Conectado**: 😊 (Happy)
- **Desconectado**: 😢 (Sad)

## 💡 Personalizações

### Inverter Direção dos Motores

Se o robô andar para trás quando deveria ir para frente:

```typescript
// Inverter um ou ambos os motores
leftSpeed = -leftSpeed   // Inverte esquerda
rightSpeed = -rightSpeed // Inverte direita
```

### Ajustar Sensibilidade

```typescript
// Reduzir velocidade máxima (ex: 80% ao invés de 100%)
leftSpeed = Math.constrain(leftSpeed * 0.8, -100, 100)
rightSpeed = Math.constrain(rightSpeed * 0.8, -100, 100)
```

### Usar Comando Rotate

Atualmente o `rotate:X,Y` é capturado mas não usado. Para implementar:

```typescript
function controlWheels(x: number, y: number) {
    // Usar rotateX para rotação no próprio eixo
    if (y == 0 && rotateX != 0) {
        leftSpeed = rotateX
        rightSpeed = -rotateX  // Inversão para girar
    } else {
        // Lógica normal de movimento...
    }
}
```

## 📚 Recursos

- [MakeCode Editor](https://makecode.microbit.org)
- [Documentação micro:bit](https://microbit.org/get-started/user-guide/overview/)
- [Nezha V2 Guide](https://www.elecfreaks.com/nezha-v2)
- [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)

## 🔗 Compatibilidade

- ✅ micro:bit v1.5
- ✅ micro:bit v2
- ✅ Nezha V2 (Planet X)
- ⚠️ Outras placas controladoras podem precisar de código diferente

---

**Desenvolvido para uso com**: [Microbit BLE Controller](https://soware.com.br/apps/microbit-controller)
