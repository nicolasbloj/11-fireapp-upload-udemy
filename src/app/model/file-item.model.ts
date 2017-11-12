export class FileItem {

    public file: File;
    public name: string;
    public url: string;

    public uploading = false;
    public progress = 0;

    constructor(file: File) {
        this.file = file;
        this.name = file.name;
    }

}
