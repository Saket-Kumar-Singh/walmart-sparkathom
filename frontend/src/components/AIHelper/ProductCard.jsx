const ProductCard=()=>{
    return (
        <div className="p-2 flex shadow-md hover:shadow-lg space-x-4 items-center bg-white rounded-md">
                      <div className="w-[30%] rounded h-auto">
                        <img src="https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=" alt="" className="rounded-md"/>
                      </div>
                      <div className="w-[70%] space-y-1 p-2 text-wrap">
                        <h1 className="font-semibold text-lg">Name</h1>
                        <p className="text-xs text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nulla non esse odio necessitatibus quibusdam vel est harum natus nobis.</p>
                        <p className="text-sm text-gray-900">Price</p>
                      </div>
                        
                    </div>
    )
}
export default ProductCard;