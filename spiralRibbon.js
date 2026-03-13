import * as THREE from 'three';

let hueOffset = 0;

export function createSpiralRibbon(scene) {
    const points = [];
    const totalPoints = 300;
    const startRadius = 450;
    const endRadius = 30;
    const startY = -400;
    const endY = -50;
    const turns = 6;

    for (let i = 0; i <= totalPoints; i++) {
        const t = i / totalPoints;
        const radius = startRadius * (1 - t) + endRadius * t;
        const angle = t * Math.PI * 2 * turns;
        const y = startY * (1 - t) + endY * t;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 300, 15, 8, false);

    const canvas = document.createElement('canvas');
    canvas.width = 4096;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const text = 'love love love Forever Love love love love loveyou ';
    ctx.font = '600 80px "Arial Rounded MT Bold", "Arial", "Helvetica Neue", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textWidth = ctx.measureText(text).width;
    const repeatCount = Math.ceil(canvas.width / textWidth) + 1;

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(turns, 1);

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.04,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const tube = new THREE.Mesh(tubeGeo, material);
    tube.name = 'spiralRibbon';
    tube.userData = {
        curve: curve,
        material: material,
        texture: texture,
        canvas: canvas,
        ctx: ctx,
        text: text,
        textWidth: textWidth,
        repeatCount: repeatCount
    };

    scene.add(tube);

    return tube;
}

export function updateSpiralRibbon(tube, camera) {
    if (!tube || !camera) return;

    // 更新透明度
    const cameraDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    const maxDistance = 500;
    const minDistance = 50;

    let opacity = 0;
    if (cameraDistance <= minDistance) {
        opacity = 1;
    } else if (cameraDistance >= maxDistance) {
        opacity = 0;
    } else {
        const progress = (maxDistance - cameraDistance) / (maxDistance - minDistance);
        opacity = Math.max(0, Math.min(1, progress));
    }

    tube.material.opacity = opacity * 0.04;

    // 纹理偏移实现文字流动（减慢速度）
    if (tube.userData.texture) {
        tube.userData.texture.offset.x += 0.0005;
    }

    // 整体旋转（减慢速度）
    tube.rotation.y += 0.0003;

    // 动态颜色变化
    if (tube.userData.canvas && tube.userData.ctx) {
        updateCanvasTexture(tube);
    }
}

function updateCanvasTexture(tube) {
    const canvas = tube.userData.canvas;
    const ctx = tube.userData.ctx;
    const text = tube.userData.text;
    const textWidth = tube.userData.textWidth;
    const repeatCount = tube.userData.repeatCount;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 创建深蓝色渐变（小范围渐变）
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    for (let i = 0; i <= 6; i++) {
        const hue = (hueOffset + i * 5 + 215) % 360; // 215-220范围，极小范围渐变
        gradient.addColorStop(i / 6, `hsla(${hue}, 60%, 50%, 0.6)`);
    }

    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(50, 100, 200, 0.4)';
    ctx.shadowBlur = 10;

    for (let i = 0; i < repeatCount; i++) {
        ctx.fillText(text, i * textWidth + textWidth / 2, canvas.height / 2);
    }

    tube.userData.texture.needsUpdate = true;
    hueOffset += 0.5;
}
