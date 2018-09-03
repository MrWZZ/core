class StartController extends BaseController {
    
    private StartView:StartView;

    public constructor() {
        super();
        this.registerFunc(StartFunc.openStartView,this.openStartView);
        this.registerFunc(StartFunc.closeStartView,this.closeStartView);
    }

    public openStartView() {
        this.StartView = new StartView(this,Manager.Layer.main);
        this.StartView.open();
    }

    public closeStartView() {
        this.StartView.close();
        this.StartView = null;
    }
}