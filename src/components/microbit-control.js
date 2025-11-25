import { html, define } from 'hybrids';
import { connectToMicrobit, sendUART } from '../services/bluetooth.js';

// Conectar ao Bluetooth
async function connectBluetooth(host) {
  const success = await connectToMicrobit();
  if (success) {
    host.connected = true;
    host.errorMessage = '';
  } else {
    host.errorMessage = 'Falha ao conectar. Verifique o Bluetooth.';
    setTimeout(() => { host.errorMessage = ''; }, 5000);
  }
}

// Enviar comando
function sendCommand(command) {
  console.log('Enviando comando:', command);
  sendUART(command);
}

// Calcular posição do joystick
function calculateJoystickPosition(event, joystickElement) {
  const rect = joystickElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let deltaX = event.clientX - centerX;
  let deltaY = event.clientY - centerY;

  // Limitar ao raio máximo (60px = metade de 120px)
  const maxRadius = 60;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (distance > maxRadius) {
    const angle = Math.atan2(deltaY, deltaX);
    deltaX = Math.cos(angle) * maxRadius;
    deltaY = Math.sin(angle) * maxRadius;
  }

  // Normalizar para -100 a 100
  const normalizedX = Math.round((deltaX / maxRadius) * 100);
  const normalizedY = Math.round((deltaY / maxRadius) * -100); // Invertido: cima = positivo

  return { x: normalizedX, y: normalizedY, pixelX: deltaX, pixelY: deltaY };
}

// Handler para iniciar arrasto do joystick
function handleJoystickStart(host, side, event) {
  event.preventDefault();
  const joystickKey = side === 'left' ? 'leftJoystick' : 'rightJoystick';
  host[joystickKey] = { ...host[joystickKey], active: true };

  // Capturar pointer
  event.target.setPointerCapture?.(event.pointerId);
}

// Handler para mover joystick
function handleJoystickMove(host, side, event) {
  const joystickKey = side === 'left' ? 'leftJoystick' : 'rightJoystick';

  if (!host[joystickKey].active) return;

  const joystickElement = event.currentTarget;
  const position = calculateJoystickPosition(event, joystickElement);

  host[joystickKey] = {
    ...host[joystickKey],
    x: position.x,
    y: position.y,
    pixelX: position.pixelX,
    pixelY: position.pixelY
  };

  // Comandos são enviados automaticamente pelo setInterval
}

// Handler para soltar joystick
function handleJoystickEnd(host, side, event) {
  const joystickKey = side === 'left' ? 'leftJoystick' : 'rightJoystick';

  host[joystickKey] = { x: 0, y: 0, pixelX: 0, pixelY: 0, active: false };

  // Comando de parada (0,0) será enviado automaticamente pelo setInterval

  if (event && event.pointerId != null) {
    event.target.releasePointerCapture?.(event.pointerId);
  }
}

