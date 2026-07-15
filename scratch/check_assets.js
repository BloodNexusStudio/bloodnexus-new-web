const fs = require('fs');
const path = require('path');
const https = require('https');

const files = [
  path.join(__dirname, '../src/data/games.ts'),
  path.join(__dirname, '../src/data/services.ts'),
  path.join(__dirname, '../src/app/3d-art/page.tsx'),
  path.join(__dirname, '../src/app/arch-viz/page.tsx'),
  path.join(__dirname, '../src/app/video/warsaw/page.tsx'),
  path.join(__dirname, '../src/app/video/archviz/page.tsx')
];

const urls = new Set();

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/https?:\/\/[^\s"',]+/g);
    if (matches) {
      matches.forEach(url => {
        // clean url
        const cleanUrl = url.split('\\').join('').split(')')[0].split(']')[0];
        if (cleanUrl.includes('cloudinary.com') || cleanUrl.includes('bloodnexusstudio.in')) {
          urls.add(cleanUrl);
        }
      });
    }
  }
});

console.log(`Found ${urls.size} asset URLs to verify:\n`);
const urlList = Array.from(urls);

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
    req.end();
  });
}

async function run() {
  const results = [];
  for (let i = 0; i < urlList.length; i++) {
    const res = await checkUrl(urlList[i]);
    results.push(res);
    console.log(`[${res.status}] ${res.url}`);
  }

  console.log('\n--- VERIFICATION REPORT ---');
  const broken = results.filter(r => r.status !== 200);
  if (broken.length === 0) {
    console.log('ALL ASSETS ARE WORKING FINE! (200 OK)');
  } else {
    console.log(`${broken.length} broken assets found:\n`);
    broken.forEach(b => {
      console.log(`Status: ${b.status} | URL: ${b.url}`);
    });
  }
}

run();
