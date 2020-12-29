const puppeteer = require('puppeteer');

async function main() {
   //const browser = await puppeteer.launch();
   const browser = await puppeteer.launch({
      headless: false,
      dumpio: false,
      devtools: false
   });

   const page = await browser.newPage();
   await page.setViewport({width: 1200, height: 720})
   await page.goto('https://gurushots.com/', {waitUntil: 'networkidle0'});

   //__________________ sign in _____________________________________
   //const loginBtn = '#header > gs-header > div > div > a.signin';

   const loginBtn = 'header#wxUrFe > gs-header > div > div > protection:nth-child(1) > a.wxUrFh';
   const login = '#dialogContent_0 > md-dialog-content > form > div:nth-child(1) > input';
   const password = '#dialogContent_0 > md-dialog-content > form > div:nth-child(2) > input';
   const loginSubmit = '#dialogContent_0 > md-dialog-content > form > button'

   const CREDS = require('./LoginData');

   await page.click(loginBtn);
   await page.click(login);
   await page.waitForTimeout(300);
   await page.keyboard.type(CREDS.login);
   await page.waitForTimeout(300);
   await page.click(password);
   await page.keyboard.type(CREDS.password);
   await page.click(loginSubmit);
   await page.waitForNavigation();
   await page.waitForTimeout(4000);

   await page.evaluate(async () => {
      const LetsGo = document.getElementsByClassName('modal-vote__greeting');
      const voteBtns = document.getElementsByClassName('icon-vote-negative');
      const boostBtns = document.getElementsByClassName('boost-state-available');
      const SwapVoteCloseBtn = document.getElementsByClassName('c-cards__close');

      for (var btn of voteBtns) {
         //Only click button if the first class is for exposure vote
         //if (btn.parentNode.classList[0] == "c-challenges-item-mobile__exposure__vote") {
         if (btn.parentNode.classList[0] == "wxUrFr") {
            $(SwapVoteCloseBtn).click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            $(btn).click();
            await new Promise(resolve => setTimeout(resolve, 4000));
            $(LetsGo).click();
            //const picForVote = $(".modal-vote__photo__vote");
            const picForVote = $(".wxUrFu");

            if (picForVote.length === 0) {
               //$('div.modal-vote__submit.on').click();
               $('div.wxUrFv.on').click();
               await new Promise(resolve => setTimeout(resolve, 4000));
               //$('div.modal-vote__btn').click();
               $('div.wxUrFw').click();
               await new Promise(resolve => setTimeout(resolve, 4000));
               continue;
            } else {
               //await picForVote.each((i, el) => $(el).click());
               await picForVote.each(function (i, el) {
                  r = Math.random();
                  if (i >= 20 && r > 0.2) {
                     $(el).click();
                  }
               });
               await new Promise(resolve => setTimeout(resolve, 4000));
               //$('div.modal-vote__submit.on').click();
               $('div.wxUrFv.on').click();
               await new Promise(resolve => setTimeout(resolve, 4000));
               //$('div.modal-vote__btn').click();
               $('div.wxUrFw').click();
               await new Promise(resolve => setTimeout(resolve, 4000));
            }
         }
      }

      // // try to boost
      // if (boostBtns.length >= 1) {
      //     for (var btn of boostBtns) {
      //         $(btn).click();
      //         await new Promise(resolve => setTimeout(resolve, 4000));
      //         const picForVote = document.querySelector('div.c-modal-boost__photos > div:nth-child(1)');
      //         $(picForVote).click();
      //         await new Promise(resolve => setTimeout(resolve, 4000));
      //     }
      // }
   });
   await browser.close();
}
main();