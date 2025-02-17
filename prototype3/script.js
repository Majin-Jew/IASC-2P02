import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import * as dat from "lil-gui"

/************
 ** SETUP  **
 ************/
// Sizes
const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
   aspectRatio: window.innerWidth / window.innerHeight * 0.5
}


/***********
 ** SCENE **
 ************/
 // Canvas
 const canvas = document.querySelector('.webgl')

 // Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('black')

 // Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(10, 0, 5)

 // Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
 })
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(5, 5)
const caveMaterial = new THREE.MeshStandardMaterial({
   color: new THREE.Color('white'),
   side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects
const TorusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.4)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(TorusKnotGeometry, torusKnotMaterial)
torusKnot.position.set(6, 1, 0)
torusKnot.castShadow = true
scene.add(torusKnot)

/**
 * * LIGHTS **
 */
// Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
  //

  //scene.add(ambientLight)
// Directional Light
const directionallight = new THREE.DirectionalLight(
   new THREE.Color('white'),
   0.5
)
scene.add(directionallight)
directionallight.position.set(20, 4.1, 0)
directionallight.target = cave
directionallight.castShadow = true
directionallight.shadow.mapSize.width = 512
directionallight.shadow.mapSize.height = 512

// Directional Light Helper
const directionallightHelper = new THREE.DirectionalLightHelper(directionallight)
scene.add(directionallightHelper)
/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

const lightpositionFolder = ui.addFolder('Light Position')

lightpositionFolder
   .add(directionallight.position, 'y')
   .min(-10)
   .max(10)
   .step(0.1)
   .name('Y')

   lightpositionFolder
   .add(directionallight.position, 'z')
   .min(-10)
   .max(10)
   .step(0.1)
   .name('Z')



 /********************
  ** Animation LOOP **
  ********************/ 
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate objects
    torusKnot.rotation.y = elapsedTime

    // Updatee directionLightHelper
    directionallightHelper.update()

    // Update OrbitControls
      controls.update()
    
    //Renderer
    renderer.render(scene, camera)

    //Request next Frame
    window.requestAnimationFrame(animation)
}

animation()