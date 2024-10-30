//Import
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

//NOTE creando renders
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



//NOTA carga de texturas y listas de planetas y deteccion de click
const textureLoader = new THREE.TextureLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const nuevos=[]
const nuevos2=[]
//////////////////////////////////////

//////////////////////////////////////
//NOTE import all texture
const starTexture = textureLoader.load("./image/stars.jpg");
const sunTexture = textureLoader.load("./image/sun.jpg");
const mercuryTexture = textureLoader.load("./image/mercury.jpg");
const venusTexture = textureLoader.load("./image/venus.jpg");
const earthTexture = textureLoader.load("./image/earth.jpg");
const marsTexture = textureLoader.load("./image/mars.jpg");
const jupiterTexture = textureLoader.load("./image/jupiter.jpg");
const saturnTexture = textureLoader.load("./image/saturn.jpg");
const uranusTexture = textureLoader.load("./image/uranus.jpg");
const neptuneTexture = textureLoader.load("./image/neptune.jpg");
const plutoTexture = textureLoader.load("./image/pluto.jpg");
const saturnRingTexture = textureLoader.load("./image/saturn_ring.png");
const uranusRingTexture = textureLoader.load("./image/uranus_ring.png");

//NOTA creando escena
const scene = new THREE.Scene();

//NOTE pantalla bg
const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.load([
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
]);
scene.background = cubeTexture;


//NOTA perpectiva de la camara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-50, 90, 150);

//NOTA perpectiva de control
const orbit = new OrbitControls(camera, renderer.domElement);




const grid = new THREE.GridHelper(800, 800); // Tamaño de la cuadrícula y divisiones

grid.position.set(0, 0, 0.05); // Ajustar la posición para que esté sobre el plano
grid.visible = false; 
scene.add(grid);





//NOTA Creacion del sol
const sungeo = new THREE.SphereGeometry(15, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sungeo, sunMaterial);
scene.add(sun);

//NOTA - Luz del sol (punto de luz)
const sunLight = new THREE.PointLight(0xffffff, 4, 300);
scene.add(sunLight);

//NOTA - luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

//NOTA Linea de orbita de los planetas
const path_of_planets = [];
function createLineLoopWithMesh(radius, color, width) {
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: width,
  });
  const geometry = new THREE.BufferGeometry();
  const lineLoopPoints = [];

  // Calculate punto cirucular
  const numSegments = 100; // numero de segmentos
  for (let i = 0; i <= numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    lineLoopPoints.push(x, 0, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lineLoopPoints, 3)
  );
  const lineLoop = new THREE.LineLoop(geometry, material);
  scene.add(lineLoop);
  path_of_planets.push(lineLoop);
}

//NOTA: creacion de planetas menos el planeta a observar
const genratePlanet = (size, planetTexture, x, ring) => {
  const planetGeometry = new THREE.SphereGeometry(size, 50, 50);
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: planetTexture,
  });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  const planetObj = new THREE.Object3D();
  planet.position.set(x, 0, 0);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: ring.ringmat,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    planetObj.add(ringMesh);
    ringMesh.position.set(x, 0, 0);
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(planetObj);

  planetObj.add(planet);
  createLineLoopWithMesh(x, 0xffffff, 3);
  return {
    planetObj: planetObj,
    planet: planet,
  };
};

//creacion del planeta a observar
const createPlanetWithCoordinates = (size, planetTexture, x, ring) => {
  const planetGeometry = new THREE.SphereGeometry(size, 50, 50);
  const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture });
  
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  const planetObj = new THREE.Object3D();
  planet.position.set(x, 0, 0);
  
  // Añadir el planeta al objeto
  planetObj.add(planet);
  
  // Añadir anillo si existe
  if (ring) {
    const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      map: ring.ringmat,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(x, 0, 0);
    ringMesh.rotation.x = -0.5 * Math.PI; // Rotar el anillo
    planetObj.add(ringMesh);
  }

  scene.add(planetObj);
  createLineLoopWithMesh(x, 0xffffff, 3);
  // Devuelve el objeto del planeta y las coordenadas
  return {
    planetObj: planetObj,
    position: planet.position,
  };
};



//lista de los planetas predefinidos

const planets = [
  {
    ...genratePlanet(3.2, mercuryTexture, 28),
    rotaing_speed_around_sun: 0.004,
    self_rotation_speed: 0.004,
  },
  {
    ...genratePlanet(5.8, venusTexture, 44),
    rotaing_speed_around_sun: 0.015,
    self_rotation_speed: 0.002,
  },
   
  
  {
    ...genratePlanet(4, marsTexture, 78),
    rotaing_speed_around_sun: 0.008,
    self_rotation_speed: 0.018,
  },
  {
    ...genratePlanet(12, jupiterTexture, 100),
    rotaing_speed_around_sun: 0.002,
    self_rotation_speed: 0.04,
  },
  {
    ...genratePlanet(10, saturnTexture, 138, {
      innerRadius: 10,
      outerRadius: 20,
      ringmat: saturnRingTexture,
    }),
    rotaing_speed_around_sun: 0.0009,
    self_rotation_speed: 0.038,
  },
  {
    ...genratePlanet(7, uranusTexture, 176, {
      innerRadius: 7,
      outerRadius: 12,
      ringmat: uranusRingTexture,
    }),
    rotaing_speed_around_sun: 0.0004,
    self_rotation_speed: 0.03,
  },
  {
    ...genratePlanet(7, neptuneTexture, 200),
    rotaing_speed_around_sun: 0.0005,
    self_rotation_speed: 0.032,
  },
  {
    ...genratePlanet(2.8, plutoTexture, 216),
    rotaing_speed_around_sun: 0.0007,
    self_rotation_speed: 0.008,
  },
];

