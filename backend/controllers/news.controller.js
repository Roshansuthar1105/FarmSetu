import fetchData from "../scraper/scrapeNews.js";
export const news= async(req, res)=>{
    try{
        const newsData= await fetchData();
        if(newsData){
            return res.status(200).json(newsData);
        }
        return res.status(500).json({error:'Error in scraping news'});
    }
    catch(err){
        console.log('Error fetching the news');
        return res.status(500).json({error:'Internal Server Error'});
    }
}