export default define({
  tag: "microbit-control",

  connected: {
    value: false,
    connect: (host) => {
      // Iniciar envio periódico de comandos quando conectado
      const intervalId = setInterval(() => {
        if (host.connected) {
          // Enviar estado atual dos joysticks a cada 100ms
          const left = host.leftJoystick;
          const right = host.rightJoystick;

          sendCommand(`move:${left.x},${left.y}`);
          sendCommand(`rotate:${right.x},${right.y}`);
        }
      }, 100); // 100ms = 10 comandos por segundo

      // Cleanup: parar interval quando componente for destruído
      return () => clearInterval(intervalId);
    }
  },
  errorMessage: '',
  isPortrait: {
    value: window.innerHeight > window.innerWidth,
    connect: (host) => {
      const updateOrientation = () => {
        host.isPortrait = window.innerHeight > window.innerWidth;
      };
      window.addEventListener('resize', updateOrientation);
      return () => window.removeEventListener('resize', updateOrientation);
    }
  },
  leftJoystick: {
    value: { x: 0, y: 0, pixelX: 0, pixelY: 0, active: false }
  },
  rightJoystick: {
    value: { x: 0, y: 0, pixelX: 0, pixelY: 0, active: false }
  },

  render: ({ connected, errorMessage, isPortrait, leftJoystick, rightJoystick }) => html`
    <div style="
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: sans-serif;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden;
      touch-action: none;
      user-select: none;
    ">
      <!-- Botão de conexão -->
      <button 
        onclick="${connectBluetooth}"
        style="
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 15px 30px;
          background: ${connected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.2)'};
          border: 3px solid ${connected ? '#fff' : 'rgba(255, 255, 255, 0.3)'};
          border-radius: 30px;
          cursor: pointer;
          font-size: 16px;
          color: white;
          font-weight: bold;
          box-shadow: ${connected ? '0 0 20px rgba(102, 126, 234, 0.5)' : 'none'};
          z-index: 100;
        "
      >
        ${connected ? '🤖 Conectado' : '🔌 Conectar ao Micro:bit'}
      </button>

      <!-- Mensagem de erro -->
      ${errorMessage ? html`
        <div style="
          position: fixed;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(244, 67, 54, 0.9);
          color: white;
          padding: 15px 30px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 100;
        ">
          ${errorMessage}
        </div>
      ` : ''}

      <!-- Container dos Joysticks -->
      <div style="
        width: 100%;
        max-width: 800px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top:40px;
        gap: ${isPortrait ? '20px' : '60px'};
        padding: 0 ${isPortrait ? '20px' : '60px'};
      ">
        <!-- Joystick Esquerdo -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
          <div style="
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 1px;
            opacity: 0.9;
          ">
            MOVIMENTO
          </div>
          
          <!-- Base do Joystick -->
          <div 
            onpointerdown="${(host, e) => handleJoystickStart(host, 'left', e)}"
            onpointermove="${(host, e) => handleJoystickMove(host, 'left', e)}"
            onpointerup="${(host, e) => handleJoystickEnd(host, 'left', e)}"
            onpointercancel="${(host, e) => handleJoystickEnd(host, 'left', e)}"
            style="
              position: relative;
              width: 120px;
              height: 120px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.1);
              border: 3px solid rgba(255, 255, 255, 0.3);
              box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
              cursor: pointer;
              touch-action: none;
            "
          >
            <!-- Círculo Central Arrastável -->
            <div style="
              position: absolute;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
              border: 2px solid rgba(255, 255, 255, 0.8);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
              top: 50%;
              left: 50%;
              transform: translate(
                calc(-50% + ${leftJoystick.pixelX}px),
                calc(-50% + ${leftJoystick.pixelY}px)
              );
              transition: ${leftJoystick.active ? 'none' : 'transform 0.2s ease-out'};
              pointer-events: none;
            "></div>
          </div>
          
          <div style="font-size: 11px; opacity: 0.7; text-align: center;">
            X: ${leftJoystick.x} Y: ${leftJoystick.y}
          </div>
        </div>

        <!-- Joystick Direito -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
          <div style="
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 1px;
            opacity: 0.9;
          ">
            ROTAÇÃO
          </div>
          
          <!-- Base do Joystick -->
          <div 
            onpointerdown="${(host, e) => handleJoystickStart(host, 'right', e)}"
            onpointermove="${(host, e) => handleJoystickMove(host, 'right', e)}"
            onpointerup="${(host, e) => handleJoystickEnd(host, 'right', e)}"
            onpointercancel="${(host, e) => handleJoystickEnd(host, 'right', e)}"
            style="
              position: relative;
              width: 120px;
              height: 120px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.1);
              border: 3px solid rgba(255, 255, 255, 0.3);
              box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
              cursor: pointer;
              touch-action: none;
            "
          >
            <!-- Círculo Central Arrastável -->
            <div style="
              position: absolute;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
              border: 2px solid rgba(255, 255, 255, 0.8);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
              top: 50%;
              left: 50%;
              transform: translate(
                calc(-50% + ${rightJoystick.pixelX}px),
                calc(-50% + ${rightJoystick.pixelY}px)
              );
              transition: ${rightJoystick.active ? 'none' : 'transform 0.2s ease-out'};
              pointer-events: none;
            "></div>
          </div>
          
          <div style="font-size: 11px; opacity: 0.7; text-align: center;">
            X: ${rightJoystick.x} Y: ${rightJoystick.y}
          </div>
        </div>
      </div>
    </div>
  `
});
