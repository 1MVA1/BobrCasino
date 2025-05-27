import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { Resource } from './Resource';
const { ccclass, property } = _decorator;

@ccclass('ResourceTemplate')
export class ResourceTemplate extends Component {
    
    @property(Sprite)
    public icon: Sprite | null = null;
    @property(Label)
    public resName: Label | null = null;
    @property(Label)
    public resAmount: Label | null = null;

    init(data: Resource){
        this.icon.spriteFrame = data.iconSF;
        this.resName.string = data.resName;
        this.resAmount.string = data.resAmount.toString();
    }
}


