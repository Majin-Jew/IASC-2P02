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
   aspectRatio: window.innerWidth / window.innerHeight 
}

/***********
 ** SCENE **
 ************/
 // Canvas
 const canvas = document.querySelector('.webgl')

 // Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('pink')

 // Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(2, 3, -5)

 // Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
 })
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

//scene.add(testSphere)

// Torus Knot
const geometry =new THREE.TorusKnotGeometry(2, 0.4)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
   color: new THREE.Color('white'),
   side: THREE.DoubleSide,
   wireframe: true
})
 const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5


 scene.add(plane)

/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {
   speed: 1,
   distance: 1,
   rotation: -0.5
}

//plane UI
const planefolder = ui.addFolder('Plane')

planefolder
      .add(planeMaterial, 'wireframe')
      .name("Toggle Wireframe")

// testSphere UI
const meshfolder = ui.addFolder('Torus Knot')

      meshfolder
      .add(uiObject, 'speed')
      .min(0.1)
      .max(10)
      .step(0.1)
      .name('Speed')

      meshfolder
      .add(uiObject, 'distance')
      .min(0.1)
      .max(10)
      .step(0.1)
      .name('Distance')

      meshfolder
      .add(uiObject, 'rotation')
      .min(-Math.PI)
      .max(Math.PI)
      .step(0.1)
      .name('Rotation')

 /********************
  ** Animation LOOP **
  ********************/ 
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate Sphere
    mesh.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance,
    mesh.position.z = Math.cos(elapsedTime * uiObject.rotation)

    // Update OrbitControls
    controls.update()
    
    //Renderer
    renderer.render(scene, camera)

    //Request next Frame
    window.requestAnimationFrame(animation)
}

animation()