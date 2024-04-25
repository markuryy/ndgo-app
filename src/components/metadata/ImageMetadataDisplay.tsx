import React, { useEffect, useState } from 'react';
import { extract, parse, stringify } from 'stable-diffusion-image-metadata';

interface ImageData {
  url: string;
  id: string; // Assuming each image object has an 'id' and 'url' field
}

interface ImageMetadataProps {
  images: ImageData[];
}

interface Metadata {
  [key: string]: any;
}

const ImageMetadataDisplay: React.FC<ImageMetadataProps> = ({ images }) => {
  const [metadataList, setMetadataList] = useState<Metadata[]>([]);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadataPromises = images.map(async (image) => {
        const [parameters, isParameters] = await extract(image.url);
        if (isParameters) {
          const metadata = parse(parameters);
          return metadata;
        }
        return {};
      });

      const metadataResults = await Promise.all(metadataPromises);
      setMetadataList(metadataResults);
    };

    fetchMetadata().catch(error => console.error('Failed to fetch metadata:', error));
  }, [images]);

  return (
    <div>
      {metadataList.map((metadata, index) => (
        <div key={index}>
          <h3>Metadata for Image {index + 1}</h3>
          <pre>{stringify(metadata)}</pre>
        </div>
      ))}
    </div>
  );
};

export default ImageMetadataDisplay;