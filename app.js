const text = "WELCOME\nTO\nSPAM BOMBA";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += 
      text[i] === "\n" ? "<br>" : text[i];
    i++;
    setTimeout(type, 60);
  }
}
type();

setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  start3D();
}, 7000);

function start3D() {

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight, 0.1, 1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 🌍 Earth Texture
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load(
    "https://threejsfundamentals.org/threejs/resources/images/earth-day.jpg"
  );

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(2, 64, 64),
    new THREE.MeshStandardMaterial({ map: earthTexture })
  );
  scene.add(earth);

  // 💡 Light
  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  // 💣 Bomb
  const bomb = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  bomb.position.y = 5;
  scene.add(bomb);

  camera.position.z = 6;

  let exploded = false;

  function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.01;

    if (!exploded) {
      bomb.position.y -= 0.05;

      if (bomb.position.y <= 0) {
        exploded = true;
        explode(scene);
      }
    }

    renderer.render(scene, camera);
  }

  animate();
}

// 💥 Explosion Particles
function explode(scene) {

  document.getElementById("boomSound").play();

  const particles = [];

  for (let i = 0; i < 500; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xff5500 })
    );

    p.velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
      z: (Math.random() - 0.5) * 0.5,
    };

    scene.add(p);
    particles.push(p);
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);

    particles.forEach(p => {
      p.position.x += p.velocity.x;
      p.position.y += p.velocity.y;
      p.position.z += p.velocity.z;
    });
  }

  animateParticles();

  setTimeout(() => {
    document.getElementById("panel").classList.remove("hidden");
  }, 2000);
}

// 🖱️ Laser Cursor Effect
document.addEventListener("mousemove", e => {
  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.width = "5px";
  dot.style.height = "5px";
  dot.style.background = "red";
  dot.style.left = e.pageX + "px";
  dot.style.top = e.pageY + "px";
  document.body.appendChild(dot);

  setTimeout(() => dot.remove(), 200);
});
