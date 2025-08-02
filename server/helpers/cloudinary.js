const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name: "djnjjgyuz",
    api_key: "253966289137822",
    api_secret: "qZy6TiHu05YQ6sFQmNQB2xQnALU",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type : 'auto'
    })
    return result;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil};