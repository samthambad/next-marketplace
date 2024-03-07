'use client'
import { useState } from 'react';
import Compressor from 'compressorjs';

const ImageUploader = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleImages(newFiles);
  };
  
  const handleImages = (newFiles: File[]) => {
    const newPreviews: string[] = [];
    const newCompressedFiles: File[] = [];
    // convert the files to string and append to newPreviews
    newFiles.forEach((file) => {
      // make sure file is <=10mb
      if (file.size <= 10 * 1024 * 1024) {
          // Compress image
          new Compressor(file, {
            quality: 0.6,
            success(result) {
              newCompressedFiles.push(result as File);
              newCompressedFiles.forEach((compressedFile) => {
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                // when the file reading operation completes, the below happens
                reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                setPreviews([...previews, ...newPreviews])
              }
              
            })
            setFiles([...files, ...newCompressedFiles]);
            },
            error(err) {
              console.log('Compression error:', err.message);
            },
          });
      }
      else {
        alert(`File ${file.name} exceeds the size limit of 10MB and will not be uploaded`)
      }
  })
  };
  
  return (
    <div
    className="drop-area border py-10 border-gray-300 p-4 rounded-lg w-3/5 mx-auto"
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
    >
    <p className='mb-2 border rounded-lg'>Drag and drop your image here</p>
      {previews.map((preview) => (
        <div>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        </div>
      ))}
        </div>
        );
      };
      
      export default ImageUploader;
      