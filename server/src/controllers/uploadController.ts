import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, 'uploads/');
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ 
  storage: storage,
  fileFilter: (req: any, file: any, cb: any) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

export const uploadFile = (req: Request, res: Response): void => {
  const request = req as any;
  
  let file = request.file;
  if (!file && request.files && Array.isArray(request.files) && request.files.length > 0) {
    file = request.files[0];
  }

  if (!file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }
  
  // Return the URL to the file
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
  res.status(200).json({ 
    url: fileUrl,
    success: true, // often expected by editors
    data: { // sometimes expected
        url: fileUrl
    }
  });
};
