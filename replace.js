const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace fonts
    content = content.replace(/Syne,\s*sans-serif/g, 'Outfit, sans-serif');
    content = content.replace(/Syne/g, 'Outfit');

    // Replace colors (yellow to luxury gold #d4af37)
    content = content.replace(/#facc15/gi, '#d4af37');
    content = content.replace(/rgba\(250,\s*204,\s*21,/g, 'rgba(212, 175, 55,');
    
    // Replace light mode yellow to light mode gold
    content = content.replace(/#ca8a04/gi, '#b8860b');
    content = content.replace(/rgba\(202,\s*138,\s*4,/g, 'rgba(184, 134, 11,');

    fs.writeFileSync(filePath, content, 'utf8');
});

// Also replace in App.js
const appPath = path.join(__dirname, 'src', 'App.js');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/Syne,\s*sans-serif/g, 'Outfit, sans-serif');
appContent = appContent.replace(/Syne/g, 'Outfit');
appContent = appContent.replace(/#facc15/gi, '#d4af37');
fs.writeFileSync(appPath, appContent, 'utf8');

console.log('Replaced successfully');
