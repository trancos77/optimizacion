const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname)));
app.use(express.json()); // Para analizar el cuerpo de las peticiones JSON


app.post('/', (req, res) => {
    const userData = req.body;
    const filename = 'users.json';
    const fs = require('fs').promises;

    async function saveData() {
        console.log('dentro de saveData');
        try {
            const filePath = path.join(__dirname, filename);
            console.log(filePath);
            let existingData = [];
            try {
                const fileContent = await fs.readFile(filePath, 'utf8');
                existingData = JSON.parse(fileContent);
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    console.error('Error reading file:', error);
                    return res.status(500).send('Error al leer el archivo.');
                }
            }
            existingData.push(userData);
            await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf8');
            //res.send('Datos guardados correctamente.');
            res.json(userData)
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).send('Error al guardar los datos.');
        }
    }

    saveData();
});

// Middleware para manejar errores "Cannot GET" para rutas no definidas
app.use((req, res, next) => {
    res.redirect('/'); // Redirige a la página principal
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});