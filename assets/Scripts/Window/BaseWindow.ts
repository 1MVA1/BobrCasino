import { _decorator, Component, Label, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseWindow')
export class BaseWindow extends Component {

    @property({
        type:Label,
        tooltip:"NameOfWindow"
    })
    protected windowName: Label;

    protected showWindow(){
        
        this.node.scale =  new Vec3(0.1, 0.1, 0.1);
        this.node.active = true;

        tween(this.node).to(0.5, 
            {scale: new Vec3(1, 1, 1)}, 
            { easing: 'expoOut' })
            .start();
    }

    private hideWindow(){

        tween(this.node).to(0.3, 
            {scale: new Vec3(0.1, 0.1, 0.1)}, 
            { easing: 'expoIn' })
            .call(() => { this.node.active = false; })
            .start();


    }

    public closeButtonClicked(){
        this.hideWindow();
    }

    public openButtonClicked(){
        this.showWindow();
    }
}


