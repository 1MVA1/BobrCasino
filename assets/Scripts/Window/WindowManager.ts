import { _decorator, Component, instantiate, log, Node, Prefab } from 'cc';
import { ForestWindow } from './ForestWindow';
import { GardenWindow } from './GardenWindow';
import { PotteryWindow } from './PotteryWindow';
import { PumpingStationWindow } from './PumpingStationWindow';
import { TransportWindow } from './TransportWindow';
import { WarehouseWindow } from './WarehouseWindow';
import { BaseWindow } from './BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('WindowManager')
export class WindowManager extends Component {

    @property({
        type:Prefab,
        tooltip:"Prefab for forest window"
    })
    public ForestPrefab:Prefab = null!;

    @property({
        type:Prefab,
        tooltip:"Prefab for garden window"
    })
    public GardenPrefab:Prefab = null!;
    
    @property({
        type:Prefab,
        tooltip:"Prefab for pottery window"
    })
    public PotteryPrefab:Prefab = null!;

    @property({
        type:Prefab,
        tooltip:"Prefab for pumping station window"
    })
    public PumpingStationPrefab:Prefab = null!;

    @property({
        type:Prefab,
        tooltip:"Prefab for transport window"
    })
    public TransportPrefab:Prefab = null!;

    @property({
        type:Prefab,
        tooltip:"Prefab for warehouse window"
    })
    public WarehousePrefab:Prefab = null!;

    private NewWindow:Node = null;

    public openWindow(event: Event, typeOfWindow:string){
       
        if (this.NewWindow != null)
        {
            this.NewWindow.destroy();
            this.NewWindow = null;
        }

        let windowComp:unknown

        switch(typeOfWindow)
        {
            case "Forest":
                if (this.NewWindow == null)
                {
                    this.NewWindow = instantiate(this.ForestPrefab);
                    this.node.addChild(this.NewWindow);
                }
                windowComp = this.NewWindow.getComponent(ForestWindow);
                break;

            case "Garden":
                if (this.NewWindow == null)
                {
                    this.NewWindow = instantiate(this.GardenPrefab);
                    this.node.addChild(this.NewWindow);
                }
                windowComp = this.NewWindow.getComponent(GardenWindow);
                break;

            case "Pottery":
                if (this.NewWindow == null)
                {
                    this.NewWindow = instantiate(this.PotteryPrefab);
                    this.node.addChild(this.NewWindow);
                }
                windowComp = this.NewWindow.getComponent(PotteryWindow);
                break;

            case "PumpingStation":
                if (this.NewWindow == null)
                {
                    this.NewWindow = instantiate(this.PumpingStationPrefab);
                    this.node.addChild(this.NewWindow);
                }
                windowComp = this.NewWindow.getComponent(PumpingStationWindow);
                break;

            case "Transport":
                if (this.NewWindow == null)
                {
                    this.NewWindow = instantiate(this.TransportPrefab);
                    this.node.addChild(this.NewWindow);
                }
                windowComp = this.NewWindow.getComponent(TransportWindow);
                break;

            case "Warehouse":
                if (this.NewWindow == null)
                {
                    this.NewWindow = instantiate(this.WarehousePrefab);
                    this.node.addChild(this.NewWindow);
                }
                windowComp = this.NewWindow.getComponent(WarehouseWindow);
                break;

            case "None":
                log("WindowManager: Window type is set to None");
                return;

            default:
                log("WindowManager: Wrong window number to open");
                return;
        }
        (<BaseWindow>windowComp)?.openButtonClicked();
    }
}


