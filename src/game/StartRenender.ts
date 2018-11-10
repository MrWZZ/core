class StartRenender extends eui.ItemRenderer {

    public txtCon;

    public constructor() {
        super();
        this.skinName = SkinPath.renender;
    }

    public dataChanged():void {
        this.txtCon.text = this.data.con;
    }
}