const mapVals = (val, in_min, in_max, out_min, out_max) => {
  return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

let eyesTimeOut;

export const moveEyesOnClick = () => {
  document.addEventListener("click", event => {
    let eyes = document.querySelectorAll("[data-name='eyes']");

    for (let eye of eyes) {
      const rect = eye.getBoundingClientRect();
      let centerX = rect.left + (rect.right - rect.left) / 2;
      let centerY = rect.top + (rect.bottom - rect.top) / 2;
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      const minPos = -2;
      const maxPos = 2;
      const moveX = mapVals(
        mouseX - centerX,
        -(ww - centerX),
        ww - centerX,
        minPos,
        maxPos
      );
      const moveY = mapVals(
        mouseY - centerY,
        -centerY,
        wh - centerY,
        minPos,
        maxPos
      );
      eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    eyesTimeOut && clearTimeout(eyesTimeOut);
    eyesTimeOut = setTimeout(() => {
      for (let eye of eyes) {
        eye.style.transform = `translate(0px, 0px)`;
      }
    }, 1200);
  });
};
