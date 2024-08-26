const ProductCard=(props)=>{
    const {name,price,description,images} = props.props;
    const trimdescription =(description)=>{
      return description.length > 150? description.substring(0, 150) + '...' : description;
    }
    return (
        <div className="p-2 flex shadow-md hover:shadow-lg space-x-4 items-center bg-white rounded-md">
                      <div className="w-[30%] rounded h-auto">
                        <img src={`${images[0].url}`} alt="" className="rounded-md"/>
                      </div>
                      <div className="w-[70%] space-y-1 p-2 text-wrap">
                        <h1 className="font-semibold text-lg">{name}</h1>
                        <p className="text-xs text-gray-700 line-clamp-3">{trimdescription(description)}</p>
                        <p className="text-sm text-gray-900">₹{price}</p>
                      </div>
                        
                    </div>
    )
}
export default ProductCard;