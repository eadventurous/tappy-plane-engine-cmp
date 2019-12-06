import { BitmapFont } from "laya/display/BitmapFont";
import { Handler } from "laya/utils/Handler";
import { Text } from "laya/display/Text";
import { Laya } from "Laya";

export class Text_BitmapFont {
    private fontName: string;

   constructor(fontFile = "main-font.fnt", fontName = "main-font") {
        var bitmapFont: BitmapFont = new BitmapFont();
        bitmapFont.loadFont(fontFile, new Handler(this, this.onFontLoaded, [bitmapFont]));
        this.fontName = fontName;
    }

    private onFontLoaded(bitmapFont: BitmapFont): void {
        bitmapFont.setSpaceWidth(10);
        Text.registerBitmapFont(this.fontName, bitmapFont);
    }

    public createText(text: string): Text {
        var txt: Text = new Text();
        txt.text = text;
        txt.font = this.fontName;
        Laya.stage.addChild(txt);
        return txt;
    }
}