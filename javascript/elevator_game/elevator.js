{
    init: function(elevators, floors) {
        const UP   = 0;
        const DOWN = 1;
        const PASS = 0;
        const STOP = 1;
        const TURN = 2;
        const MAXFLOORS = Math.max(...floors.map(floor => floor.floorNum()));

        floorsWaitingForElevator = [new Set(), new Set()]

        let setWaiting = function(floorNum, direction) {
            if((direction == UP && floorNum == MAXFLOORS) || (direction == UP && floorNum == MAXFLOORS)){
                console.log(`Direction is ${direction} and floorNum is ${floorNum}`);
                return;
            }

            floorsWaitingForElevator[direction].add(floorNum);
        };

        floors.forEach(floor => {
            floor.on('up_button_pressed',   () => setWaiting(floor.floorNum(), UP));
            floor.on('down_button_pressed', () => setWaiting(floor.floorNum(), DOWN));
        });

        let handleApproach = function(elevator, floor) {

        };


        let handleStop = function(elevator, floor) {
            if(elevator.currentFloor() == MAXFLOORS) {
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
            else {
                let pressedFloors = elevator.getPressedFloors();

            }
        };

        elevators.forEach(elevator =>{

            elevator.stops = new Set();

            elevator.on('floor_button_pressed', floor => elevator.stops.add(floor));
            elevator.on('passing_floor', floor => handleApproach(elevator, floor));
            elevator.on('stopped_at_floor', floor => handleStop(elevator, floor));

        });
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
