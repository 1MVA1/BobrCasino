import { _decorator, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('WarehouseWindow')
export class WarehouseWindow extends BaseWindow {
    
    protected onLoad(): void {
        this.windowName.string = "Warehouse";
        this.windowName.fontSize = 55.5;
    }
    
}