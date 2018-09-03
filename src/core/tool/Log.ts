class Log{

    /**
     * 不影响游戏运行、无关紧要等通知
     */
    public log($msg:string):void 
    {
        console.log.call(console,$msg);
    }

    /**
     * 游戏进程进度等信息提示
     */
    public info($msg:string):void
    {
        console.info.call(console,$msg);
    }

    /**
     * 相关操作失败，不执行该操作等警告
     */
    public warn($msg:string):void
    {
        console.warn.call(console,$msg);
    }

    /**
     * 导致游戏运行停止、图片不显示等严重错误
     */
    public error($msg):void
    {
        // 强制终止代码并卡住调用堆栈
        console.error.call(console,$msg);
    }
}