import { Script } from "laya/components/Script";
import { RigidBody } from "laya/physics/RigidBody";
import GameVars from "./GameVars";
import { Sprite } from "laya/display/Sprite";

export default class Scroll extends Script {

    constructor() { super(); }

    onStart(): void {
        var rig: RigidBody = this.owner.getComponent(RigidBody);
        rig.setVelocity({ x: -GameVars.scrollV, y: 0 });
    }

    onUpdate(): void {
        var owner = this.owner as Sprite;

        if (owner.x < -owner.width) {
            owner.removeSelf();
        }
    }
}