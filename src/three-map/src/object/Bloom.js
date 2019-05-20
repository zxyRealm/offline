import World from '../scene/mapWorld'

class Bloom {
  constructor() {
    this.renderScene = new THREE.RenderPass(World.scene, World.camera)
  }

  get mixer() { return this.mixer }
  set mixer(val) { this.mixer = val }

  vertexShader() {
    return `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`
  }

  fragmentShader() {
    return `
    uniform sampler2D baseTexture;
    uniform sampler2D bloomTexture;
    uniform float iTime;
    varying vec2 vUv;
    vec4 getTexture( sampler2D texture ) {
      return mapTexelToLinear( texture2D( texture , vUv ) );
    }
    vec3 v3( float x, float y, float z ){
      return vec3( x, y, z );
    }
    vec3 h2rgb( float hue ){
      float h = abs(hue - floor(hue)) * 6.;
      vec3 c = vec3( 0., 0., 0. );
       
      int f = int(floor( h ));
        
      if(f == 0)c = v3(1., h, 0.);
      else if(f == 1)c = v3(2.-h, 1., 0.);
      else if(f == 2)c = v3(0., 1., h-2.);
      else if(f == 3)c = v3(0., 4.-h, 1.);
      else if(f == 4)c = v3(h-4., 0., 1.);
      else c = v3(1., 0., 6. - h);
      
      return c;
    }
    void main() {
      vec3 originColor = h2rgb( iTime / 10. );
      gl_FragColor = ( getTexture( baseTexture ) + vec4( 1.0 ) * getTexture( bloomTexture ) );
    }`
  }

  shining (pos) {
    let geometry = new THREE.SphereGeometry( 5, 64, 64 )
    let material = new THREE.MeshBasicMaterial( { color: '#EFEE00', side: THREE.DoubleSide } )
    let sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(pos.x, pos.y+10, pos.z)
    World.scene.add( sphere )
    sphere.name = 'shine'
    sphere.layers.enable(1)

    var scaleKF = new THREE.VectorKeyframeTrack( '.scale', [ 0, 0.5, 1, 1.5, 2], [ 0.7, 0.7, 0.7, 1.2, 1.2, 1.2, 0.8, 0.8, 0.8, 1.2, 1.2, 1.2, 0, 0, 0] );
    var clip = new THREE.AnimationClip( 'Action', 3, [ scaleKF ] )
    Bloom.mixer = new THREE.AnimationMixer( sphere );
    var clipAction = Bloom.mixer.clipAction( clip );
    // clipAction.setLoop( THREE.LoopOnce )
    // clipAction.play();

    // Bloom.mixer.addEventListener( 'finished', ( e ) => { 
    //   sphere.visible = false
    // });
  }

  removeEntity(object) {
    var selectedObject = World.scene.getObjectByName(object.name);
    World.scene.remove( selectedObject );
    // animate();
}

  setBloomPass () {
    let bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.1, 0.05)

    bloomPass.threshold = 0;
    bloomPass.strength = 5;
    bloomPass.radius = 1.2;

    // bloomPass.threshold = 0;
    // bloomPass.strength = 0.5;
    // bloomPass.radius = 0;

    this.bloomComposer = new THREE.EffectComposer(World.renderer);
    this.bloomComposer.renderTarget1.texture.format = THREE.RGBAFormat;
    this.bloomComposer.renderTarget2.texture.format = THREE.RGBAFormat;
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)
    this.bloomComposer.addPass( this.renderScene );
    this.bloomComposer.addPass( bloomPass );

    return this.bloomComposer
  }

  setFinalPass () {
    let finalPass = new THREE.ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          // iTime: World.time,
          baseTexture: {value: null},
          bloomTexture: {value: this.bloomComposer.renderTarget2.texture}
        },
        vertexShader: this.vertexShader(),
        fragmentShader: this.fragmentShader(),
        defines: {}
      }), 'baseTexture'
    );

    let finalComposer = new THREE.EffectComposer( World.renderer);
    finalComposer.renderTarget1.format = THREE.RGBAFormat;
    finalComposer.renderTarget2.format = THREE.RGBAFormat;
    finalComposer.setSize( window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio );
    finalComposer.addPass( this.renderScene );
    finalComposer.addPass( finalPass );
    finalComposer.needsSwap = true

    return finalComposer
  }


}
export default Bloom