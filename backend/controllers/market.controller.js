import fetchMarketData from "../scraper/scrapeMarketData.js"
export const getMarketData= async (req, res)=>{
    try{
        const marketData= await fetchMarketData();
        if(marketData){
            return res.status(200).json({marketData});
        }
        return res.status(500).json({error:'Error in fetching realtime market data'});
    }
    catch(err){
        console.log('Error in market route');
        res.status(500).json({error:'Internal Server Error'});
    }
}