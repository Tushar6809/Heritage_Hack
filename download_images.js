const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  'jaugada_1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Jaugada_Rock_Inscription_of_Ashoka.jpg',
  'jaugada_2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Jaugada_2018.jpg',
  'jaugada_3.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Jaugada_rock_with_Ashoka_Major_Rock_Edict.jpg',
  'sisupalgarh_1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Sisupalagada_Bhubaneswar.jpg',
  'sisupalgarh_2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Sisupalgarh_fortified_urban_center.jpg',
  'sisupalgarh_3.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Ancient_remains_inside_rampart_of_Sisupalgarh_-_6.JPG',
  'dhauli_1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Historical_landmark_in_Dhauli_Shanti_Stupa_4.jpg',
  'dhauli_2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Dhauli_Shanti_Stupa%2C_Bhubaneswar.jpg',
  'dhauli_3.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/da/Dhauli_shanti_stupa.jpg',
  'saptashrungi_1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/85/Saptashrungi_Devi_Temple.jpg',
  'saptashrungi_2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Funicular_Train_at_Saptashrungi_Gad.jpg',
  'saptashrungi_3.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Saptashrungi_Temple_at_Night.jpg'
};

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(images)) {
    console.log(`Downloading ${filename}...`);
    try {
      await download(url, path.join(dir, filename));
    } catch (e) {
      console.error(`Failed to download ${filename}:`, e);
    }
  }
  console.log('All done!');
}

run();
