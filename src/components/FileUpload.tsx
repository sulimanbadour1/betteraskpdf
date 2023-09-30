"use client";
import { uploadtoS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";

const FileUpload = () => {
  const [uploading, setUploading] = React.useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      //   console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 10) {
        toast.error(
          "File size must be less than 10MB, Please uplaod a smaller file."
        );
        // alert(
        //   "File size must be less than 10MB, Please uplaod a smaller file."
        // );
        return;
      }
      try {
        setUploading(true);
        const data = await uploadtoS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast.error("Something went wrong, Please try again.");
          // alert("Something went wrong, Please try again.");
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log("data", data);
          },
          onError: (error) => {
            // console.log("error", error);
            toast.error("Error in creating chat, Please try again.");
          },
        });
        console.log("data", data);
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-4 bg-slate-50 rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-slate-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <div>
          <input {...getInputProps()} />
          {uploading || isLoading ? (
            <>
              {/* Loading  state */}
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              <p className="mt-2 text-sm text-slate-400">
                Uploading the files to GPT...
              </p>
            </>
          ) : (
            <div className="flex items-center justify-between ">
              <Inbox className="w-10 h-10 text-blue-500" />
              <p className="ml-4 mt-2 text-sm text-slate-400 text-center">
                Upload PDF Here.{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
