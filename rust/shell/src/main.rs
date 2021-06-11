use std::io;
use std::io::Write;

fn shell_loop()
{
    loop {
        print!("> ");
        io::stdout().flush().expect("Flushing errors");

        // Read Input Arguments
        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read line");

        let command_split = input.split_whitespace();
        let command: Vec<&str> =  command_split.collect();

        println!("{}", command[0]);
    }
}

fn main() {
    shell_loop();
}
