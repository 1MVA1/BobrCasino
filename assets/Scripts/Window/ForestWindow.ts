import { _decorator, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('ForestWindow')
export class ForestWindow extends BaseWindow {
    
    protected onLoad(): void {
        this.windowName.string = "Forest";
    }

}


