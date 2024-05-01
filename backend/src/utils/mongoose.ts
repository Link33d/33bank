import mongoose from "mongoose";

export class mongooseClient
{

    constructor(private uri: string) {};

    async connect(): Promise<void> {

        try {
            await mongoose.connect(this.uri);
            console.log('Conexão bem-sucedida ao MongoDB.');
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            throw new Error(error as string);
        }
    }
}