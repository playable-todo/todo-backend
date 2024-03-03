import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface UploadedFiles {
    url: string;
    name: string;
    pathName: string,
    mimeType: string; 
}

async function uploadFiles(files: any[], who: string, deleteIfExist: string = ''): Promise<UploadedFiles[]> {
    try {
        const uploadedImages: UploadedFiles[] = [];

        if (deleteIfExist && fs.existsSync(deleteIfExist)) {
            fs.unlinkSync(deleteIfExist);
        }

        for (const file of files) {
            let compressedBuffer;
            let mimeType: string;

            if (file.mimetype.startsWith('image')) {
                // Sadece image mimetype'ine sahip dosyaları sıkıştır
                compressedBuffer = await sharp(file.buffer).toBuffer();
                mimeType = file.mimetype;
            } else {
                // Diğer dosyaları sıkıştırmadan bırak
                compressedBuffer = file.buffer;
                mimeType = file.mimetype;
            }

            // Klasör yolunu oluştur
            const folderPath = path.join(__dirname, '../../public', 'files', who);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            const filePath = path.join(folderPath, `${file.originalname}`);

            // Sıkıştırılmış veya sıkıştırılmamış resmi dosyaya yaz
            fs.writeFileSync(filePath, compressedBuffer);

            const url = '/static/files/' + who + file.originalname;
            const pathName = 'public/files/' + who + file.originalname;
            uploadedImages.push({ url, name: file.originalname, pathName, mimeType });
        }

        return uploadedImages;
    } catch (error) {
        throw error;
    }
}

async function deletedFiles(filePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                // Dosya mevcut, silelim
                fs.unlink(filePath, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                // Dosya mevcut değil, hiçbir şey yapmayalım
                resolve();
            }
        });
    });
}

module.exports = {uploadFiles, deletedFiles}