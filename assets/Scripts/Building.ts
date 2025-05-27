import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Building')
export class Building extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
    
    protected onLoad(): void {
        this.initListener();

    }

    initListener(): void {
        this.node.on(Node.EventType.TOUCH_START, () => {
            //console.log("Touched Building");
        })
    }
}


