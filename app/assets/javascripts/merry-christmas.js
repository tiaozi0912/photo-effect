(function() {
  var app = angular.module('app', []);
  app.controller('ctrl', ['$scope', function($scope) {
    var count = 28,
      table = [];
    for ( var i = 0; i < count; i++ ) {
      var base = 'images/Christmas/Tang/';
      table.push( base + (i+1).toString() + '.jpg');
    }

    var camera, scene, renderer;
    var controls;

    var objects = [];
    var targets = { table: [], sphere: [], helix: [], grid: [] };

    function init() {
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
      camera.position.z = 1500;

      scene = new THREE.Scene();

      // table
      var initDuration = 5000,
          cols = Math.ceil(Math.sqrt(count)),
          bound = 1500,
          ratio = 0.7,
          offsetY = 250,
          gutterX = bound * 2 / (cols - 1),
          gutterY = ratio * bound * 2 / (cols - 1);

      for ( var i = 0; i < table.length; i ++ ) {

        var element = document.createElement('div'),
            img = document.createElement('img'),
            row = parseInt(i / cols),
            col = i - row * cols;
        
        element.className = 'img-container';
        element.setAttribute('id', i);
        img.src = table[i];

        element.appendChild(img);

        var object = new THREE.CSS3DObject( element );
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;

        scene.add( object );

        objects.push( object );

        //set the target
        var tObject = new THREE.Object3D();
        tObject.position.x = gutterX * col - bound;
        tObject.position.y = gutterY * row - ratio * bound + offsetY;
        tObject.position.z = -500;

        targets.table.push( tObject );

      }

      renderer = new THREE.CSS3DRenderer();

      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.domElement.style.position = 'absolute';
      document.getElementById( 'container' ).appendChild( renderer.domElement );

      //

      controls = new THREE.TrackballControls( camera, renderer.domElement );
      controls.rotateSpeed = 0.5;
      controls.addEventListener( 'change', render );

      transform( targets.table, initDuration );
      //

      window.addEventListener( 'resize', onWindowResize, false );

    }

    function rerender(duration) {
      new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();
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

      rerender(duration);
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

    function float(duration) {
      setInterval(function() {
        _.each(objects, function(obj) {
          var target = {
            x: obj.position.x + Math.random() * 40 - 20,
            y: obj.position.y + Math.random() * 40 - 20,
            z: obj.position.z
          };
          new TWEEN.Tween( obj.position )
            .to( { x: target.x, y: target.y, z: target.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();
        });
        rerender(duration);
      }, duration);
    }

    function setLetterPosition($letter) {
      var mY = 0.33 * ($(window).height() - $letter.outerHeight()),
          mX = ($(window).width() - $letter.outerWidth()) / 2;

      $letter.css({
        top: mY,
        left: mX
      });
    }

    setLetterPosition($('.letter'));

    //listen to hover the image container
    var originPosition, selected;
    $('#container').on('click', '.img-container', function(e) {
      var index = parseInt($(e.currentTarget).attr('id')),
          duration = 400, clear;
      
      //dismiss the current highlight image and return to the previous position
      if (selected) {
        new TWEEN.Tween( $scope.selectedObj.position )
          .to(originPosition, Math.random() * duration + duration )
          .easing( TWEEN.Easing.Exponential.InOut )
          .start();

        if ($scope.selectedObj.id === objects[index].id) {
          clear = true;
        }
      }
      
      //highlight the image and store the origin position
      if (!selected || $scope.selectedObj.id !== objects[index].id) {
        $scope.selectedObj = objects[index];
        selected = true;
        originPosition = {
          x: $scope.selectedObj.position.x,
          y: $scope.selectedObj.position.y,
          z: $scope.selectedObj.position.z
        };

        new TWEEN.Tween( $scope.selectedObj.position )
            .to( {x: 0, y: 0, z: 900}, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start(); 
      }

      rerender(duration);

      if (clear) {
        selected = false;
      }
    });

    $scope.sentences = [
      'Merry Christmas && Happy New Year !',
      'To me, you are perfect.',
      'And My wasted heart will love you',
      '1314 ~ '
    ]

    $scope.start = function() {
      $('.letter').fadeOut(400, function() {
        init();
        animate();
      });
    }

    $scope.changePosition = function(val, dimension) {
      var duration = 400,
          targetPosition = {
            x: $scope.selectedObj.position.x,
            y: $scope.selectedObj.position.y,
            z: $scope.selectedObj.position.z
          };

      targetPosition[dimension] = val;

      new TWEEN.Tween( $scope.selectedObj.position )
          .to( targetPosition, Math.random() * duration + duration )
          .easing( TWEEN.Easing.Exponential.InOut )
          .start();

      rerender(duration);
    }
  }]);
})()
