import MyNavbar from "../components/MyNavbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import ProductOverview from "../components/ProductOverview";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
function Home(){
    return (
        <div>
            <MyNavbar></MyNavbar>
            <Hero></Hero>
            <Features></Features>
            <Testimonials></Testimonials>
            <ProductOverview></ProductOverview>
            <Pricing></Pricing>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    )
}
export default Home;