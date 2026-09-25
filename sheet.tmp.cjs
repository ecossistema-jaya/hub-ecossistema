const sharp=require(require.resolve('sharp',{paths:[process.cwd()]}));const fs=require('fs');const path=require('path');
const [dir,out,cols='8',start='0',count='80']=process.argv.slice(2);
const files=fs.readdirSync(dir).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort().slice(+start,+start+ +count);
(async()=>{const W=180,H=200,C=+cols;const t=[];for(const [i,f] of files.entries()){try{t.push({input:await sharp(path.join(dir,f)).rotate().resize(W,H-20,{fit:'cover'}).toBuffer(),left:(i%C)*W,top:Math.floor(i/C)*H},{input:Buffer.from(`<svg width="${W}" height="20"><rect width="100%" height="100%" fill="#222"/><text x="4" y="14" font-size="11" font-family="Arial" fill="#fff">${f.slice(0,26).replace(/&/g,'&amp;')}</text></svg>`),left:(i%C)*W,top:Math.floor(i/C)*H+H-20})}catch(e){}}
await sharp({create:{width:C*W,height:Math.ceil(files.length/C)*H,channels:3,background:'#111'}}).composite(t).jpeg({quality:70}).toFile(out);console.log(files.length)})();
