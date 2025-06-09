import { _decorator, Component, instantiate, log, Prefab, Vec3, } from 'cc';
import { Resource } from './Resource';
import { ResourceTemplate } from './ResourceTemplate';
const { ccclass, property } = _decorator;


@ccclass('ResourceList')
export class ResourceList extends Component {

    @property({
        type:[Resource],
        tooltip:"Array of all resources"
    })
    public resources: Resource[] = [];

    @property({
        type:Prefab,
        tooltip:"Prefab of resource in top bar"
    })
    resourcePrefab: Prefab | null = null;

    public AddNewResource(newResourceName:string, amountOfRes:number){
        var foundRes = this.FindResourceByName(newResourceName);
        if (foundRes != undefined){
            console.log("Resource already exists!")
            return;
        }

        var res = new Resource();
        res.resName = newResourceName;
        res.resAmount = amountOfRes;
        this.resources.push(res);
    }

    public AddAmtToResource(resName:string, amountToAdd:number)
    {
        var foundRes = this.FindResourceByName(resName);

        if(foundRes == undefined){
            console.log("Not found this resource");
            return;
        }

        if(foundRes.resAmount + amountToAdd < 0){
            console.log("Resource is < 0");
            return;
        }

        foundRes.resAmount += amountToAdd;
    }

    public RemoveResourceByName(resName:string){
        var resIndex = this.FindIndexResourceByName(resName);
        if (resIndex > -1) {
            this.resources.splice(resIndex, 1);
        }
    }

    public FindResourceByName(resName:string){
        var foundRes = this.resources.find(res=>res.resName == resName);
        return foundRes;
    }

    public FindIndexResourceByName(resName:string){
        var foundIndex = this.resources.findIndex((res)=>{
            res.resName == resName;
        });
        return foundIndex;
    }

    public ListAllResources(){
        for(var res of this.resources)
        {
            console.log("Res name:", res.resName, "| Res amount:", res.resAmount);
        }
    }

    protected onLoad(): void {
        for (let i = 0; i < this.resources.length; ++i) {
            const item = instantiate(this.resourcePrefab);
            const data = this.resources[i];
            this.node.addChild(item);
            item.getComponent(ResourceTemplate).init(data);
        }
    }
}