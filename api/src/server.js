const app = require("./app");

const port = process.env.PORT || 3001;

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});