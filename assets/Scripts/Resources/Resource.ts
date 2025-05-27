import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Resource')
export class Resource {

    @property
    resName: string = '';

    @property
    resAmount: number = 0;

    @property(SpriteFrame)
    iconSF: SpriteFrame | null = null;
}


