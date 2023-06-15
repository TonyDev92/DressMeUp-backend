const cloudinary = require('cloudinary');

const deleteFile = (url) => {

    const imageSplited = url.split('/');
    const nameSplited = imageSplited[imageSplited.length - 1].split('.');

    const folder = imageSplited[imageSplited.length - 2];
    const imageToDelete = `${folder}/${nameSplited[0]}`;

    if(imageToDelete !== "DressMeUP/default_bathbi"){
        cloudinary.uploader.destroy(imageToDelete, () => console.log('Deleted image'))
    }
}

module.exports = { deleteFile };