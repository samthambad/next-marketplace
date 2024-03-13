'use client'
import { useState } from 'react';
import Compressor from 'compressorjs';
import Image from 'next/image'

const ImageUploader = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleImages(newFiles);
  };
const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newFiles = Array.from(e.target.files ?? []);
  handleImages(newFiles);
};
const handleImages = async (newFiles: File[]) => {
  const newPreviews: string[] = [];
  const newCompressedFiles: File[] = [];

  // Create an array of promises for compressing each file
  const compressionPromises = newFiles.map(file => new Promise<File>((resolve, reject) => {
    if (file.size <= 10 * 1024 * 1024) {
      // Compress image
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          newCompressedFiles.push(result as File);
          resolve(result as File); // Resolve the promise with the compressed file
        },
        error(err) {
          console.log('Compression error:', err.message);
          reject(err); // Reject the promise if there's an error
        },
      });
    } else {
      alert(`File ${file.name} exceeds the size limit of 10MB and will not be uploaded`)
      reject(new Error(`File ${file.name} exceeds the size limit of 10MB`)); // Reject the promise if file size exceeds the limit
    }
  }));

  try {
    // Wait for all compression promises to resolve
    await Promise.all(compressionPromises);

    // Once all files are compressed, generate previews
    for (const compressedFile of newCompressedFiles) {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      await new Promise<void>((resolve, reject) => {
        // When the file reading operation completes
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          resolve(); // Resolve the inner promise once preview is added
        };
      });
    }

    // Update state with previews and compressed files
    setPreviews([...previews, ...newPreviews]);
    setFiles([...files, ...newCompressedFiles]);
  } catch (error) {
    console.error('Error handling images:', error);
  }
};

  
  return (
    <div className="drop-area border py-10 border-gray-300 p-4 rounded-lg w-3/5 mx-auto"
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
    >
      <p className='mb-2'><em>Drag and drop your image here</em></p>
      <input type="file" accept="image/*" onChange={handleFileInputChange}></input>
      {previews.map((preview,index) => (
        <div className='mx-auto' key={index}>
          <Image
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '300px' }}
            className='mx-auto'
          />
        </div>
      ))}
      <p className='font-bold mt-2'>Number of files to be uploaded: <em>{previews.length}</em></p>
    </div>
  );
      };
      
      export default ImageUploader;
      