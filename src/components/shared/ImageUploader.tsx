"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImageIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { toast } from "../ui/use-toast";

type Props = {
  publicId: string;
  onValueChange: (value: string) => void;
  setImgUrl: Dispatch<SetStateAction<string>>;
  imgUrl: string;
};
const ImageUploader = ({
  publicId,
  onValueChange,
  setImgUrl,
  imgUrl,
}: Props) => {
  const [imgConfig, setImgConfig] = useState({ width: 0, height: 0 });

  const onUploadSuccess = (results: any) => {
    setImgUrl(results?.info?.secure_url);
    onValueChange(results?.info?.public_id);
    setImgConfig((prev) => ({
      ...prev,
      width: results?.info?.width,
      height: results?.info?.height,
    }));
  };

  const onUploadError = () => {
    toast({
      title: "Upload Error",
      description: "Failed to upload receipt please try again",
      variant: "destructive",
    });
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="every-penny"
        options={{
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={onUploadSuccess}
        onError={onUploadError}
      >
        {({ open }) => {
          return (
            <>
              {publicId && imgUrl ? (
                <Image
                  src={imgUrl}
                  width={imgConfig.width}
                  height={imgConfig.height}
                  alt="receipt"
                  className="aspect-video mt-4 object-cover"
                />
              ) : (
                <div
                  onClick={() => open()}
                  className="flex flex-col items-center p-4 cursor-pointer"
                >
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                  <p className="text-muted-foreground text-sm">Upload Image</p>
                </div>
              )}
            </>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUploader;
