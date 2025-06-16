import QrScanner from 'qr-scanner';

export const detectQRType = (content: string): 'url' | 'email' | 'phone' | 'text' => {
  // URL detection
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  if (urlRegex.test(content) || content.startsWith('http')) {
    return 'url';
  }
  
  // Email detection
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(content) || content.startsWith('mailto:')) {
    return 'email';
  }
  
  // Phone detection
  const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
  const cleanPhone = content.replace(/[\s\-\(\)]/g, '');
  if (phoneRegex.test(cleanPhone) || content.startsWith('tel:')) {
    return 'phone';
  }
  
  return 'text';
};

export const formatContent = (content: string, type: string) => {
  switch (type) {
    case 'email':
      return content.startsWith('mailto:') ? content.substring(7) : content;
    case 'phone':
      return content.startsWith('tel:') ? content.substring(4) : content;
    case 'url':
      return content.startsWith('http') ? content : `https://${content}`;
    default:
      return content;
  }
};

export const scanImageFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      try {
        const result = await QrScanner.scanImage(canvas);
        resolve(result);
      } catch (error) {
        reject(new Error('No QR code found in image'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};