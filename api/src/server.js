const app = require("./app");

const port = process.env.PORT || 5000;

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
