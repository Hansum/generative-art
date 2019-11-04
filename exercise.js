const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () => {
    const points = [];
    const count = 6;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          position: [u, v]
        })
      }
    }
    return points
  }

  // const randomPoints = () => {
  //   const points = []
  //   const count = 2

  //   for (let x = 0; x < count; x++) {
  //     for(let y = 0; y < count; y++) {
  //       const a = count <= 1 ? 0.5 : x / (count - 1)
  //       const b = count <= 1 ? 0.5 : y / (count - 1)
  //     }
  //   }
  // }

  const points = createGrid();
  const randompoints = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;
  console.log("random points",randompoints)

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(element => {
      const {
        position
      } = element

      const [ u, v ] = position
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // const a = random.rangeFloor(u,v)
      // const b = random.rangeFloor(u,v)
      
      console.log("A:",x)
      console.log("B:" ,y)
      // console.log("u",v)
      // console.log("v",v)
      context.beginPath()
      context.moveTo(x,y)
      context.lineTo(v,x)
      // context.arc(x, y,50, 0,Math.PI * 2, false);
      context.strokeStyle = 'black'
      context.lineWidth = 40
      context.stroke()

      // context.beginPath()
      // context.moveTo(a,b)
      // context.lineTo(50,500)
      // context.strokeStyle = 'red'
      // context.lineWidth = 50;
      // context.stroke()
    });



  };
};

canvasSketch(sketch, settings);
