// 创建点击效果元素
function createClickEffect(x, y, className) {
  const effect = document.createElement('div');
  effect.className = className;
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  
  // 特殊处理碎片效果
  if (className === 'shatter-effect') {
    createShatterParticles(effect, x, y);
  }
  
  document.body.appendChild(effect);

  // 创建多重效果
  if (Math.random() > 0.7) { // 降低多重效果概率到30%
    setTimeout(() => {
      const offset = 20; // 减小偏移范围
      const extraX = x + (Math.random() * offset * 2 - offset);
      const extraY = y + (Math.random() * offset * 2 - offset);
      const extraEffect = document.createElement('div');
      extraEffect.className = getRandomEffect();
      extraEffect.style.left = `${extraX}px`;
      extraEffect.style.top = `${extraY}px`;
      document.body.appendChild(extraEffect);
      
      extraEffect.addEventListener('animationend', () => {
        extraEffect.remove();
      });
    }, 50); // 减少延迟时间
  }

  // 动画结束后移除元素
  effect.addEventListener('animationend', () => {
    effect.remove();
  });
}

// 创建碎片粒子
function createShatterParticles(container, x, y) {
  const numParticles = Math.floor(Math.random() * 4) + 4; // 4-7个粒子
  
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'shatter-particle';
    
    // 随机设置粒子的运动方向和旋转
    const angle = (Math.PI * 2 * i) / numParticles;
    const distance = 30 + Math.random() * 20; // 30-50px
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rotation = Math.random() * 360 - 180; // -180到180度
    
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.setProperty('--rot', `${rotation}deg`);
    
    container.appendChild(particle);
  }
}

// 随机选择一个效果
function getRandomEffect() {
  const effects = [
    'click-effect',
    'ripple-effect',
    'lightning-effect',
    'explosion-effect',
    'flame-effect'
  ];
  
  // 简化的权重系统
  const weights = {
    'click-effect': 1.5,
    'ripple-effect': 1.2,
    'lightning-effect': 1,
    'explosion-effect': 1,
    'flame-effect': 1
  };
  
  let totalWeight = 0;
  for (const weight of Object.values(weights)) {
    totalWeight += weight;
  }
  
  let random = Math.random() * totalWeight;
  for (const [effect, weight] of Object.entries(weights)) {
    random -= weight;
    if (random <= 0) {
      return effect;
    }
  }
  
  return effects[0];
}

// 创建连锁效果
function createChainEffect(x, y) {
  const numEffects = Math.floor(Math.random() * 2) + 2; // 2-3个效果
  const radius = 50; // 减小半径
  
  for (let i = 0; i < numEffects; i++) {
    setTimeout(() => {
      const angle = (Math.PI * 2 * i) / numEffects;
      const effectX = x + Math.cos(angle) * radius;
      const effectY = y + Math.sin(angle) * radius;
      createClickEffect(effectX, effectY, getRandomEffect());
    }, i * 50); // 减少间隔时间
  }
}

// 添加点击事件监听器
let lastClickTime = 0;
const CLICK_DELAY = 100; // 限制点击频率

// 确保代码只在浏览器环境中运行
if (typeof window !== 'undefined') {
  document.addEventListener('click', (event) => {
    const now = Date.now();
    if (now - lastClickTime < CLICK_DELAY) {
      return; // 忽略过于频繁的点击
    }
    lastClickTime = now;

    const mainEffect = getRandomEffect();
    createClickEffect(event.clientX, event.clientY, mainEffect);
    
    // 降低连锁效果概率到20%
    if (Math.random() < 0.2) {
      setTimeout(() => {
        createChainEffect(event.clientX, event.clientY);
      }, 100);
    }
  });
}

export default {}; 