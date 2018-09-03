class Random{

    /**
     * 返回$min（包含）到$max（包含）到随机整数
     */
    public getInteger($min:number,$max:number):number
    {
        let offset = $max - $min;
        return $min + Math.round(Math.random()*offset);
    }


}