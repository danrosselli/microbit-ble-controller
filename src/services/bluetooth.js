const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let uBitDevice;
let rxCharacteristic;
let queue = Promise.resolve();

// Callback para mudanças de conexão
let onConnectionChange = null;

export function setConnectionChangeCallback(callback) {
  onConnectionChange = callback;
}

// Conectar ao Micro:bit
export async function connectToMicrobit() {
  try {
    console.log("Requesting Bluetooth Device...");

    uBitDevice = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "BBC micro:bit" }],
      optionalServices: [UART_SERVICE_UUID]
    });

    uBitDevice.addEventListener('gattserverdisconnected', onDisconnected);

    console.log("Connecting to GATT Server...");
    const server = await uBitDevice.gatt.connect();

    console.log("Getting Service...");
    const service = await server.getPrimaryService(UART_SERVICE_UUID);

    console.log("Getting Characteristics...");
    const txCharacteristic = await service.getCharacteristic(
      UART_TX_CHARACTERISTIC_UUID
    );

    txCharacteristic.startNotifications();
    txCharacteristic.addEventListener(
      "characteristicvaluechanged",
      onTxCharacteristicValueChanged
    );

    rxCharacteristic = await service.getCharacteristic(
      UART_RX_CHARACTERISTIC_UUID
    );

    console.log("Conectado ao Micro:bit!");

    // Notificar mudança de conexão
    if (onConnectionChange) {
      onConnectionChange(true);
    }

    return true;
  } catch (error) {
    console.error("Erro ao conectar:", error);
    return false;
  }
}

// Desconectar
export function disconnect() {
  if (!uBitDevice) {
    return;
  }

  if (uBitDevice.gatt.connected) {
    uBitDevice.gatt.disconnect();
    console.log("Disconnected");
  }
}

// Enviar comando via UART
export async function sendUART(command) {
  if (!rxCharacteristic) {
    console.warn("Micro:bit não conectado");
    return;
  }

  const encoder = new TextEncoder();
  const data = command + "\n";

  queueGattOperation(() =>
    rxCharacteristic.writeValue(encoder.encode(data))
      .then(() => console.log("Enviado:", command))
      .catch(error => console.error('Erro ao enviar dados:', error))
  );
}

// Fila para operações GATT
function queueGattOperation(operation) {
  queue = queue.then(operation, operation);
  return queue;
}

// Receber dados do Micro:bit
function onTxCharacteristicValueChanged(event) {
  let receivedData = [];
  for (let i = 0; i < event.target.value.byteLength; i++) {
    receivedData[i] = event.target.value.getUint8(i);
  }

  const receivedString = String.fromCharCode.apply(null, receivedData);
  console.log("Recebido:", receivedString);

  if (receivedString === "S") {
    console.log("Shaken!");
  }
}

// Evento de desconexão
function onDisconnected(event) {
  const device = event.target;
  console.log(`Device ${device.name} is disconnected.`);

  // Notificar mudança de conexão
  if (onConnectionChange) {
    onConnectionChange(false);
  }
}

// Verificar se está conectado
export function isConnected() {
  return uBitDevice && uBitDevice.gatt.connected;
}
