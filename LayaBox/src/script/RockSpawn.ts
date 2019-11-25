import { Script } from "laya/components/Script";
import { Sprite } from "laya/display/Sprite";
import { Laya } from "Laya";
import { Pool } from "laya/utils/Pool";
import { Prefab } from "laya/components/Prefab";
import { RandX } from "laya/d3/math/RandX";

export default class RockSpawn extends Script {

    /** @prop {name:rockPrefab,tips:"",type:Prefab}*/
    rockPrefab: Prefab;

    rockSpawnTime = 3300;
    rockSpawnTimeVariation = 700;
    rockSpawnCountdown = 0;
    upperRock = false;

    constructor() { super(); }

    onUpdate(): void {
        this.rockSpawnCountdown -= Laya.timer.delta;
        if (this.rockSpawnCountdown <= 0) {
            let rock: Sprite = Pool.getItemByCreateFun("rock", this.rockPrefab.create, this.rockPrefab);
            rock.pos(Laya.stage.width, this.upperRock ? rock.height : Laya.stage.height - rock.height);
            rock.scaleY = this.upperRock ? -1 : 1;
            rock.zOrder = 3;
            this.upperRock = !this.upperRock;
            this.rockSpawnCountdown = this.rockSpawnTime + RandX.defaultRand.random()*this.rockSpawnTimeVariation;
            Laya.stage.addChild(rock);
        }
    }
}