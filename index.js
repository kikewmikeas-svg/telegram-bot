const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

/* ===========================
   🔐 ВСТАВЬ СЮДА СВОИ ДАННЫЕ
=========================== */

const TOKEN = "8399073287:AAGdutte_dCAnzFz3_euKv7CPdgyOLnavic";
const ADMIN_CHAT_ID = "8498959430";

/* =========================== */

const bot = new TelegramBot(TOKEN);

// ====== Команда /start ======
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "👋 Привет! Добро пожаловать в магазин.\n\nНажми кнопку ниже, чтобы открыть каталог.",
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🛍 Открыть магазин",
                            web_app: { url: "https://google.com" }
                        }
                    ]
                ]
            }
        }
    );
});

/* ======= Приём заказа ======= */

app.post("/order", async (req, res) => {
  const order = req.body;

  const message = `
🛒 НОВЫЙ ЗАКАЗ

👤 Имя: ${order.name}
📞 Телефон: ${order.phone}
📍 Адрес: ${order.address}

📦 Товары:
${order.items.map(item => `• ${item.name} — ${item.price}₽ x ${item.qty}`).join("\n")}

💰 Сумма: ${order.total}₽
`;

  await bot.sendMessage(ADMIN_CHAT_ID, message);

  res.json({ success: true });
});

/* ======= Запуск сервера ======= */

module.exports = app;

