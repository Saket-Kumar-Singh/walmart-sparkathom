const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../routes/utils/searchFeatures');
const ErrorHandler = require('../routes/utils/errorHandler');
const cloudinary = require('cloudinary');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold }  = require("@google/generative-ai");
const axios = require('axios'); // or node-fetch
var similarity = require( 'compute-cosine-similarity' );
const { storeUserChat } = require('./userController');
const User = require('../models/userModel');

async function find_embedding(product) {

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    // For embeddings, use the Text Embeddings model
    const model = genAI.getGenerativeModel({ model: "text-embedding-004"});
    
    const text = product;
    
    const result = await model.embedContent(text);
    const embedding = result.embedding;
    return embedding.values;
} 



// Get All Products
exports.getProductByEmbeddings = asyncErrorHandler(async (req, res, next) => {
    resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    const text = req.query.text;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);    
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "You are a customer relation model for a e commerce website to help the user find the best product \
        for them. You are a helpful assistant. You will inquire more about the products and what do they want. You will not make any recommendations\
        Every time you start your converation your sentence starts with \"These are top 5 products that are similar to your search\" and then you say further \
        make sure you keep it crisp.",
      });

    
    const summarizer = genAI.getGenerativeModel({
        model : "gemini-1.5-flash",
        systemInstruction: "Summarize the text and give the summary of the demand of customer. like the user firt asked for dress and then writes show me \
        it should be blue then the model will summarize it as \"A Blue Dress\" you just give the description of product user wants and nothing more like A Blue Dress.",
    });

    // console.log(rfe)
    const currUser = await User.findById(req.query.id);
    
    var summTillNow = currUser.chats + " " + text;
    const result = await summarizer.generateContent(summTillNow);
    const response = await result.response;
    var textSummary = response.text();
    
    const res2 = await model.generateContent(textSummary);
    const resp = await res2.response;
    const aiChat = resp.text();
    const AIRes = {
        "text" : aiChat
    };
    const searchEmbedding = await find_embedding(textSummary);
    
    textSummary = textSummary + " " + aiChat;

    const newUserData = {
        name: currUser.name,
        email: currUser.email,
        gender: currUser.gender,
        role: currUser.role,
        chats : textSummary,
    }

    console.log(newUserData);
    await User.findByIdAndUpdate(req.query.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    const rawProducts = await Product.find();

    // const res3 = await storeUserChat()
    const similarityScores = rawProducts.map(embedding => ({
        similarity: similarity(searchEmbedding, embedding.embeddings),
        _id: embedding._id
    }));
    
    // console.log(similarityScores)
    similarityScores.sort((a, b) => b.similarity - a.similarity);
    // console.log(similarityScores);
      // Get the top 5 document IDs
    const top5Ids = similarityScores.slice(0, 2).map(score => score._id);

    const products = await Product.find({ _id: { $in: top5Ids } });
    const filteredProductsCount = products.length;
    //  return nearestAnswers;
    const prodNames = products.map(prod => ({
        name : prod.name,
        id : prod._id
    }));

    res.status(200).json({
        success: true,
        prodNames,
        AIRes,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
})


exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    // console.log(req.query);
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    // console.log(req.query);

    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get All Products ---Product Sliders
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    console.log(req.body);
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Get All Products ---ADMIN
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});



// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];
    console.log(req.body)
    let discount=Math.ceil(((req.body.price-req.body.cuttedPrice)/req.body.price)*100);


    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    const result = await cloudinary.v2.uploader.upload(req.body.logo, {
        folder: "brands",
    });
    const brandLogo = {
        public_id: result.public_id,
        url: result.secure_url,
    };

    req.body.brand = {
        name: req.body.brandname,
        logo: brandLogo
    }
    req.body.images = imagesLink;
    req.body.user = req.user.id;
    req.body.discount=discount;
    

    req.body.embeddings = await find_embedding(req.body.description);

    let specs = [];
    req.body.specifications.forEach((s) => {
        specs.push(JSON.parse(s))
    });
    req.body.specifications = specs;

    const product = await Product.create(req.body);
    // console.log(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

// Update Product ---ADMIN
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    if (req.body.images !== undefined) {

        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imagesLink;
    }

    if (req.body.logo.length > 0) {
        await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
        const result = await cloudinary.v2.uploader.upload(req.body.logo, {
            folder: "brands",
        });
        const brandLogo = {
            public_id: result.public_id,
            url: result.secure_url,
        };

        req.body.brand = {
            name: req.body.brandname,
            logo: brandLogo
        }
    }

    let specs = [];
    req.body.specifications.forEach((s) => {
        specs.push(JSON.parse(s))
    });
    req.body.specifications = specs;
    req.body.user = req.user.id;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        product
    });
});

// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(201).json({
        success: true
    });
});

// Create OR Update Reviews
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (isReviewed) {

        product.reviews.forEach((rev) => { 
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating, rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Get All Reviews of Product
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete Reveiws
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings: Number(ratings),
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});