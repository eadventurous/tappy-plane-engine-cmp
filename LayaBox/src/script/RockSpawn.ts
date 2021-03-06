import { Script } from "laya/components/Script";
import { Sprite } from "laya/display/Sprite";
import { Laya } from "Laya";
import { Pool } from "laya/utils/Pool";
import { Prefab } from "laya/components/Prefab";
import { RandX } from "laya/d3/math/RandX";
import RockScroll from "./RockScroll";
import { Node } from "laya/display/Node";

export default class RockSpawn extends Script {

    /** @prop {name:rockPrefab,tips:"",type:Prefab}*/
    rockPrefab: Prefab;

    /** @prop {name:plane,tips:"",type:Node}*/
    plane: Node;

    rockSpawnTime = 3300;
    rockSpawnTimeVariation = 700;
    rockSpawnCountdown = 0;
    upperRock = false;

    constructor() { super(); }

    onUpdate(): void {
        this.rockSpawnCountdown -= Laya.timer.delta;
        if (this.rockSpawnCountdown <= 0) {
            let rock: Sprite = Pool.getItemByCreateFun("rock", this.rockPrefab.create, this.rockPrefab);
            rock.pos(Laya.stage.width + (this.upperRock ? rock.width : 0),
             this.upperRock ? rock.height : Laya.stage.height - rock.height);
            rock.rotation = this.upperRock ? 180 : 0;
            rock.zOrder = 3;
            (rock.getComponent(RockScroll) as RockScroll).plane = this.plane;
            this.upperRock = !this.upperRock;
            this.rockSpawnCountdown = this.rockSpawnTime + RandX.defaultRand.random() * this.rockSpawnTimeVariation;
            Laya.stage.addChild(rock);
        }
    }
}