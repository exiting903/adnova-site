
export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Получаем данные
  const { name, phone, consent } = req.body;

  // Проверка данных
  if (!name || !phone) {
    return res.status(400).json({ error: 'Заполните Имя и Телефон' });
  }

  // СЕКРЕТНЫЙ ТОКЕН берется из переменных окружения Vercel
  // НЕ пиши его сюда напрямую, если будешь выкладывать код в GitHub
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; 
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Не настроены переменные окружения TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID');
    return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
  }

  // Функция очистки от HTML-тегов (защита от инъекций)
  const sanitize = (str) => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const safeName = sanitize(name);
  const safePhone = sanitize(phone);

  const message = `
🔥 <b>Новая заявка!</b>

👤 <b>Имя:</b> ${safeName}
📞 <b>Телефон:</b> ${safePhone}
✅ <b>Согласие:</b> ${consent ? 'Да' : 'Нет'}
  `;

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await tgResponse.json();

    if (data.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Telegram API Error:', data);
      return res.status(500).json({ error: 'Ошибка отправки в Telegram' });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}