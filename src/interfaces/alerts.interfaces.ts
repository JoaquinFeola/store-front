



export interface IAlert {
    id?: string;
    message: string;
    type: IAlertType;
    duration: number;
};

export type IAlertType = 'warning' | 'success' | 'info' | 'error';
