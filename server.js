const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "guests.json";

// Загружаем текущие данные (если файл существует)
let guests = [];
if (fs.existsSync(DATA_FILE)) {
    guests = JSON.parse(fs.readFileSync(DATA_FILE));
}

// Обработчик для сохранения гостя
app.post("/rsvp", (req, res) => {
    const { name, guestCount, attendance } = req.body;

    if (!name || !guestCount || !attendance) {
        return res.status(400).json({ error: "Все поля обязательны!" });
    }

    const newGuest = { name, guestCount, attendance };
    guests.push(newGuest);

    // Записываем в файл
    fs.writeFileSync(DATA_FILE, JSON.stringify(guests, null, 2));

    res.status(201).json({ message: "Данные сохранены!" });
});

// Получение списка гостей
app.get("/guests", (req, res) => {
    res.json(guests);
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
