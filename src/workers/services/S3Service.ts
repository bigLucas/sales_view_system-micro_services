import { S3 } from 'aws-sdk';

export class S3Service {
    private s3: S3;

    public constructor(private bucketName: string) {
        this.s3 = new S3({ apiVersion: '2006-03-01' });
    }

    public async upload(fileName: string, fileContent: string): Promise<void> {
        await this.s3
            .upload({
                Bucket: this.bucketName,
                Key: fileName,
                Body: fileContent,
            })
            .promise();
    }
}
