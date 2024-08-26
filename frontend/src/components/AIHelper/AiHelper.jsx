import ProductCard from "./ProductCard"
import ProductDetails from "./ProductDetails"
import Chatbot from "./Chatbot"
import { useEffect, useState } from "react"
import axios from "axios"
const AiHelper=()=>{
  const id="66bc9c42ac25e478721055e7";
  const text="a nice mobile"
    const [data,setData]=useState();
    const [prodNames,setProdNames]=useState();
    const [Aires,setAires]=useState();
    const [ProductId,setProductId]=useState();
    const selectProductDetails=(id)=>{
      setProductId(id);
    }
    const handleProductData=(productData)=>{
        setProdNames(productData)
    }
    
    
    return (
        
          <div className="h-screen w-screen flex overflow-hidden">
          {/* product list div */}
          
          <div className="h-full w-[30%] bg-zinc-100 flex flex-col">
            <div className="bg-zinc-100 border-2 shadow-md p-2">
              <h1 className="text-gray-700 font-semibold text-lg ml-2">Products</h1>
            </div>
            {
              prodNames?(
                <div className="flex flex-col space-y-2 mt-2 p-2 overflow-y-auto hover:overflow-y-scroll ">
                {
                  prodNames?.map((product, index) => (
                    <div onClick={()=>selectProductDetails(product?.id)}>
                     <ProductCard   key={index} props={product} />
                    </div>
                  ))
                }
              </div>
              ):
              (
                  <div className="mt-[40vh] ml-[28%]">
                      Give prompt to see the products
                  </div>
              )
            }
          </div>
  
          {/* chatbox div */}
          <div className="w-[38%] ">
          <Chatbot setDatatoParent={handleProductData}/>
          </div>
          {/* product detail div */}
          <div className="bg-white w-[32%] ">
            <div className="shadow-md bg-zinc-100 h-[6vh] p-2">
              <h1 className="text-lg font-semibold text-gray-700">Product details</h1>
            </div>
            <ProductDetails productId={ProductId}/>
            
          </div>
        </div>
        
    )
}
export default AiHelper