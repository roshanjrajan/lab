{
    init: function(elevators, floors) {
        const maxFloor = floors.length-1;

        let distance = function( elevator, floorNum) {
            return Math.abs( elevator.currentFloor() - floorNum);
        }

        let findIdle = function( floorNum) {
            return elevators.filter( (elevator) => (elevator.destinationQueue.length == 0))
                .sort( (a,b) => (distance(a, floorNum) - distance(b, floorNum)) );
        };

        floors.forEach(function (floor) {
            floor.on("up_button_pressed down_button_pressed", function () {
                // find an idle elevator if possible
                let choice = findIdle( floor.floorNum());
                if (choice.length) {
                    randFloor = Math.floor(Math.random() * choice.length);
                    choice[randFloor].goToFloor( floor.floorNum());
                }
            });
        });

        elevators.forEach(function (elevator){
            let weight = 0.8;
            // Whenever the elevator is idle (has no more queued destinations) ...
            elevator.on("idle", function() {
                // let's go to all the floors (or did we forget one?)

                let demand = floors.filter((floor) => (floor.buttonStates.up || floor.buttonStates.down));

                // choose the first one something
                if (demand.length) {
                    randFloor = Math.floor(Math.random() * demand.length);
                    let elevatorGoToFloor = elevators.length - demand.length;
                    if(elevatorGoToFloor > 0) {
                        randElevator = Math.floor(Math.random() * elevatorGoToFloor);
                        target = randElevator == 0 ? demand[randFloor] : target = 0;
                    }
                    else {
                        target = demand[randFloor];
                    }
                    elevator.goToFloor(target);
                } else {
                    target = 0;
                    elevator.goToFloor(target);
                }

            });

            elevator.on("floor_button_pressed", function(floorNum) {
                let target = floorNum;
                elevator.goToFloor(target);
            });

            elevator.on("passing_floor", function (floorNum, direction) {
                let floor = floors[floorNum];
                let pressed = elevator.getPressedFloors();
                let stop = floor.buttonStates[direction] && elevator.loadFactor() < weight;
                // if we're going in the same direction as the button, we can stop
                if (stop || (pressed.indexOf( floorNum) >= 0)) {
                    // remove this floor from destinations
                    elevator.destinationQueue = elevator.destinationQueue.filter( (d) => (d !== floorNum));
                    // no need to checkDestinationQueue as done in here...
                    elevator.goToFloor(floorNum, true);
                }

            });

            elevator.on("stopped_at_floor", function (floorNum) {
                // do something here
                // control up and down indicators
                // TODO: control up down indicators better
                switch (floorNum) {
                    case 0:
                        up = true;
                        down = false;
                        break;
                    case maxFloor:
                        up = false;
                        down = true;
                        break;
                    default:
                        up = true;
                        down = true;
                        break;
                }
                elevator.goingUpIndicator(up);
                elevator.goingDownIndicator(down)
            });
        });
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
