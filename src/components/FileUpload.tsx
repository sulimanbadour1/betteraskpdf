"use client";
import { uploadtoS3 } from "@/lib/s3";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      //   console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 10) {
        alert(
          "File size must be less than 10MB, Please uplaod a smaller file."
        );
        return;
      }
      try {
        const data = await uploadtoS3(file);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="p-2 bg-slate-50 rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-slate-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <div>
          <input {...getInputProps()} />
          <>
            <Inbox className="w-10 h-10 text-blue-500 " />
          </>
        </div>
        <p className="mt-2 text-sm text-slate-400">Upload PDF Here. </p>
      </div>
    </div>
  );
};

export default FileUpload;
