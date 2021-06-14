{
    init: function(elevators, floors) {
        const UP   = 0;
        const DOWN = 1;
        const PASS = 0;
        const STOP = 1;
        const TURN = 2;
        const NUMFLOORS = Math.max(...floors.map(floor => floor.floorNum()));

        let distance = function(elevator, floorNum) {
            return Math.abs( elevator.currentFloor() - floorNum);
        }

        let findIdle = function(floorNum) {
            return elevators.filter( (elevator) => (elevator.destinationQueue.length == 0))
                .sort( (a,b) => (distance(a, floorNum) - distance(b, floorNum)) );
        };


        let setWaiting = function(floorNum, direction) {

        };

        floors.forEach(floor => {
            floor.on('up_button_pressed',   () => setWaiting(floor.floorNum(), UP));
            floor.on('down_button_pressed', () => setWaiting(floor.floorNum(), DOWN));
        });

        let handleApproach = function(elevator, floor) {

        };


        let handleStop = function(elevator, floor) {
            if(elevator.currentFloor() == NUMFLOORS) {
                elevator.direction = DOWN;
                elevator.goingUpIndicator(false);
                elevator.goingDownIndicator(true);
            }
            else if(elevator.currentFloor() == 0) {
                elevator.direction = UP;
                elevator.goingUpIndicator(true);
                elevator.goingDownIndicator(false);
            }

            // no passengers
            if(elevator.loadFactor() == 0) {

            }
        };

        elevators.forEach(elevator =>
            {

            elevator.stops = new Set()

            elevator.on('floor_button_pressed', floor => elevator.stops.add(floor));
            elevator.on('passing_floor', floor => handleApproach(elevator, floor));
            elevator.on('stopped_at_floor', floor => handleStop(elevator, floor));

        });
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
