export const compressImage = (imageDataUrl, maxWidth = 800) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageDataUrl;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to JPEG with reduced quality
      const compressedImage = canvas.toDataURL('image/jpeg', 0.6);
      resolve(compressedImage);
    };
  });
}; 