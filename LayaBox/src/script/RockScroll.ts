import { Script } from "laya/components/Script";
import { RigidBody } from "laya/physics/RigidBody";
import GameVars from "./GameVars";
import { Sprite } from "laya/display/Sprite";
import { Node } from "laya/display/Node";

export default class RockScroll extends Script {

    constructor() { super(); }

    public plane: Node;

    passed = false;

    onStart(): void {
        var rig: RigidBody = this.owner.getComponent(RigidBody);
        rig.setVelocity({ x: -GameVars.scrollV, y: 0 });
    }

    onUpdate(): void {
        var owner = this.owner as Sprite;
        var plane = (this.plane as Sprite);

        if (plane.x + plane.width / 2 >
            (owner.rotation > 0 ? owner.x - owner.width / 2 : owner.x + owner.width / 2) 
            && !this.passed) {
                GameVars.score++;
                this.passed = true;
        }

        if (owner.x < -owner.width) {
            owner.removeSelf();
        }
    }
}