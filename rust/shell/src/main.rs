/*
* Basic Shell
*/
use std::io;
use std::io::Write;
use std::process::Command;


fn shell_loop()
{
    loop {
        print!("> ");
        io::stdout().flush().expect("Flushing errors");

        // Read Input Arguments
        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read line");

        let mut line = input.trim().split_whitespace();
        let command = line.next().unwrap();
        let args = line;

        match command
        {
            "quit" => return,
            command =>
            {
                let mut child = Command::new(command)
                    .args(args)
                    .spawn()
                    .expect(&format!("{} command failed to start", command));

                child.wait().expect("Failed to execute command");
            }


        }

        io::stdout().flush().expect("Flushing errors");

        /*
        let pid = fork();

        match pid.expect("Fork Failed: Unable to create child process!") {
            Child => println!(
                "Hello from child process with pid: {} and parent pid:{}",
                getpid(),
                getppid()
            ),
            Parent { child } => {
                wait().expect("Wait Failed");
                println!(
                    "Hello from parent process with pid: {} and child pid:{}",
                    getpid(),
                    child
                );
            }
        }
        */
    }
}

fn main() {
    shell_loop();
}
