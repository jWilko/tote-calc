# tote-calc

A simple command line Tote calculator, written in NodeJs.

* Accepts into `stdin` single or multiple bets, stored in memory.
* Accepts into `stdin` the race results.
* Calculates dividends from the betting pool, and sends to `stdout`.
 
Supports Win, Place and Exacta bets.

## Instructions

    Prerequisites:
    - NodeJs 8.11.4 or later.
    - NPM 5.6.0 or later

Start the app: `npm start`

Provide [Bets](#Bets) via stdin.  This can be done many times.
 
Provide [Race Results](#Race-results) via stdin.

The application will exit once race results are provided and dividends displayed.

The application may be exited at any time with `CTRL+C`.

## Input data

### Bets

Bets are provided as single or multi-line entries, one bet per line.

The format for each bet is: `Bet:<product>:<selections>:<stake>`

Example:  `Bet:E:5,7:15`

### Race Results

Race results are provided as a single line result.

The format for providing race result is: `Result:<first>:<second>:<third>`

Example: `Result:5:3:8`

## Output data

When race results are provided the dividends are calculated and displayed.

A dividend is the amount to be payed out per $1 per winning bet to the nearest $0.01.

Format of each payable dividend is : `<product>:<winningSelections>:<dividend>`

Example output:

    W:2:$2.61 # Win bet on horse 2 yields $2.61
    P:2:$1.06 # Place bet on horse 2 yields $1.06
    P:3:$1.27 # Place bet on horse 3 yields $1.27
    P:1:$2.13 # Place bet on horse 1 yields $2.13
    E:2,3:$2.43 # Exacta on horses 2,3 yields $2.43

## Testing

Run unit tests with :  `npm test`
