const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '5702702395:AAGp8BJMsKJ_c4FYUVZc_Cy-wvoSjJBe2gM';
const WebAppUrl = 'https://comfy-sawine-cee12e.netlify.app';
const bot = new TelegramBot(token, {polling: true});
const app = express();
app.use(express.json());
app.use(cors());
bot.on('message', async(msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;


        if (text==='/start'){
            await bot.sendMessage(chatId,'Интернет-магазин', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Сделать заказ', web_app: {url: WebAppUrl}}]
                    ]
                }
            })

            await bot.sendMessage(chatId,'Для оформления доставки заполни форму', {
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
        if(msg?.web_app_data?.data) {
            try {
                const data = JSON.parse(msg?.web_app_data?.data)
                console.log(data)
                await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
                await bot.sendMessage(chatId, 'Город: ' + data?.city);
                await bot.sendMessage(chatId, 'Улица: ' + data?.street);
                await bot.sendMessage(chatId, 'Дом: ' + data?.hom);
                await bot.sendMessage(chatId, 'Квартира: ' + data?.apart);

                setTimeout(async () => {
                    await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
                }, 3000)
            } catch (e) {
                console.log(e);
            }
        }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: 'queryId',
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 3000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT));