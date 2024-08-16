import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as star}  from "@fortawesome/free-regular-svg-icons";
const ProductDetails = () => {
    
    return (
        <div className="overflow-auto h-[90%] p-2">
          <div className="p-2 space-y-2 flex flex-col overflow-y-auto flex-grow">
            <div className="flex items-center">
              <img src="https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=" className="w-[50%] rounded-md" alt="" />
              <div className="flex flex-col p-2">
                <h1 className="font-semibold     text-xl">title</h1>
                <div className="flex space-x-2 text-gray-400 items-center"><p>rating count</p> <p className="text-gray-900">review count</p></div>
                <p className="text-green-600 font-semibold">Special Price</p>
                <div className="flex space-x-2 items-center">
                  <p className="font-semibold text-2xl">50000</p>
                  <p className="font-semibold">45000</p>
                  <p className="text-green-600 text-sm">-11% off</p>
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
                  <img src="" alt="log" className="w-4 h-4" />
                  <h1 className="font-semibold ml-1">Bank Offer</h1>
                  <p>15% Instant discount on first Flipkart Pay Later order of 500 and above</p>
                  <button className="text-blue-500">T&C</button>
                </div>
                <div className="flex text-sm items-center space-x-1">
                  <img src="" alt="log" className="w-4 h-4" />
                  <h1 className="font-semibold ml-1">Bank Offer</h1>
                  <p>15% Instant discount on first Flipkart Pay Later order of 500 and above</p>
                  <button className="text-blue-500">T&C</button>
                </div>
                <div className="flex text-sm items-center space-x-1">
                  <img src="" alt="log" className="w-4 h-4" />
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
                <li className="text-sm font-normal">Very focused camera</li>
              </ul>
            </div>
            <div className="flex space-x-10 text-sm font-semibold">
              <h1>Services</h1>
              <ul className="list-none space-y-1">
                <li className="text-sm font-normal space-x-1 flex">
                  <img src="" alt="log" className="h-4 w-4" />
                  <p>Lorem ipsum dolor sit amet.</p>
                </li>
                <li className="text-sm font-normal space-x-1 flex">
                  <img src="" alt="log" className="h-4 w-4" />
                  <p>Lorem ipsum dolor sit amet.</p>
                </li>
                <li className="text-sm font-normal space-x-1 flex">
                  <img src="" alt="log" className="h-4 w-4" />
                  <p>Lorem ipsum dolor sit amet.</p>
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
                <li>high pixel camera</li>
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
                <li className="space-x-10 items-center flex"><p>10</p> <p>UUBUBUE</p></li>
                <li className="space-x-10 items-center flex"><p>10</p> <p>UUBUBUE</p></li>
              </ul>
            </div>
          </div>

          <div className="p-2">
            <div className="p-2 flex space-x-6 items-center border border-gray-300"><h1 className="flex items-center">3.0<span><FontAwesomeIcon icon={faStar} /></span></h1><h1 className="text-sm font-semibold">(Review Count)Reviews</h1></div>
            <div className="p-2 border border-gray-300 text-sm space-y-1">
              <div className="p-2">
                <p>Stars</p>
                <p>Comment</p>
                <p className="text-sm">By PersonName</p>
              </div>

            </div>
          </div>


        </div>
    )
}
export default ProductDetails;