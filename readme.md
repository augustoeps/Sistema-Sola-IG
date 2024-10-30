# Proyecto Sistema Solar 3D 🌌

Bienvenido a la simulación interactiva del Sistema Solar en 3D. Este proyecto permite la exploración y visualización del sistema solar, con opciones de seguimiento de planetas, ajuste de propiedades de los planetas y visualización personalizada. Desarrollado usando Three.js y con funcionalidades interactivas para una experiencia inmersiva.

## Visión 🚀

Crear una simulación educativa, intuitiva y visualmente atractiva del sistema solar para comprender mejor los movimientos de los planetas, su interacción con la luz y las diferentes perspectivas de visión.

## Misión 🌍

Ofrecer una herramienta interactiva que permita la exploración del sistema solar, fomentando el aprendizaje a través de la simulación de órbitas y la observación de los cuerpos celestes en su contexto.

## Características 🔍

- **Visualización en 3D**: El sistema solar representado con texturas de planetas realistas y órbitas visibles para comprender sus trayectorias.
- **Cámara Interactiva**: Posibilidad de cambiar a modo de cámara subjetiva, que sigue un planeta en su órbita para una vista detallada y dinámica.
- **Personalización del Planeta**: Ajuste del tamaño, textura y posición de los planetas al seleccionarlos.
- **Iluminación Realista**: Activación o desactivación de una opción de iluminación realista que afecta solo el lado del planeta visible desde el sol.
- **Mostrar/Ocultar Órbitas**: Visualización opcional de las órbitas de los planetas.
  
## Funcionalidades Principales 🛠️

### Función de Creación de Planetas
- `genratePlanet(size, planetTexture, x, ring)`: Genera un planeta con un tamaño específico, textura, posición en el eje X y, opcionalmente, un anillo.
- `createPlanetWithCoordinates(size, planetTexture, distance)`: Permite crear un planeta con propiedades específicas, accesible para obtener coordenadas y seguimiento con la cámara.

### Animación y Órbitas
- **Animación de Órbitas**: Los planetas orbitan alrededor del sol mediante el ajuste de su posición en cada cuadro.
- **Velocidad de Rotación**: Cada planeta tiene propiedades de `rotaing_speed_around_sun` y `self_rotation_speed` para simular su velocidad de rotación y órbita.

### Cámara Interactiva
- **Cámara Subjetiva**: La cámara puede seguir a un planeta específico cuando se activa el modo de cámara subjetiva (opción en la interfaz).
- **Restablecimiento de Cámara**: Al desactivar la cámara subjetiva, esta vuelve a su posición original para una vista general.

### Controles de Iluminación y Visualización de Órbitas
- **Iluminación Realista**: Opción de activar una luz ambiental que solo afecta el lado del planeta visible desde el sol.
- **Mostrar/Ocultar Caminos**: Controla la visibilidad de las órbitas de los planetas.


