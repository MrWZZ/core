class LinkList<T> {
    
    //链表第一个元素
    private _first:LinkNode<T>;
    public get First() {
        if(this._first)
            return this._first.data;
        else 
            return null;
    }

    //链表最后一个元素
    private _last:LinkNode<T>;
    public get Last() {
        if(this._last)
            return this._last.data;
        else 
            return null;
    }

    //链表元素个数
    private _count:number;
    public get Count() {
        return this._count;
    }

    public add($obj:T):LinkNode<T> {
        let addN = new LinkNode<T>($obj);
        //链表是空的
        if(this._first == null) {
            this._first = addN;
            this._last = addN;
        } else {
            this._last.next = addN;
            addN.pre = this._last;
            this._last = addN;
        }
        this._count++;
        return addN;
    }

    /**
     * 删除指定节点
     */
    public remove($obj:any):any {
        // todo
    }
    
    /**
     * 删除第一个
     */
    public shift():void {
        if(!this._count) {
            Log.log("链表为空，无法删除。");
            return;
        }
        this._count--;
        this._first = this._first.next;
        if(this._first) {
            this._first.pre = null;
        } else {
            this._last = null;
        }
    }   

    /**
     * 删除最后一个
     */
    public pop():void {
        if(!this._count) {
            Log.log("链表为空，无法删除。");
            return;
        }
        this._count--;
        this._last = this._last.pre;
        if(this._last) {
            this._last.next = null;
        } else {
            this._first = null;
        }
    }

    /**
     * 遍历执行
     */
    public forEach($envir:any,$fun:Function):void {
        let cur = this._first;
        while(cur) {
            $fun.apply($envir,cur.data);
        }
    }
}

class LinkNode<T> {
    public pre:LinkNode<T>;
    public data:T;
    public next:LinkNode<T>;

    public constructor($obj:T) {
        this.data = $obj;
    }
}