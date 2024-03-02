import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface UploadedFiles {
    url: string;
    path: string;
    mimeType: string; 
}

async function uploadFiles(files: any[], who: string, deleteIfExist: string = ''): Promise<UploadedFiles[]> {
    try {
        const uploadedImages: UploadedFiles[] = [];

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

            if (deleteIfExist) {
                fs.unlinkSync(deleteIfExist);
            }

            // Sıkıştırılmış veya sıkıştırılmamış resmi dosyaya yaz
            fs.writeFileSync(filePath, compressedBuffer);

            const url = '/static/files/' + who + file.originalname;
            uploadedImages.push({ url, path: filePath, mimeType });
        }

        return uploadedImages;
    } catch (error) {
        throw error;
    }
}



module.exports = {uploadFiles}