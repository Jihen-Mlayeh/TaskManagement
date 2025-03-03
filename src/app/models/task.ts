export interface Task{
    id:number;
    title:string;
    description?:string;
    startDateTime:string;
    endDateTime:string;
    status:'EN_ATTENTE' | 'EN_COURS' |'FAITE';
}