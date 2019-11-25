import { Script } from "laya/components/Script";
import { RigidBody } from "laya/physics/RigidBody";
import { Event } from "laya/events/Event";
import GameVars from "./GameVars";
import { Laya } from "Laya";
import RockSpawn from "./RockSpawn";
import { Node } from "laya/display/Node";
import { Animation } from "laya/display/Animation"
import { Scene } from "laya/display/Scene";
import { ColliderBase } from "laya/physics/ColliderBase";
import { Handler } from "laya/utils/Handler";

export default class PlaneJump extends Script {

    /** @prop {name:rockSpawner,tips:"",type:Node}*/
    rockSpawner: Node;

    boost = 5;
    started = false;
    anim: Animation;

    constructor() { super(); }

    onStart(): void {
        this.anim = (this.owner as Animation);
    }

    onStageClick(e: Event): void{
        e.stopPropagation();
        let rig: RigidBody = this.owner.getComponent(RigidBody);

        if(!this.started){
            GameVars.scrollV = 2;
            (this.rockSpawner.getComponent(RockSpawn) as RockSpawn).enabled = true;
            this.started = true;
            rig.gravityScale = 1;
            this.anim.texture = null;
            GameVars.score = 0;
            this.anim.play();
        }

        rig.setVelocity({x: rig.linearVelocity.x, y:-this.boost});
    }

    onTriggerEnter(other: ColliderBase): void {
        Laya.stage.removeChildren();
        GameVars.scrollV = 0;
        GameVars.score = -1;
        Scene.load("Main.scene",new Handler(null, (scene: Scene) => Laya.stage.addChild(scene)));
    }
}