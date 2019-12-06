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
    console.log("Points",points)
    return points
  }

  const randomPoints = () => {
    const randomTwopoints = []
    const count = 6

    for (let x = 0; x < count; x++) {
      for(let y = 0; y < count; y++) {
        const a = count <= 1 ? 0.5 : x / (count - 1)
        const b = count <= 1 ? 0.5 : y / (count - 1)
        randomTwopoints.push({
          randomposition: [ a, b ]
        })
      }
    }
    console.log(randomTwopoints)
    return randomTwopoints
  }

  const points = createGrid();
  const randomP = randomPoints()

  // const finalPoints = () => {
  //   const pointsArray = [];
  //   const count = 6;

  //   for (let i = 0; i < count; i++) {
  //     for (let j = 0; j < count; j++) {

  //     }
  //   }
  // }

  // const randompoints1 = createGrid().filter(() => random.value() > 0.5);
  // console.log("wew",randompoints1)
  // const randompoints2 = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;
  const palette = random.shuffle(random.pick(palettes))
  // console.log("random points",randompoints1)

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

     

      const a = random.rangeFloor(x,y)
      const b = random.rangeFloor(x,y)

      // const randompositions = randomP[Math.floor(Math.random()*randomP.length)];

      // console.log("wewe",randompositions)
      
      // console.log("x:",x)
      // console.log("y:" ,y)
      // context.beginPath()
      // context.moveTo(x,y)
      // context.lineTo(a,b)
      // // context.arc(x, y,50, 0,Math.PI * 2, false);
      // context.strokeStyle = 'black'
      // context.lineWidth = 10
      // context.stroke()

      // context.beginPath()
      // context.arc(a, b,50, 0,Math.PI * 2, false);
      // context.strokeStyle = 'red'
      // context.lineWidth = 25;
      // context.stroke()

      // context.beginPath()
      // context.arc(x, y,50, 0,Math.PI * 2, false);
      // context.strokeStyle = 'blue'
      // context.lineWidth = 25;
      // context.stroke()


    });

    for (let i = 0; i < randomP.length; i++) {
      const trav = 0;
      const arr = [];
      
      
      const a = randomP[i].randomposition[0]
      const b = randomP[i].randomposition[1];

      if (!arr.includes(a) && !arr.includes(b)) {
        arr.push({
          a,b
        })
        console.log("Array a", arr.includes(1))
        const j = randomP[Math.floor(Math.random()*randomP.length)].randomposition[0]
        const k = randomP[Math.floor(Math.random()*randomP.length)].randomposition[1]
        const l = randomP[Math.floor(Math.random()*randomP.length)].randomposition[0]
        const m = randomP[Math.floor(Math.random()*randomP.length)].randomposition[1]
        const o = randomP[Math.floor(Math.random()*randomP.length)].randomposition[0]
        const p = randomP[Math.floor(Math.random()*randomP.length)].randomposition[1]

        if (!arr.includes(j) && !arr.includes(k)) {
          arr.push({
            j,k
          })
          console.log(" array length",arr)
          const startingPosition1 = lerp(margin, width - margin, a);
          const startingPosition2 = lerp(margin, height - margin, b);
          const endPosition1 = lerp(margin, width - margin, j);
          const endPosition2 = lerp(margin, height - margin, k);
          const endPosition3 = lerp(margin, width - margin, l);
          const endPosition4 = lerp(margin, height - margin, m);
          const endPosition5 = lerp(margin, width - margin, o);
          const endPosition6 = lerp(margin, height - margin, p);

          const red = Math.floor(Math.random()*256);
          const green = Math.floor(Math.random()*256);
          const blue = Math.floor(Math.random()*256);

          // context.beginPath()
          // context.arc(startingPosition1,startingPosition2,50, 0,Math.PI * 2, false)
          // context.strokeStyle = 'red'
          // context.lineWidth = 25
          // context.stroke()

          context.beginPath()
          context.moveTo(startingPosition1,startingPosition2)
          context.lineTo(endPosition1,endPosition2)
          context.lineTo(endPosition3,endPosition4)
          context.lineTo(endPosition5,endPosition6)
          // context.arc(j,k,50, 0,Math.PI * 2, false)
          context.strokeStyle = 'white'
          context.fillStyle = random.pick(palette)
          context.fill()
          context.lineWidth = 10
          context.closePath()
          context.stroke()
        }
      }
 
    }

  };
};

canvasSketch(sketch, settings);
