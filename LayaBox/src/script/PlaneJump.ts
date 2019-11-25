import { Script } from "laya/components/Script";
import { RigidBody } from "laya/physics/RigidBody";
import { Sprite } from "laya/display/Sprite";
import { Event } from "laya/events/Event";

export default class PlaneJump extends Script {

    boost = 5;

    constructor() { super(); }

    onStageClick(e: Event): void{
        e.stopPropagation();
        let rig: RigidBody = this.owner.getComponent(RigidBody);
        rig.setVelocity({x: rig.linearVelocity.x, y:-this.boost});
    }

    onTriggerEnter(): void {

    }
}