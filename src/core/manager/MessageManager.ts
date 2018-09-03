class MessageManager extends BaseManager{

    private _sock:egret.WebSocket;
    private _listenr:{[key:string]:{func:Function,envir:any}[]};

    public constructor() {
        super();
        this._listenr = {};
        this._sock = new egret.WebSocket();
        this._sock.type = egret.WebSocket.TYPE_BINARY;
        this._sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._sock.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._sock.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }
    
    private onReceiveMessage($e: egret.Event): void {
        let byte = new egret.ByteArray();
        this._sock.readBytes(byte);
        let msg = byte.readUTF();
        let obj = JSON.parse(msg);
        
        Tool.Log.info(`收到协议：${obj.key}`);
        this.noticeListener(obj.key,obj.body);
    }

    private onSocketError($e: egret.Event): void {
        Tool.Log.warn("与服务器连接失败。");
    }

    private onSocketClose($e: egret.Event): void {
        Tool.Log.warn("与服务器断开连接。");
    }

    private onSocketOpen($e: egret.Event): void {
        Tool.Log.log("已连接到服务器。");
    }

    /**
     * 连接服务器
     */
    public connect($host:string,$port:number):void {
        this._sock.connect($host,$port);
    }

    /**
     * 添加监听事件
     */
    public addListener($key:string,$listen:Function,$envir:any):void {
        if(!this._listenr[$key]) {
            this._listenr[$key] = [];
        }
        this._listenr[$key].push({func:$listen,envir:$envir});
    }

    /**
     * 通知收听者消息
     */
    public noticeListener($key:string,$body:any):void {
        if(!this._listenr[$key]) {
            Tool.Log.warn(`${$key}:该协议不存在，无法通知。`);
            return;
        }
        let listen = this._listenr[$key];
        for(let i=0;i<listen.length;i++) {
            listen[i].func.call(listen[i].envir,$body);    
        }
    }

    /**
     * 移除监听事件，如果传入方法，则删除该协议下的指定方法
     */
    public removeListener($key:string,$func?:Function):void {
        if(!this._listenr[$key]) {
            Tool.Log.warn(`${$key}:该协议不存在，无法删除。`);
            return;
        }
        //删除指定方法
        if($func) {
            for(let i=this._listenr[$key].length-1;i>=0;i--) {
                if(this._listenr[$key][i].func == $func) {
                    this._listenr[$key].splice(i,1);
                }
            }
            //方法删除完毕则删除该协议
            if(this._listenr[$key].length==0) {
                delete this._listenr[$key];
            }
        } else {
            delete this._listenr[$key];
        }
        console.log(this._listenr);
        
    }

    /**
     * 移除所有监听事件
     */
    public clear():void {
        this._listenr = {};
    }

    /**
     * 发送数据
     */
    public send($data:any):void {
        Tool.Log.info(`发送协议：${$data.key}`);

        let byte = new egret.ByteArray();
        let str = JSON.stringify($data);
        byte.writeUTF(str);
        byte.position = 0;
        this._sock.writeBytes(byte, 0, byte.bytesAvailable);
    }
}