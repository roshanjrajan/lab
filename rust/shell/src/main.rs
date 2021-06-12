/*
* Basic Shell
*/
use nix::sys::wait::wait;
use nix::unistd::ForkResult::{Child, Parent};
use nix::unistd::{fork, getpid, getppid};
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

        let command = input.split_whitespace();
        let tokens: Vec<&str> =  command.collect();

        if tokens[0] == "quit" {break;}

        println!("Executing command {}", tokens[0]);

        Command::new(tokens[0])
            .args(&tokens[1..])
            .spawn()
            .expect(&format!("{} command failed to start", tokens[0]));

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
