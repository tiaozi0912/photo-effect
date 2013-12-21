var count = 16,
    table = [];
for ( var i = 0; i < count; i++ ) {
  var base = 'images/Christmas/Tang/';
  table.push( base + (i+1).toString() + '.jpg');
}

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.z = 1500;

  scene = new THREE.Scene();

  // table

  for ( var i = 0; i < table.length; i ++ ) {

    var element = document.createElement('div'),
        img = document.createElement('img');

    img.src = table[i];

    element.appendChild(img);

    var object = new THREE.CSS3DObject( element );
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add( object );

    objects.push( object );

    //

    var object = new THREE.Object3D();
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;

    targets.table.push( object );

  }

  renderer = new THREE.CSS3DRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';
  document.getElementById( 'container' ).appendChild( renderer.domElement );

  //

  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 0.5;
  controls.addEventListener( 'change', render );

  var button = document.getElementById( 'table' );
  button.addEventListener( 'click', function ( event ) {

    transform( targets.table, 2000 );

  }, false );

  var button = document.getElementById( 'sphere' );
  button.addEventListener( 'click', function ( event ) {

    transform( targets.sphere, 2000 );

  }, false );

  var button = document.getElementById( 'helix' );
  button.addEventListener( 'click', function ( event ) {

    transform( targets.helix, 2000 );

  }, false );

  var button = document.getElementById( 'grid' );
  button.addEventListener( 'click', function ( event ) {

    transform( targets.grid, 2000 );

  }, false );

  transform( targets.table, 5000 );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function transform( targets, duration ) {

  TWEEN.removeAll();

  for ( var i = 0; i < objects.length; i ++ ) {

    var object = objects[ i ];
    var target = targets[ i ];

    new TWEEN.Tween( object.position )
      .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

    new TWEEN.Tween( object.rotation )
      .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

  }

  new TWEEN.Tween( this )
    .to( {}, duration * 2 )
    .onUpdate( render )
    .start();

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function animate() {

  requestAnimationFrame( animate );

  TWEEN.update();
  controls.update();

}

function render() {

  renderer.render( scene, camera );

}