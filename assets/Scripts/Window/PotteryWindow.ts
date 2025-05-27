import { _decorator, Label, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('PotteryWindow')
export class PotteryWindow extends BaseWindow {

    protected onLoad(): void {
        this.windowName.string = "Pottery";
    }

}


