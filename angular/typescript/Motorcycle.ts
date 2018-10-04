import Vehicle from './Vehicle'

class Motorcycle extends Vehicle {
    public speeUp() :void {
        this.speed = this.speed + 20
    }
    
}

export default Motorcycle