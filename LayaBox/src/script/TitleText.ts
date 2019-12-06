import { Script } from "laya/components/Script";
import GameVars from "./GameVars";
import { Text } from "laya/display/Text";
import { Laya } from "Laya";

export default class TitleText extends Script {

    constructor() { super(); }

    onUpdate(): void {
        if (GameVars.score >= 0) {
            let owner = (this.owner as Text);
            owner.text = GameVars.score.toString();
            owner.pos(Laya.stage.width / 2 - owner.width / 2, owner.y);
            owner.fontSize = 62;
        }
    }
}