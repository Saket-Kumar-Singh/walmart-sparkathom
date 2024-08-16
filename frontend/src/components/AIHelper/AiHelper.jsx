import ProductCard from "./ProductCard"
import ProductDetails from "./ProductDetails"
import Chatbot from "./Chatbot"
const AiHelper=()=>{
    return (
        <div className="h-screen w-screen bg-red-100 flex overflow-hidden">
          {/* product list div */}
          <div className="h-full w-[30%] bg-zinc-100 flex flex-col">
            <div className="bg-zinc-100 border-2 shadow-md p-2">
              <h1 className="text-gray-700 font-semibold text-lg ml-2">Products</h1>
            </div>
            <div className="flex flex-col space-y-2 mt-2 p-2 overflow-y-auto hover:overflow-y-scroll ">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
          {/* chatbox div */}
          <div className="w-[38%] ">
          <Chatbot/>
          </div>
          {/* product detail div */}
          <div className="bg-slate-100 w-[32%] ">
            <div className="shadow-md bg-zinc-100 h-[6vh] p-2">
              <h1 className="text-lg font-semibold text-gray-700">Product details</h1>
            </div>
            <ProductDetails/>
            
          </div>
        </div>
    )
}
export default AiHelper