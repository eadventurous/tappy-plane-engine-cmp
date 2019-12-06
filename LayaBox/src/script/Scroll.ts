import { Script } from "laya/components/Script";
import { RigidBody } from "laya/physics/RigidBody";
import GameVars from "./GameVars";
import { Sprite } from "laya/display/Sprite";
import { Laya } from "Laya";
import { Pool } from "laya/utils/Pool";
import { Prefab } from "laya/components/Prefab";
import { ChainCollider } from "laya/physics/ChainCollider";

export default class Scroll extends Script {

     /** @prop {name:groundPrefab,tips:"",type:Prefab}*/
     groundPrefab: Prefab;

     addedNext = false;

    constructor() { super(); }

    onUpdate(): void {
        var rig: RigidBody = this.owner.getComponent(RigidBody);
        rig.setVelocity({ x: -GameVars.scrollV, y: 0 });
        var owner = this.owner as Sprite;

        let spawnCondition = false;
        let upper = owner.rotation > 0;
        if(upper){
            spawnCondition = owner.x <= Laya.stage.width
        }
        else{
            spawnCondition = owner.x <= Laya.stage.width - owner.width
        }

        if(spawnCondition && !this.addedNext){
            let ground: Sprite = Pool.getItemByCreateFun("ground", this.groundPrefab.create, this.groundPrefab);
            ground.pos(owner.x + owner.width - 2, owner.y);
            ground.rotation = owner.rotation;
            (ground.getComponent(ChainCollider) as ChainCollider).resetShape;
            Laya.stage.addChild(ground);
            (ground.getComponent(Scroll) as Scroll).groundPrefab = this.groundPrefab;
            this.addedNext = true;
        }

        if(owner.x < -owner.width){
            owner.removeSelf();
        }
    }
}