import ProductModel from "../models/product.model.js";

import mongoose from 'mongoose';


export const createProductController = async(req,res)=>{
    try {
        const { 
            name ,
            image ,
            category,
            subcategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        } = req.body 

        if(!name || !image[0] || !category[0] || !subcategory[0] || !unit || !price || !description ){
            return res.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const product = new ProductModel({
            name ,
            image ,
            category,
            subcategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        })
        const saveProduct = await product.save()

        return res.json({
            message : "Product Created Successfully",
            data : saveProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductController = async(req,res)=>{
    try {
        
        let { page, limit, search } = req.body 

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subcategory'),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount,
            totalNoPage : Math.ceil( totalCount / limit),
            data : data
        })  
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByCategory = async(req,res)=>{
    try {
        const { id } = req.body 

        if(!id){
            return res.status(400).json({
                message : "provide category id",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.find({ 
            category : { $in : id }
        }).limit(15)

        return res.json({
            message : "category product list",
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByCategoryAndSubCategory = async (req, res) => {
    try {
        const { categoryId, subcategoryId, page = 1, limit = 10 } = req.body;

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(categoryId) || !mongoose.Types.ObjectId.isValid(subcategoryId)) {
            return res.status(400).json({
                message: "Invalid categoryId or subCategoryId",
                error: true,
                success: false,
            });
        }

        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
        const subcategoryObjectId = new mongoose.Types.ObjectId(subcategoryId);

        const skip = (page - 1) * limit;

        const products = await ProductModel.find({
            category: categoryObjectId,
            subcategory: subcategoryObjectId, 
        })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalCount = await ProductModel.countDocuments({
            category: categoryObjectId,
            subcategory: subcategoryObjectId, 
        });

        return res.status(200).json({
            message: "Products fetched successfully",
            data: products,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            error: false,
            success: true,
        });

    } catch (error) {
        console.error("Error in getProductByCategoryAndSubCategory:", error);
        return res.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false,
        });
    }
};


export const getProductDetails = async(req,res)=>{
    try {
        const { productId } = req.body 

        const product = await ProductModel.findOne({ _id : productId })


        return res.json({
            message : "product details",
            data : product,
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const updateProductDetails = async(req,res)=>{
    try {
        const { _id } = req.body 

        if(!_id){
            return res.status(400).json({
                message : "provide product _id",
                error : true,
                success : false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id : _id },{
            ...req.body
        })

        return res.json({
            message : "updated successfully",
            data : updateProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const deleteProductDetails = async(req,res)=>{
    try {
        const { _id } = req.body 

        if(!_id){
            return res.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({_id : _id })

        return res.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const searchProduct = async(req,res)=>{
    try {
        let { search, page , limit } = req.body 

        if(!page){
            page = 1
        }
        if(!limit){
            limit  = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = ( page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt  : -1 }).skip(skip).limit(limit).populate('category subcategory'),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            message : "Product data",
            error : false,
            success : true,
            data : data,
            totalCount :dataCount,
            totalPage : Math.ceil(dataCount/limit),
            page : page,
            limit : limit 
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}