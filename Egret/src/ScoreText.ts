class ScoreText extends egret.DisplayObjectContainer {

    public setNumber(i : number) {
        this.removeChildren();

        let digits = i.toString(10).split("");
        digits.forEach((digit, i) => {
            let bm = Main.createBitmapByName(`number${digit}_png`);
            bm.x = i * bm.width + 5;
            this.addChild(bm);
        })
    }
}