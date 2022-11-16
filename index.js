const TelegramBot = require('node-telegram-bot-api');

const token = '5702702395:AAGp8BJMsKJ_c4FYUVZc_Cy-wvoSjJBe2gM';
const WebAppUrl = 'https://comfy-sawine-cee12e.netlify.app/';
const bot = new TelegramBot(token, {polling: true});


const start = () => {
    bot.setMyCommands([
        {command: '/start', description:'Начальное приветствие'},
        {command: '/info', description:'Информация о пользователе'}

    ])

    bot.on('message', async(msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;


        if (text==='/start') {
            await bot.sendMessage(chatId,'Интернет-магазин', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Сделать заказ', web_app: {url: WebAppUrl}}]
                    ]
                }
            })

            await bot.sendMessage(chatId,'Для регистрации заполни форму', {
                reply_markup: {
                    keyboard: [
                        [{text: 'Заполни форму', web_app: {url: WebAppUrl + '/form'}}]
                    ]
                }
            })


        }
        if (text==='/info') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/74f/28b/74f28bc2-f5ba-368b-83f7-9c43bffa9371/192/12.webp');
            await bot.sendMessage(chatId, 'Информация');
        }

    });

}
start()