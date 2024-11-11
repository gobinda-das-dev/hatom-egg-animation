const $ = (e, p = document) => p.querySelector(e);
const $$ = (e, p = document) => p.querySelectorAll(e);

const container = $('.animate-container');
const animate = $('.animate');
const row = 13;
const col = 10;
const pos = [];

for(let i = 0; i < row; i++) {
   for(let j = 0; j < col; j++) {
      pos.push([j, i]);
   }
}


let times = 0;
const x = gsap.quickSetter(animate, 'x', 'px');
const y = gsap.quickSetter(animate, 'y', 'px');
const tick = gsap.ticker.add(() => {
   x(-pos[times][0] * 100);
   y(-pos[times][1] * 120);
   
   times++;
   if(times === pos.length) {
      gsap.ticker.remove(tick);
      
      const progress = { value: 1 };
      const dff = 1 / (col * row);
      const gui = new dat.GUI();
      gui.add(progress, 'value', 0, 1, dff).onChange((i) => {
         let crrFrame = Math.floor(i / dff);
         crrFrame = Math.min(crrFrame, 1/dff - 1);
         x(-pos[crrFrame][0] * 100);
         y(-pos[crrFrame][1] * 120);
      });


      const toggle = { value: true };
      gui.add(toggle, 'value').onChange((v) => {
         gsap.set(container, { overflow: v ? 'hidden' : 'visible' });
      });
   }
});