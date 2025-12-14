"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BusinessProfileFormType } from "./b2b-create-form-schema";

const AttachmentCard = () => {
  const { setValue, watch } = useFormContext<BusinessProfileFormType>();

  const companyImgUrl = watch("companyImgUrl");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setUploadError(null);

    if (!selectedFile) return;

    setUploading(true);
    try {
      // 1. Request signed URL from your backend
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/upload/signed-url",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: selectedFile.name,
            fileType: selectedFile.type,
            module: "lead-manager/b2b",
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to get signed URL: ${res.statusText}`);
      }

      const { signedUrl, publicUrl } = await res.json();

      // 2. Upload the file to S3 with PUT
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      console.log(publicUrl, "public url");

      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.statusText}`);
      }

      // 3. Set the public URL into form state for submission
      setValue("companyImgUrl", publicUrl, { shouldValidate: true });

      // Optional: update preview to public URL after upload success
      setPreview(publicUrl);
    } catch (error: any) {
      setUploadError(error.message || "Upload error");
      setPreview(null);
      setValue("companyImgUrl", "", { shouldValidate: true });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (companyImgUrl) {
      setPreview(companyImgUrl);
    } else {
      setPreview(null);
    }
  }, [file, companyImgUrl]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Image</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="companyImgUrl">Upload Company Image</Label>

          <Input
            id="companyImgUrl"
            type="file"
            accept="image/*"
            onChange={handleChange}
            disabled={uploading}
          />

          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, WEBP
          </p>
        </div>

        {uploadError && (
          <p className="text-sm text-red-600">Upload error: {uploadError}</p>
        )}

        {preview && (
          <div className="flex gap-3">
            <img
              src={preview}
              alt="Company Image Preview"
              className="h-28 w-28 rounded-md border object-cover"
            />
          </div>
        )}

        {file && !uploading && (
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}

        {uploading && (
          <p className="text-sm text-muted-foreground">Uploading...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AttachmentCard;
