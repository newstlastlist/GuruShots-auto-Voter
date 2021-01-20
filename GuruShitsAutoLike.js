const puppeteer = require('puppeteer');

async function main() {
   const browser = await puppeteer.launch({
      headless: false,
      dumpio: false,
      devtools: false
   });

   const page = await browser.newPage();
   await page.setViewport({width: 1200, height: 720})
   await page.goto('https://gurushots.com/', {waitUntil: 'networkidle0'});
   const login = '#dialogContent_0 > md-dialog-content > form > div:nth-child(1) > input';
   const password = '#dialogContent_0 > md-dialog-content > form > div:nth-child(2) > input';
   const loginSubmit = '#dialogContent_0 > md-dialog-content > form > button'

   const CREDS = require('./LoginData');

   await page.evaluate(async () => {
      const loginBtn = document.querySelectorAll('header gs-header div > div > protection:nth-child(1) a');
      for (var btn of loginBtn) {
         const style = getComputedStyle(btn);

         if (style.display !== 'none') {
            await btn.click();
            break;
         }
      }

   })

   await page.click(login);
   await page.waitForTimeout(300);
   await page.keyboard.type(CREDS.login);
   await page.waitForTimeout(300);
   await page.click(password);
   await page.keyboard.type(CREDS.password);
   await page.click(loginSubmit);
   await page.waitForNavigation();

   await page.waitForTimeout(9000);

   await page.evaluate(async () => {
      const LetsGo = document.getElementsByClassName('modal-vote__greeting');
      const voteBtns = document.getElementsByClassName('icon-vote-negative');
      const boostBtns = document.getElementsByClassName('boost-state-available');

      for (var btn of voteBtns) {
         $(btn).click();
         await new Promise(resolve => setTimeout(resolve, 4000));
         $(LetsGo).click();
         const picForVote = $(".modal-vote__photo__voted").prev();

         if (picForVote.length === 0) {
            $('div[ng-click="$ctrl.submit()"]').click();
            await new Promise(resolve => setTimeout(resolve, 4000));
            $('div[ng-click="$ctrl.close()"]').click();
            await new Promise(resolve => setTimeout(resolve, 4000));
            continue;

         } else {
            await picForVote.each(function (i, el) {
               r = Math.random();
               if (i >= 20 && r > 0.2) {
                  $(el).click();
               }
            });
            await new Promise(resolve => setTimeout(resolve, 4000));
            $('div[ng-click="$ctrl.submit()"]').click();
            await new Promise(resolve => setTimeout(resolve, 4000));
            $('div[ng-click="$ctrl.close()"]').click();
            await new Promise(resolve => setTimeout(resolve, 4000));
         }
      }

// try to boost
//if (boostBtns.length >= 1) {
      // for (var btn of boostBtns) {
      //   $(btn).click();
      //  await new Promise(resolve => setTimeout(resolve, 4000));
      //  const picForVote = document.querySelector('div.c-modal-boost__photos > div:nth-child(1)');
      //  $(picForVote).click();
      //  await new Promise(resolve => setTimeout(resolve, 4000));

      // }

// }
   });
   await browser.close();
   await console.log('Voting Done');
}

main();