abstract class Random{

    /**
     * 返回$min（包含）到$max（包含）到随机整数
     */
    public static getInteger($min:number,$max:number):number
    {
        let offset = $max - $min;
        return $min + Math.round(Math.random()*offset);
    }

    /**
     * @param value 基础数值
     * @param offset 数据差值
     */
    public static getIntegerByRange(value:number,offset):number {
        let min = value - offset;
        let max = value + offset;
        return this.getInteger(min,max);
    }

    //返回一个随机浮点数
    public static getFloat($min:number,$max:number):number {
        let offset = $max - $min;
        return $min + Math.random()*offset;
    }

    /**
     * 返回几率是否成功
     * @param chance 几率[0,100)
     */
    public static getChance(chance:number):boolean {
        let ran = Math.random();
        let cha = chance / 100;
        return ran <= cha;
    }

}