//////////////////////////////////////

//////////////////////////////////////
//NOTE - GUI options
var GUI = dat.gui.GUI;
const gui = new GUI();
const options = {
  "Iluminacion Realista": true,
  "Mostrar Camino": true,
  speed: 1,
  "Camara Subjetiva": false, // Nueva opción para el modo de cámara subjetiva
};
gui.add(options, "Iluminacion Realista").onChange((e) => {
  ambientLight.intensity = e ? 0 : 0.5;
});
gui.add(options, "Mostrar Camino").onChange((e) => {
  path_of_planets.forEach((dpath) => {
    dpath.visible = e;
  });
});
const maxSpeed = new URL(window.location.href).searchParams.get("ms")*1
gui.add(options, "speed", 0, maxSpeed?maxSpeed:20);
gui.add(options, "Camara Subjetiva").onChange((isSubjective) => {
  console.log("Camara Subjetiva:", isSubjective);
   if (isSubjective) {
    // Activa el seguimiento de la cámara al planeta
    followPlanet=2
  } else {
    // Restaura la cámara a su posición y orientación original
      camera.position.x = -50;
      camera.position.y = 90;
      camera.position.z = 150;
      followPlanet=null
  }
});

let earthAngle = 0; // Ángulo inicial de la órbita

const earthOrbitRadius = 62; // Radio de la órbita
const earthPlanet = createPlanetWithCoordinates(6, earthTexture,earthOrbitRadius);

console.log('Nuevo planeta:', earthPlanet);

nuevos2.push({
    planetObj: earthPlanet.planetObj,
    position: earthPlanet.position,
    rotaing_speed_around_sun: 0.01,
    self_rotation_speed: 0.02,
});



//NOTA- funcion de animacion
function animate(time) {
  sun.rotateY(options.speed * 0.004);
  planets.forEach(
    ({ planetObj, planet, rotaing_speed_around_sun, self_rotation_speed }) => {
      planetObj.rotateY(options.speed * rotaing_speed_around_sun);
      planet.rotateY(options.speed * self_rotation_speed);
    }
  );
  
  nuevos.forEach(
    ({ planetObj, planet, rotaing_speed_around_sun, self_rotation_speed }) => {
      planetObj.rotateY(options.speed * rotaing_speed_around_sun);
      planet.rotateY(options.speed * self_rotation_speed);
    }
  );
  
  const planet = nuevos2[0]; // Obtener el único planeta
  
  earthAngle -= planet.rotaing_speed_around_sun; // Incrementar el ángulo
  planet.position.x = earthOrbitRadius * Math.cos(earthAngle);
  planet.position.z = earthOrbitRadius * Math.sin(earthAngle);
  
  //si el usuario marco para perseguir planeta
  
  if(followPlanet=== 2){
    
    camera.position.x = planet.position.x + 5; // Desplazamiento opcional
    camera.position.y = 20; // Mantener la altura de la cámara
    camera.position.z = planet.position.z + 30; // Desplazamiento opcional
    
  }

    
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);



//NOTA - rediseñar vista
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


window.addEventListener("click", (event) => {
  
  
  
  console.log('Clic en: ', event.clientX, event.clientY);
  
  
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  console.log('Coordenadas normalizadas:', mouse.x, mouse.y);
  
  // Usar raycaster para detectar la posición en la cuadrícula
  raycaster.setFromCamera(mouse, camera);
  
  // Intersección con la cuadrícula
  const intersects = raycaster.intersectObject(grid);
  
  
  if (intersects.length > 0) {
    const intersectPoint = intersects[0].point;
    const distanceFromCamera = intersects[0].distance;
    
    let userSize = parseFloat(prompt("Ingrese el tamaño del planeta en formato decimal (ej: 5.5):", "2"));
    
    
    
    const userTextureChoice = prompt(
            "Seleccione  la textura del planeta ingresando el número correspondiente:\n" +
            "1 - Mercurio\n" +
            "2 - Venus\n" +
            "3 - Tierra\n" +
            "4 - Marte\n" +
            "5 - Júpiter\n" +
            "6 - Saturno\n" +
            "7 - Urano\n" +
            "8 - Neptuno\n" +
            "9 - Plutón", "1"
        );
    
    let chosenTexture;
        switch (userTextureChoice) {
            case "1":
                chosenTexture = mercuryTexture;
                break;
            case "2":
                chosenTexture = venusTexture;
                break;
            case "3":
                chosenTexture = earthTexture;
                break;
            case "4":
                chosenTexture = marsTexture;
                break;
            case "5":
                chosenTexture = jupiterTexture;
                break;
            case "6":
                chosenTexture = saturnTexture;
                break;
            case "7":
                chosenTexture = uranusTexture;
                break;
            case "8":
                chosenTexture = neptuneTexture;
                break;
            case "9":
                chosenTexture = plutoTexture;
                break;
            default:
                alert("Selección inválida. Se usará la textura de Mercurio por defecto.");
                chosenTexture = mercuryTexture;
        }
    
    // Crear un nuevo planeta y agregarlo a la lista de nuevos
    const newPlanet = {
      ...genratePlanet(userSize, chosenTexture, intersectPoint.length()), // Tamaño, textura y posición
      rotaing_speed_around_sun: 0.001, // Velocidad de rotación alrededor del sol
      self_rotation_speed: 0.008, // Velocidad de rotación sobre sí mismo
    };
    
    nuevos.push(newPlanet); // Agregar a la lista de nuevos planetas
  
  }
  
});


let followPlanet = null; // Variable para almacenar el planeta a seguir


