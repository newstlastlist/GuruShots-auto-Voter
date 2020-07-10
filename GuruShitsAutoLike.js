const puppeteer = require('puppeteer');

async function main() {
  //const browser = await puppeteer.launch();
   const browser = await puppeteer.launch({headless: true});

   const page = await browser.newPage();
   await page.setViewport({width: 1200, height: 720})
   await page.goto('https://gurushots.com/', { waitUntil: 'networkidle0' });

   //__________________ sign in _____________________________________
   const loginBtn = '#header > gs-header > div > div > a.signin';   
   const login = '#dialogContent_0 > md-dialog-content > form > div:nth-child(1) > input';
   const password = '#dialogContent_0 > md-dialog-content > form > div:nth-child(2) > input';
   const loginSubmit = '#dialogContent_0 > md-dialog-content > form > button'

   const CREDS = require('./LoginData');

   await page.click(loginBtn);

   await page.click(login);
   await page.waitFor(300);
   await page.keyboard.type(CREDS.login);
   await page.waitFor(300);

   await page.click(password);
   await page.keyboard.type(CREDS.password);

   await page.click(loginSubmit);

   await page.waitForNavigation();
   //await page.evaluate(() => console.log('2222'));
  //_______________________________________________________________________
   await page.waitFor(7000);
   await page.evaluate(async ()  => {      
      const voteBtns = document.getElementsByClassName('icon-vote-negative');    
      const boostBtns =  document.getElementsByClassName('boost-state-available');       
      console.log(voteBtns.length);
     
      //Close modal windows showing the swap suggestions and swap results
      const closeBtns = document.getElementsByClassName('c-cards__close');
      for (var btn of closeBtns) {
         $(btn).click();
         await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      //vote for photos
      for (var btn of voteBtns){ 
                
         $(btn).click();         
         await new Promise(resolve => setTimeout(resolve, 7000));         
         const picForVote = $(".modal-vote__photo__vote");         

         if(picForVote.length === 0){
            $('div.modal-vote__submit.on').click();
            await new Promise(resolve => setTimeout(resolve, 7000)); 
            $('div.gs-btn--blue').click();
            await new Promise(resolve => setTimeout(resolve, 7000));
            continue;

         } else {
            //await picForVote.each((i, el) => $(el).click());
            await picForVote.each(function(i, el) {
               r = Math.random();
               if(i >= 20 && r > 0.2)
               {
                  $(el).click();
               }
            });
            await new Promise(resolve => setTimeout(resolve, 7000));            
            $('div.modal-vote__submit.on').click();
            await new Promise(resolve => setTimeout(resolve, 7000));   
            $('div.modal-vote__btn').click();
            await new Promise(resolve => setTimeout(resolve, 7000)); 
            
         }
      }

      // try to boost
      if(boostBtns.length >= 1){
         for (var btn of boostBtns){ 

            $(btn).click(); 
            await new Promise(resolve => setTimeout(resolve, 7000));
            const picForVote = document.querySelector('div.c-modal-boost__photos > div:nth-child(1)'); 
            $(picForVote).click(); 
            await new Promise(resolve => setTimeout(resolve, 7000));
            
         }    
      } 
      

      
   });

  
  
  
  await browser.close();
}


main();
