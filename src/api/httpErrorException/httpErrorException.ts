class HttpErrorException extends Error {
    public status: number;
    public message: string;

    constructor(status: { code: number, message: string }, message?: string) {

        if (message) {
            super(message);
            this.message = message;
        } else {
            super(status.message);
            this.message = status.message;
        }
        this.status = status.code;
    }
}

export default HttpErrorException;
