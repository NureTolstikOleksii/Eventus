import { v2 as cloudinary } from 'cloudinary';

// Замените данные на свои
cloudinary.config({
  cloud_name: 'djst5z72d', // Имя вашего Cloudinary Cloud
  api_key: '662526612463334', // Ваш API Key
  api_secret: 'u75-0INikQ4bMNDcBx2VlRZ9-FQ', // Ваш API Secret
});

export default cloudinary;
