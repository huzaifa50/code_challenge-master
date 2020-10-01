const puppeteer = require("puppeteer");
import { writeFile } from "fs";
import { resolve } from "path";
import Hero from "../../models/hero";

async function getHeroes() {
  const START_URL = "https://www.marvel.com/characters";
  
  var heroes: Hero[] = [];

  const browser = await puppeteer.launch({
    headless: false
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    console.log('Getting heroes from website', START_URL);

    //scrapping starts
    for (let i = 0; i < 12; i++) {
      //go to the url
      await page.goto(START_URL, { timeout: 0 });

      //find all sections containing featured characters
      await page.waitForSelector('section#content_grid-2 > div.content-grid > div.grid-base > div.mvl-card');
      const sections = await page.$$('section#content_grid-2 > div.content-grid > div.grid-base > div.mvl-card');

      //getting the link to character details page
      const section = sections[i];
      const button = await section.$('a.explore__link');

      //clicking the button
      await button.click();

      //finding the div with character name and fetching it
      await page.waitForSelector('span.masthead__headline');
      const name = await page.$eval('span.masthead__headline', e => e.innerText);
      console.log(name);

      // finding the div with character image and fetching it
      await page.waitForSelector('div.featured > div.featured__background__wrapper > div.imageBackground__container > figure.img__wrapper > div.built__background');
      const backgroundImage = await page.$eval('div.featured > div.featured__background__wrapper > div.imageBackground__container > figure.img__wrapper > div.built__background', e => e.style.backgroundImage);
      const photo = backgroundImage ? backgroundImage.match(/url\("(.*)"/)[1] : null;
      console.log(photo);

      //finding the div with character bio and fetching it
      await page.waitForSelector('div.masthead__copy');
      const bio = await page.$eval('div.masthead__copy', e => e.innerText);
      console.log(bio);

      //Initializing Hero object with required attributes
      const h: Hero = {
        id: i + 1,
        name: name,
        photo: photo,
        bio: bio
      }

      //pushing it in array
      heroes.push(h);
    }

  } catch (error) {
    console.log(error);
    await browser.close();
  } finally {
    await browser.close();
  }

  console.log(heroes);

  //wrtting the file with json data
  writeFile(
    resolve(__dirname, "../heroes.json"),
    JSON.stringify(heroes, null, 2),
    err => {
      if (err) {
        throw err;
      }
      console.log("Finished writing file");
    }
  );
}

getHeroes();