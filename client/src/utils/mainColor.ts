function getMainColor(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r = 0, g = 0, b = 0, a = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) {
          // Transparent pixel, count it as white
          r += 255;
          g += 255;
          b += 255;
          a += 255;
        } else {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          a += data[i + 3];
        }
        count++;
      }
      const avgR = Math.round(r / count);
      const avgG = Math.round(g / count);
      const avgB = Math.round(b / count);
      const avgA = Math.round(a / count);
      const color = `rgba(${avgR}, ${avgG}, ${avgB}, ${avgA})`;
      resolve(color);
    };
    img.onerror = () => {
      resolve(getRandomGradient())
    };
    img.src = url;
  });
}

function getRandomGradient(): string {
  const colors = [
    `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
    `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
  ];
  return `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
}



export { getMainColor, getRandomGradient };