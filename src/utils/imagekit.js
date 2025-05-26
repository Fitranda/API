const ImageKit = require("imagekit");

// Image kit init
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Image upload function to imagekit
async function imageUpload(file) {
  const uploadedFile = await imagekit.upload({
    file: file.buffer, // use buffer, not data
    fileName: file.originalname, // use originalname, not name
  });
  return uploadedFile?.url;
}

module.exports = { imageUpload };
