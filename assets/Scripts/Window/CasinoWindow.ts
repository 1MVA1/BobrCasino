import { _decorator, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
import { ResourceList } from '../Resources/ResourceList';
const { ccclass } = _decorator;

@ccclass('CasinoWindow')
export class CasinoWindow extends BaseWindow 
{
    resourceList: ResourceList = null!;

    protected onLoad(): void {
        this.windowName.string = "Casino";
    }
}