export enum MessageType{
    success = 'success',
    error = 'error'
}

export interface Message{
    title: string;
    type: MessageType;
}

export enum Messages{
    
}