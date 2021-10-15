import { ModelData } from "../model/modelInterface";

export interface PresenterInterface{
    getSetters: () => any;
    getGetters: () => any;
    getUpdateFunction: () => any;  
}

export interface PresenterEvents{
    start?: () => void;
    slide?: () => void;
    stop?: () => void;    
}

export interface PresenterOptions extends Partial<ModelData>, Partial<PresenterEvents>{};