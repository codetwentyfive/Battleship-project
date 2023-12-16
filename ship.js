class shipLogic {
    constructor(Ship) {
        super(Ship)
        this.length = length;
        this.hits = hits;
        this.state = state;
    }

    hit(ship){
        return new ship.hits ++
    }

    introduce() {
        console.log(`Hello, my ship is ${this.length} long`);
    }
}



export { shipLogic }

