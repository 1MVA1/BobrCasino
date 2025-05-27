import { _decorator, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('TransportWindow')
export class TransportWindow extends BaseWindow {
    
    protected onLoad(): void {
        this.windowName.string = "Transport";
    }

}


