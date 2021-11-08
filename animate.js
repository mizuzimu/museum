var scene = new THREE.Scene();
var canvasWidth = window.innerWidth
var canvasHeight = window.innerHeight/2
var camera = new THREE.PerspectiveCamera( 45, canvasWidth/canvasHeight);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( canvasWidth, canvasHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );

//debug cube
/*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/

scene.add(new THREE.AmbientLight( 0xffffff ))

camera.lookAt(0,0,0)
var cameraDistance = 25
camera.position.z = cameraDistance

var angle = 0
var animate = function () {
	requestAnimationFrame( animate );

  if(document.getElementById("animate").checked){
    angle += 0.02
    camera.position.z = cameraDistance * Math.cos(angle)
    camera.position.x = cameraDistance * Math.sin(angle)
    camera.lookAt(0,0,0)   

	  renderer.render( scene, camera );
  }

  resizeRendererToDisplaySize(renderer)
};

const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load('models/scissors.gltf', 
function (gltf) {

  gltf.scene.scale.set(100,100,100)

  model = gltf.scene
  scene.add(model)

  //center model
  const box = new THREE.Box3().setFromObject( gltf.scene );
  const center = box.getCenter( new THREE.Vector3() );

  model.position.x += ( model.position.x - center.x );
  model.position.y += ( model.position.y - center.y );
  model.position.z += ( model.position.z - center.z );

  console.log("hi")
  animate();

},
// called while loading is progressing
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {
    console.log(error)
    console.log( 'An error happened' );

})

//dont mess up when resizing window
//https://threejsfundamentals.org/threejs/lessons/threejs-responsive.html
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}