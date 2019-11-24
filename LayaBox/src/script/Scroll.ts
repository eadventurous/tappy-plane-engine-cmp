import { Script } from "laya/components/Script";
import { RigidBody } from "laya/physics/RigidBody";
import GameConstants from "./GameConstants";
import { Sprite } from "laya/display/Sprite";
import { Laya } from "Laya";
import { Pool } from "laya/utils/Pool";
import { Prefab } from "laya/components/Prefab";

export default class Scroll extends Script {

     /** @prop {name:groundPrefab,tips:"",type:Prefab}*/
     groundPrefab: Prefab;

     addedNext = false;

    constructor() { super(); }

    onUpdate(): void {
        var rig: RigidBody = this.owner.getComponent(RigidBody);
        rig.setVelocity({ x: -GameConstants.scrollV, y: 0 });
        var owner = this.owner as Sprite;
        if(owner.x <= Laya.stage.width - owner.width && !this.addedNext){
            let ground: Sprite = Pool.getItemByCreateFun("ground", this.groundPrefab.create, this.groundPrefab);
            ground.pos(owner.x + owner.width - 2, owner.y);
            ground.scaleY = owner.scaleY;
            Laya.stage.addChild(ground);
            (ground.getComponent(Scroll) as Scroll).groundPrefab = this.groundPrefab;
            this.addedNext = true;
        }

        if(owner.x < -owner.width){
            owner.removeSelf();
        }
    }
}