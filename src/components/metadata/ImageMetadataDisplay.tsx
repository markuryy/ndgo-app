import React, { useEffect, useState } from 'react';
import { extract, parse, stringify } from 'stable-diffusion-image-metadata';

interface ImageData {
  url: string;
  id: string;
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
        const imageUrl = `/api/proxy/${encodeURIComponent(image.url)}`; // Use local proxy
        const [parameters, isParameters] = await extract(imageUrl);
        if (isParameters) {
          const metadata = parse(parameters);
          return metadata;
        }
        return {};
      });

      const metadataResults = await Promise.all(metadataPromises);
      setMetadataList(metadataResults);
    };

    fetchMetadata();
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