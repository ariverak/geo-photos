import cloudinary from 'cloudinary-core';
const Cloudinary = new cloudinary.Cloudinary({cloud_name: process.env.REACT_APP_CLOUD_NAME, secure: true});
export default Cloudinary;
