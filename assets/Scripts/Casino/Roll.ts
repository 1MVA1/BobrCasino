import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { ResourceList } from '../Resources/ResourceList';
import { CasinoWindow } from '../Window/CasinoWindow';
const { ccclass, property } = _decorator;

@ccclass('Roll')
export class Roll extends Component {
    @property([SpriteFrame])
    images: SpriteFrame[] = [];

    @property(Node)
    slot1: Node = null!;

    @property(Node)
    slot2: Node = null!;

    @property(Node)
    slot3: Node = null!;

    @property(CasinoWindow)
    casino: CasinoWindow = null!;

    private resourceList: ResourceList = null!;

    private isRolling: boolean = false;
    private rollResults: number[] = [];

    private weights: number[] = [30, 25, 15, 15, 10, 5];

    private tripleRewards = [
    {
        name: "Var3",
        apply: (rl: ResourceList) => rl.AddAmtToResource("Coin", 1)
    },
    {
        name: "Var6",
        apply: (rl: ResourceList) => rl.AddNewResource("Soup", 5)
    },
    {
        name: "Var2",
        apply: (rl: ResourceList) => rl.AddNewResource("Beaver", 5)
    },
    {
        name: "Var5",
        apply: (rl: ResourceList) => rl.AddAmtToResource("Coin", 10)
    },
    {
        name: "Var1",
        apply: (rl: ResourceList) => rl.AddAmtToResource("Coin", 50)
    },
    {
        name: "Var4",
        apply: (rl: ResourceList) => rl.AddAmtToResource("Coin", 100)
    }
];

    private rollingCallbacks: ((...args: any[]) => void)[] = [];

    public triggerRoll() 
    {
        if (this.isRolling) return;

        this.resourceList = this.casino.resourceList;

        const coinRes = this.resourceList.FindResourceByName('Coin');

        if (!coinRes || coinRes.resAmount <= 0) {
            console.warn("Недостаточно монет для запуска рулетки");
            return;
        }

        this.resourceList.AddAmtToResource("Coin", -1);
        this.startRoll();
    }

    private startRoll() {
        this.isRolling = true;

        this.rollResults = [
            this.getWeightedRandomIndex(),
            this.getWeightedRandomIndex(),
            this.getWeightedRandomIndex()
        ];

        this.startSlotRolling(this.slot1, 0);
        this.startSlotRolling(this.slot2, 1);
        this.startSlotRolling(this.slot3, 2);

        this.scheduleOnce(() => this.stopSlot(this.slot1, 0), 4);
        this.scheduleOnce(() => this.stopSlot(this.slot2, 1), 5);
        this.scheduleOnce(() => this.stopSlot(this.slot3, 2), 6);
        this.scheduleOnce(() => this.checkTripleReward(), 6.5);
    }

    private startSlotRolling(slot: Node, index: number) {
        const sprite = slot.getComponent(Sprite);
        const callback = () => {
            const randomIndex = Math.floor(Math.random() * this.images.length);
            sprite.spriteFrame = this.images[randomIndex];
        };

        this.rollingCallbacks[index] = callback;
        this.schedule(callback, 0.1);
    }

    private stopSlot(slot: Node, index: number) {
        const callback = this.rollingCallbacks[index];
        if (callback) {
            this.unschedule(callback); 
        }

        const sprite = slot.getComponent(Sprite);
        const resultIndex = this.rollResults[index];
        sprite.spriteFrame = this.images[resultIndex];
    }

    private getWeightedRandomIndex(): number 
    {
        const totalWeight = this.weights.reduce((a, b) => a + b, 0);
        const rand = Math.random() * totalWeight;
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += this.weights[i];
            if (rand < sum) return i;
        }
        return this.weights.length - 1; 
    }

    private checkTripleReward() 
    {
        this.isRolling = false

        const idx0 = this.rollResults[0];
        const idx1 = this.rollResults[1];
        const idx2 = this.rollResults[2];

        if (idx0 !== idx1 || idx1 !== idx2) return;

        const resName = this.images[idx0].name;
        const match = this.tripleRewards.find(r => r.name === resName);
        if (!match) return;

        if (this.resourceList) {
        match.apply(this.resourceList);
        } else {
            console.warn("resourceList is null, can't apply triple reward");
        }
    }
}