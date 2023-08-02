import * as path from 'path';

export const getFileName = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);

  callback(null, `${Date.now()}${fileExtName}`);
};
export const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf|doc|docx|ppt|pptx|pptm|xlsx|xls)$/)) {
    return callback(
      new Error('Only pdf|doc|docx|ppt|pptx|pptm|xlsx|xls files are allowed!'),
      false,
    );
  }
  callback(null, true);
};
