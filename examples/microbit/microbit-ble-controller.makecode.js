function parseMoveCommand(command: string) {
  parts = command.split("move:")
  if (parts.length > 1) {
    moveData = parts[1].split(",")
    if (moveData.length >= 2) {
      moveX = parseInt(moveData[0])
      moveY = parseInt(moveData[1])
    }
  }
}
bluetooth.onBluetoothConnected(function () {
  basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
  basic.showIcon(IconNames.Sad)
})
function controlWheels(x: number, y: number) {
  // moveY: frente/trás (-100 a 100)
  // moveX: curva (-100 a 100)
  // negativo = esquerda (reduz velocidade da roda esquerda)
  // positivo = direita (reduz velocidade da roda direita)
  // Calcular velocidade base das rodas
  leftSpeed = y
  rightSpeed = y
  // Aplicar curva baseada no moveX
  if (x < 0) {
    // Curva para esquerda - reduz velocidade da roda esquerda
    // x é negativo, então subtrai
    leftSpeed = y + x
  } else if (x > 0) {
    // Curva para direita - reduz velocidade da roda direita
    rightSpeed = y - x
  }
  // Limitar velocidades entre -100 e 100
  leftSpeed = Math.constrain(leftSpeed, -100, 100)
  rightSpeed = Math.constrain(rightSpeed, -100, 100)
  // Enviar para os motores Nezha V2
  nezhaV2.comboStart(leftSpeed, rightSpeed)
}
function parseRotateCommand(command: string) {
  parts2 = command.split("rotate:")
  if (parts2.length > 1) {
    rotateData = parts2[1].split(",")
    rotateX = parseInt(rotateData[0])
    rotateY = parseInt(rotateData[1])
  }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
  data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
  processCommand(data)
})
function processCommand(command: string) {
  // Processar comando move
  if (command.includes("move:")) {
    parseMoveCommand(command)
  }
  // Processar comando rotate (apenas captura, não usa)
  if (command.includes("rotate:")) {
    parseRotateCommand(command)
  }
  controlWheels(moveX, moveY)
}
/**
 * Variáveis globais
 */
let data = ""
let rotateY = 0
let rotateX = 0
let rotateData: string[] = []
let parts2: string[] = []
let rightSpeed = 0
let leftSpeed = 0
let moveY = 0
let moveX = 0
let moveData: string[] = []
let parts: string[] = []
// Inicialização
nezhaV2.setComboMotor(nezhaV2.MotorPostion.M1, nezhaV2.MotorPostion.M2)
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
basic.showIcon(IconNames.Diamond)
basic.showIcon(IconNames.SmallSquare)
basic.showIcon(IconNames.SmallDiamond)
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
