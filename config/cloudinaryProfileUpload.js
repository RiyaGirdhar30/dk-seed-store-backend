import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "dkseedstore/users",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const uploadProfileImage = multer({ storage });

export default uploadProfileImage; // ✅ THIS LINE IS REQUIRED
