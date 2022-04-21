//var Jimp = require("jimp");
const sharp = require("sharp");
//const tools = require("simple-svg-tools");
const { parse, stringify } = require('svgson')
//const { svg2png } = require('svg-png-converter');
const fs = require('fs');
const dad = require('./data/dad.json');
const templateJson = require('./data/template-svg.json');
const son = require('./data/son.json');
const mom = require('./data/mom.json');

console.log("Hello");
//console.log(data.name);

const app = async () => {

  let imageBase64 = base64_encode_png('./img/my-card.png');

  let image = {
    "name": "image",
    "type": "element",
    "value": "",
    "attributes": {
      "x": "0",
      "y": "0",
      "width": "100%",
      "height": "100%",
      "xlink:href": imageBase64
    },
    "children": []
  };

  let con = {
    name: 'text',
    type: 'element',
    value: '',
    attributes: {
      x: 638,
      y: 678,
      class: "test"
    },
    children: [
      {
        name: "",
        type: "text",
        value: dad.target.con,
      }
    ]
  };
  if (!fs.existsSync("output/dad")) {
    fs.mkdirSync("output/dad", { recursive: true });
  }

  if (!fs.existsSync("output/son")) {
    fs.mkdirSync("output/son", { recursive: true });
  }

  await Promise.all(
    dad.title.map(async (t) => {
      let myJson = templateJson;
      let name1 = {
        name: 'text',
        type: 'element',
        value: '',
        attributes: {
          x: "50%",
          y: 626,
          class: "test",
          'text-anchor': "middle"
        },
        children: [
          {
            name: "",
            type: "text",
            value: t.value,
          }
        ]
      };
      let name2 = {
        name: 'text',
        type: 'element',
        value: '',
        attributes: {
          x: 534,
          y: 1246,
          class: "test"
        },
        children: [
          {
            name: "",
            type: "text",
            value: t.value,
          }
        ]
      };
      myJson.children.push(image);
      myJson.children.push(name1);
      myJson.children.push(con);
      myJson.children.push(name2);
      let result = stringify(myJson);
      //fs.writeFileSync('output/new-file.svg', result);

      const outputFile = "output/dad/" + t.name + ".png";
      if (!fs.existsSync(outputFile)) {

        await sharp(Buffer.from(flattenSVG(result))).toFormat('png').toFile(outputFile)
          .then((info) => {
            console.log(info);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }),
    mom.title.map(async (t) => {
      let myJson = templateJson;
      let name1 = {
        name: 'text',
        type: 'element',
        value: '',
        attributes: {
          x: "50%",
          y: 626,
          class: "test",
          'text-anchor': "middle"
        },
        children: [
          {
            name: "",
            type: "text",
            value: t.value,
          }
        ]
      };
      let name2 = {
        name: 'text',
        type: 'element',
        value: '',
        attributes: {
          x: 534,
          y: 1246,
          class: "test"
        },
        children: [
          {
            name: "",
            type: "text",
            value: t.second_value || t.value,
          }
        ]
      };

      myJson.children.push(image);
      myJson.children.push(name1);
      myJson.children.push(con);
      myJson.children.push(name2);
      let result = stringify(myJson);
      //fs.writeFileSync('output/new-file.svg', result);

      const outputFile = "output/mom/" + t.name + ".png";
      if (!fs.existsSync(outputFile)) {

        await sharp(Buffer.from(flattenSVG(result))).toFormat('png').toFile(outputFile)
          .then((info) => {
            console.log(info);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }),
    son.title.map(async (t) => {
      let myJson = templateJson;
      let name1 = {
        name: 'text',
        type: 'element',
        value: '',
        attributes: {
          x: "50%",
          y: 626,
          class: "test",
          'text-anchor': "middle"
        },
        children: [
          {
            name: "",
            type: "text",
            value: t.value,
          }
        ]
      };
      let name2 = {
        name: 'text',
        type: 'element',
        value: '',
        attributes: {
          x: 536,
          y: 1246,
          class: "test"
        },
        children: [
          {
            name: "",
            type: "text",
            value: t.value,
          }
        ]
      };

      myJson.children.push(image);
      myJson.children.push(name1);
      myJson.children.push(name2);
      let result = stringify(myJson);

      const outputFile = "output/son/" + t.name + ".png";
      if (!fs.existsSync(outputFile)) {
        await sharp(Buffer.from(flattenSVG(result))).toFormat('png').toFile(outputFile)
          .then((info) => {
            console.log(info);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
  )
  console.log("Done");

  // let outputBuffer = await svg2png({
  //   input: flattenSVG(result),
  //   encoding: 'buffer',
  //   format: 'png',
  // })
  // fs.writeFileSync("output/new-file.png", outputBuffer);
}


// const app = async () => {
//   //let defaultSVG;
//   let defaultJson;
//   // await tools.ImportSVG('html/card.svg').then(svg => {
//   //   defaultSVG = svg;
//   // }).catch(err => {
//   //   console.log(err);
//   // });

//   let defaultSVG = await sharp('html/card.svg');

//   await parse(defaultSVG).then(json => {
//     defaultJson = json;
//   }).catch(err => {
//     console.log(err);
//   });

//   console.log(defaultJson);

//   let name1 = {
//     name: 'text',
//     type: 'element',
//     value: '',
//     attributes: {
//       x: 438,
//       y: 626,
//       class: "test"
//     },
//     children: [
//       {
//         name: "",
//         type: "text",
//         value: data.name[0],
//       }
//     ]
//   };
//   //defaultJson.children.push(name1);
//   //const result = stringify(defaultJson);

//   //await tools.
//   //<text x="536" y="1246" class="test">Anh chị và gia đình</text>
//   console.log("Done");
// }

// tools.ImportSVG(input).then(svg => {
//   // SVG was imported
//   // Variable 'svg' is instance of SVG class
//   console.log(svg.toString());
//   return svg.collections();
// })
// .then(collection => {
//   // Collection was imported
//   // Variable 'collection' is instance of Collection class
//   console.log('Found icons: ' + collection.keys().join(', '));
// })
// .catch(err => {
//   console.log(err);
// });

// Convert any input to full colour PNG output

// const flattenSVG = (svg) => {
//   const images = svg.match(/<image [^>]+>/g);
//   if (!images || images.length < 1) {
//     return svg;
//   }

//   var result = svg;
//   images.forEach(image => {
//     const [, data] = image.match(/ xlink:href="data:image\/svg\+xml;base64,([^"]+)"/) || [];
//     if (!data) {
//       return;
//     }

//     const innerSVG = Buffer.from(data, 'base64').toString();
//     const [, width] = image.match(/ width="([^"]+)"/) || [];
//     const [, height] = image.match(/ height="([^"]+)"/) || [];
//     const [, opacity] = image.match(/ opacity="([^"]+)"/) || [];
//     const [, x] = image.match(/ x="([^"]+)"/) || [];
//     const [, y] = image.match(/ y="([^"]+)"/) || [];
//     const [header] = innerSVG && innerSVG.match(/<svg[^>]+>/) || [];
//     const fixedHeader = header
//       .replace(/ (x|y|width|height)="([^"]+)"/g, '')
//       .replace('<svg', `<svg x="${x}" y="${y}" width="${width}" height="${height}" opacity="${opacity || 1.0}"`);
//     const replacement = innerSVG && innerSVG.replace(header, fixedHeader);
//     result = result.replace(image, replacement);
//   });

//   return result;
// }

// //const data = sharp(Buffer.from(flattenSVG(input)))
// const data = sharp(input)
//   .toFormat('png')
//   .toFile("output/new-file.png")
//   .then((info) => {
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const flattenSVG = (svg) => {
  const images = svg.match(/<image [^>]+>/g);
  if (!images || images.length < 1) {
    return svg;
  }

  var result = svg;
  images.forEach(image => {
    const [, data] = image.match(/ xlink:href="data:image\/svg\+xml;base64,([^"]+)"/) || [];
    if (!data) {
      return;
    }

    const innerSVG = Buffer.from(data, 'base64').toString();
    const [, width] = image.match(/ width="([^"]+)"/) || [];
    const [, height] = image.match(/ height="([^"]+)"/) || [];
    const [, opacity] = image.match(/ opacity="([^"]+)"/) || [];
    const [, x] = image.match(/ x="([^"]+)"/) || [];
    const [, y] = image.match(/ y="([^"]+)"/) || [];
    const [header] = innerSVG && innerSVG.match(/<svg[^>]+>/) || [];
    const fixedHeader = header
      .replace(/ (x|y|width|height)="([^"]+)"/g, '')
      .replace('<svg', `<svg x="${x}" y="${y}" width="${width}" height="${height}" opacity="${opacity || 1.0}"`);
    const replacement = innerSVG && innerSVG.replace(header, fixedHeader);
    result = result.replace(image, replacement);
  });

  return result;
}


// function to encode file data to base64 encoded string
const base64_encode_png = (file) => {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  const prefix = "data:image/png;base64,";
  const base64 = new Buffer.from(bitmap).toString('base64');
  return prefix + base64;
}

app();