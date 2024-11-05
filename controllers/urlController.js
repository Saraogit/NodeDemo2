const shortenUrl = require("./../models/urlModel")
const shortid = require("shortid");

exports.addNewUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) {
        return res.status(404).json({
            error: "url is required to create short url"
        })
    }
    const urlObj = {
        originalUrl: body.url,
        shortUrl: shortid.generate()
    }
    try {
        const newUrlAdded = await shortenUrl.create(urlObj);
        res.status(201).json({
            status: "Success",
            msg: "URL addded successfully",
            shorturl: newUrlAdded.shortUrl,
            id: newUrlAdded._id
        })
    } catch (err) {
        console.log("URL failed to save");
        if (err.code == 11000) {
            res.status(200).json({
                msg: "URL already saved"
            })
        }
        res.status(404).json({
            status: "Failed",
            error: err.message
        })
    }

}

exports.getAllUrls = async (req, res) =>{
    try{
    const allUrls = await shortenUrl.find();
    res.status(200).json({
            status: "Success",
            results: allUrls.length,
            data: {
                URLdetails: allUrls
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Failed to fetch",
            error: err.message
        })
    }
}

exports.getshortenUrl = async (req, res) => {
    const id = req.params.id;
    const urlObj = await shortenUrl.findById(id);
    if (!urlObj) {
        res.status(404).json({
            status: "id not found",
        })
    }
    res.status(201).json({
        status: "Success",
        data: {
            urlData: urlObj
        }
    })
}

exports.deleteById = async (req, res)=>{
    try{
    const response = await shortenUrl.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "Deleted sucessfully",
        data: {
            dataDeleted: response
        }
    });

    }catch(err){
        res.status(404).json({
            status: "failed to delete",
            msg: err.message,
            details:"Please check url id"
        })
    }
}

exports.updateUrl = async (req, res)=>{
    try{
    const response = await shortenUrl.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        includeResultMetadata: true
    });
    res.status(200).json({
        status: "Success",
        data: {
            newUrlDetails: response
        }
    });
    }catch(err){
        res.status(404).json({
            status: "failed to update",
            msg: err.message,
            details:"Please check url id"
        })
    }
}