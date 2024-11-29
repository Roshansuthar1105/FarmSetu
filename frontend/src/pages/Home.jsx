import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import ProductOverview from "../components/ProductOverview";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
function Home(){
    return (
        <div>
            <Hero></Hero>
            <Features></Features>
            <Testimonials></Testimonials>
            <ProductOverview></ProductOverview>
            <Pricing></Pricing>
            <Contact></Contact>
        </div>
    )
}
export default Home;