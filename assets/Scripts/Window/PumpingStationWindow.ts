import { _decorator, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('PumpingStationWindow')
export class PumpingStationWindow extends BaseWindow {
    
    protected onLoad(): void {
        this.windowName.fontSize = 43;
        this.windowName.string = "Pumping Station";
    }

}


