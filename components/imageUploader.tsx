'use client'
import { useState } from 'react';
import Compressor from 'compressorjs';

const ImageUploader = () => {
  const [compressedPreview, setCompressedPreview] = useState<string>('');
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      handleImage(file);
    } else {
      alert('File size exceeds the limit of 10MB.');
    }
  };
  
  const handleImage = (file: File) => {
    // Compress image
    new Compressor(file, {
      quality: 0.6,
      success(result) {
        console.log('Compressed image:', result);
        if (result instanceof File || result instanceof Blob) {
          // If result is a File or Blob, convert it to a data URL
          const reader = new FileReader();
          reader.onloadend = () => {
            setCompressedPreview(reader.result as string);
          };
          reader.readAsDataURL(result);
        }
      },
      error(err) {
        console.log('Compression error:', err.message);
      },
    });
  };
  
  return (
    <div
    className="drop-area border py-10 border-gray-300 p-4 rounded-lg w-3/5 mx-auto"
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
    >
    <p>Drag and drop your image here</p>
      {compressedPreview && (
        <div>
        <h3>Compressed Image Preview:</h3>
        <img className= 'mx-auto' src={compressedPreview} alt="Compressed Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
        )}
        </div>
        );
      };
      
      export default ImageUploader;
      