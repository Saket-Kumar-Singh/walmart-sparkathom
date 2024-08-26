import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as star}  from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
const ProductDetails = ({productId}) => {
    const id=productId;
    const [ProductDetails,selectProductDetails]=useState();
    useEffect(()=>{
        axios.get(`/api/v1/product/${id}`).then(
           res=>selectProductDetails(res.data.product)
           
        )
    },[id]);
    return (
        ProductDetails?(
       <div className="overflow-auto h-[90%] p-2">
<div className="p-2 space-y-2 flex flex-col overflow-y-auto flex-grow">
  <div className="flex items-center">
    <img src={ProductDetails.images[0].url} className="w-[50%] rounded-md" alt="" />
    <div className="flex flex-col p-2">
      <h1 className="font-semibold     text-xl">{ProductDetails.name}</h1>
      <div className="flex space-x-2 text-gray-400 items-center"><p>{ProductDetails.ratings}</p> <p className="text-gray-900">{ProductDetails.numOfReviews}</p></div>
      <p className="text-green-600 font-semibold">Special Price</p>
      <div className="flex space-x-2 items-center">
        <p className="font-semibold text-2xl">{ProductDetails.price}</p>
        <p className="font-semibold">{ProductDetails.cuttedPrice}</p>
        <p className="text-green-600 text-sm">{ProductDetails.discount} off</p>
      </div>
      <p className="text-red-800">Hurry, Only 5 left</p>

    </div>
  </div>
  <div className="flex flex-col space-y-1">
    <h1 className="font-semibold">
      Available Offers
    </h1>
    <div className="space-y-1">
      <div className="flex text-sm items-center space-x-1">
        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="log" className="w-4 h-4" />
        <h1 className="font-semibold ml-1">Bank Offer</h1>
        <p>15% Instant discount on first Flipkart Pay Later order of 500 and above</p>
        <button className="text-blue-500">T&C</button>
      </div>
      <div className="flex text-sm items-center space-x-1">
        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="log" className="w-4 h-4" />
        <h1 className="font-semibold ml-1">Bank Offer</h1>
        <p>15% Instant discount on first Flipkart Pay Later order of 500 and above</p>
        <button className="text-blue-500">T&C</button>
      </div>
      <div className="flex text-sm items-center space-x-1">
        <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="log" className="w-4 h-4" />
        <h1 className="font-semibold ml-1">Bank Offer</h1>
        <p>15% Instant discount on first Flipkart Pay Later order of 500 and above</p>
        <button className="text-blue-500">T&C</button>
      </div>

    </div>

  </div>
  <div className="flex space-x-10 text-sm font-semibold">
    <h1>Delivery</h1>
    <h1>Delivery by Thu,22 Aug</h1>
  </div>
  <div className="flex space-x-10 text-sm font-semibold">
    <h1>Highlights</h1>
    <ul className="list-disc">
      <li className="text-sm font-normal">{ProductDetails.highlights}</li>
    </ul>
  </div>
  <div className="flex space-x-10 text-sm font-semibold">
    <h1>Services</h1>
    <ul className="list-none space-y-1">
      <li className="text-sm font-normal space-x-1 flex">
      <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="log" className="w-4 h-4" />
        <p>2 Year</p>
      </li>
      <li className="text-sm font-normal space-x-1 flex">
      <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-hwaqf3-MuiSvgIcon-root h-4 w-4" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CachedIcon"><path d="m19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></svg>
        <p>7 Days Replacement Policy</p>
      </li>
      <li className="text-sm font-normal space-x-1 flex">
      <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="log" className="w-4 h-4" />
        <p>Cash on Delivery available</p>
      </li>
    </ul>
  </div>
  <div className="flex space-x-14 text-sm font-semibold">
    <h1>Seller</h1>
    <h1 className="text-blue-500">Nikon</h1>
  </div>

</div>
<div className="p-2">
  <h1 className="font-bold text-xl border  border-gray-300 p-2">
    Product Description
  </h1>
  <div className="p-2 border border-gray-300 text-sm">
    <ul>
      <li>{ProductDetails.description}</li>
    </ul>

  </div>
</div>

<div className="p-2">
  <h1 className="font-bold text-xl border  border-gray-300 p-2">
    Specifications
  </h1>
  <div className="p-2 space-y-1 border border-gray-300 text-sm">
    <h1>General</h1>
    <ul className="space-y-2">
      {
        ProductDetails.specifications.map((item,index)=>(
          <li key={index} className="items-center flex"><p className="w-[40%]">{item.title}</p> <p>{item.description}</p></li>
       ))
      }
    </ul>
  </div>
</div>

<div className="p-2">
  <div className="p-2 flex space-x-6 items-center border border-gray-300"><h1 className="flex items-center">1<span><FontAwesomeIcon icon={faStar} /></span></h1><h1 className="text-sm font-semibold">{ProductDetails.numOfReviews} Reviews</h1></div>
  <div className="p-2 border border-gray-300 text-sm space-y-1">
    <div className="p-2">
      {
        ProductDetails.reviews.map((item,index)=>(
          <>
          <p>{item.rating}</p>
          <p>{item.comment}</p>
          <p className="text-sm">By {item.name}</p></>
        ))
      }
      
    </div>

  </div>
</div>


</div>
        ):
        (
           <div className="mt-[48%] text-xl flex justify-center">select A product to view it's details</div>
        )
    )
}
export default ProductDetails;