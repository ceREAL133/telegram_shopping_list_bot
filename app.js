let productsList = [];
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => {
    console.log(`username: ${ctx.from.username}`);

        const greetingMessage = `hello there, choose option`;
        bot.telegram.sendMessage(ctx.chat.id, greetingMessage, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "create products list",
                        callback_data: 'list'
                    }],
    
                ]
            }
        })
    
});

const hearsMessage = (ctx) => {
    bot.on("message", ctx => {
        if (ctx.message.text) {
            const splittedText = ctx.message.text.split(' ');

            if (splittedText.length <= 10) {
                productsList.push(ctx.message.text);
        
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
            } else{
                bot.telegram.sendMessage(ctx.chat.id, 'your text is too long, enter less text:')
            }
            
        } else{
            bot.telegram.sendMessage(ctx.chat.id, 'its not a text, please enter text, to create products list:')
        }
        
    });
}

bot.action('list', (ctx) => {
    const enterProductsMessage = `ok, ${ctx.from.username}, enter the products for list:`;
    bot.telegram.sendMessage(ctx.chat.id, enterProductsMessage);
    
    hearsMessage(ctx)
})


bot.action('enough', async (ctx)=>{
    await ctx.reply(`your products list is \n${productsList.join(', \n')}`).then(
        productsList = []
    )

    const greetingMessage = `Wanna create new list?`;
    bot.telegram.sendMessage(ctx.chat.id, greetingMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "create products list",
                    callback_data: 'list'
                }],

            ]
        }
    })
})

bot.launch();