export default class Vehicle {
    protected model: string
    private speed: number = 0

    public speeUp() :void {
        this.speed = this.speed + 10
    }
    
    public stop() :void {
        this.speed = 0
    }
    
    public currentSpeed() :number {
        return this.speed
    }
}

export let anything: string = "Test"