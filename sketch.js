const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

/* SIZE OF THE ARTWORK */
const settings = {
  dimensions: [ 2048, 2048 ]
};

/* FOR RENDERING */ 
const sketch = () => {
  const colorCount = random.rangeFloor(2,6)
  const palette = random.shuffle(random.pick(palettes))
    .slice(0,colorCount) /* Picking a palette first then slice it*/

  /* For determining the grid points */ 
  const createGrid = () => {
    const points = []; /* Each points represent the grid points of the canvas*/
    const count = 35; /* Number of columns and rows in the canvas*/
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        /* If the number of columns and rows is below 1, the circle will automatically place at the center of the canvas 
        else it will display to each sides of the canvas
        
        Another note: (0.5,0.5) -  Center
                      (0,0) -  Top Left
                      (1,1) - Bottom right

        u & v values are  0-1 range only
        */
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u,v)) * 1;
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u,v),
          // radius: Math.abs(0.01 + random.gaussian() * 0.01), /* For random radius of each circles*/
          position : [u, v]
        });
      }
    }
    return points
  }

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  console.log(points)

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0,0,width, height);

    
    points.forEach(data =>{

      const { /* This is called destructing assignment */
        position,
        radius,
        color,
        rotation
      } = data;

      const [ u, v ] = position;

      /* For Creating the margin in the canvas using lerp function*/ 
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();
      context.save(); /* saving the transformation state then drawing some stuff in the canvas*/
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`
      context.translate(x ,y)
      context.rotate(rotation)
      context.fillText('=', 0, 0)

      context.restore() /* then restore it to its original state*/
    })
  };
};

canvasSketch(sketch, settings);
