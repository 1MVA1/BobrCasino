import { _decorator, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('GardenWindow')
export class GardenWindow extends BaseWindow {
    
    protected onLoad(): void {
        this.windowName.string = "Garden";
    }

}


