
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.command('start', ctx => {
    console.log(`username: ${ctx.from.username}`);
    let greetingMessage = `hello there, choose option`;
    bot.telegram.sendMessage(ctx.chat.id, greetingMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "create product list",
                    callback_data: 'list'
                }],

            ]
        }
    })
});

let productsList = [];

bot.action('list', ctx => {
    let enterProductsMessage = `ok, ${ctx.from.username}, enter the products for list:`;
    bot.telegram.sendMessage(ctx.chat.id, enterProductsMessage);
    bot.hears(message => {
        productsList.push(message);
        bot.telegram.sendMessage(ctx.chat.id, 'is that enough?', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "enough",
                        callback_data: 'enough'
                    }],
    
                ]
            }
        })
    });
})



bot.action('enough',()=>{ console.log(productsList)})

// bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// process.once('SIGINT', () => bot.stop('SIGINT'))
// bot.launch()



bot.launch();