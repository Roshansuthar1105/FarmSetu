import axios from "axios";
import  cheerio  from "cheerio";
// Function to fetch HTML data and convert to JS array
const url = "https://agmarknet.gov.in/agnew/namticker.aspx";
async function fetchMarketData() {
  try {
    // Fetch the HTML data using axios
    const { data } = await axios.get(url);

    // Load the HTML data into Cheerio
    const $ = cheerio.load(data);

    // Initialize an array to hold the extracted data
    const items = [];

    // Select the table rows containing the data
    $('span[id^="DataListTicker_lblTicker_"]').each((index, element) => {
      const ticker = $(element).text().trim();
      const market = $(element)
        .nextAll('span[id^="DataListTicker_lblTitle_"]')
        .text()
        .trim();
      const maxPrice = $(element)
        .nextAll('span[id^="DataListTicker_lblMaxprice_"]')
        .text()
        .trim();
      const minPrice = $(element)
        .nextAll('span[id^="DataListTicker_lblminprice_"]')
        .text()
        .trim();

      items.push({
        ticker,
        market,
        maxPrice,
        minPrice,
      });
    });

    // console.log(items);
    return items;
  } catch (error) {
    console.error(`Error fetching the HTML: ${error.message}`);
    return [];
  }
}

// URL of the page you want to scrape
export default fetchMarketData;
