const fs = require('fs');
const http = require('http');
const path = require('path');

const weightedImages = [
    { src: "001_00.png", weight: 15.5 },
    { src: "001_01.png", weight: 12.5 },
    { src: "001_03.png", weight: 12.5 },
    { src: "001_05.png", weight: 12.5 },
    { src: "003-terre.png", weight: 12.5 },
    { src: "004.png", weight: 12.5 },
    { src: "012-sable.png", weight: 12.5 },
    { src: "013.png", weight: 12.5 },
    { src: "020-verre.png", weight: 5 },
    { src: "049-obsidienne.png", weight: 2 },
    { src: "ore_coal.png", weight: 5.5 },
    { src: "ore_diamond.png", weight: 2 },
    { src: "ore_iron.png", weight: 4 },
    { src: "ore_lapis_lazuli.png", weight: 5 },
    { src: "ore_emerald.png", weight: 2 },
    { src: "ore_redstone.png", weight: 5 }
];

let clickCount = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        res.end(htmlContent);
    } else if (req.url === '/updateImage') {
        clickCount++;

        if (clickCount >= 5) {
            const totalWeight = weightedImages.reduce((acc, img) => acc + img.weight, 0);
            const randomNum = Math.random() * totalWeight;
            let cumulativeWeight = 0;
            let chosenImage;

            for (const img of weightedImages) {
                cumulativeWeight += img.weight;
                if (randomNum <= cumulativeWeight) {
                    chosenImage = img.src;
                    break;
                }
            }

            const imageFileName = chosenImage.split('/').pop(); 
            const newText = `${imageFileName} ${clickCount}\n`;

            fs.appendFile('log.txt', newText, (err) => {
                if (err) {
                    console.error('Erreur lors de l\'écriture dans le fichier :', err);
                } else {
                    console.log('Nom de l\'image enregistré dans le fichier.');
                }
            });

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(imageFileName);
            clickCount = 0;
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Shake');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page non trouvée');
    }
});

server.listen(3000, () => {
    console.log('Serveur en cours d\'exécution sur le port 3000');
});
