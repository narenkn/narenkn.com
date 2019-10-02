# Weighing-Machine connectiviy
One can connect a generic weighing machine through UART port (no flow control). Baud rate would be 9600 bps. In this implementation, I've considered different data format that could be fed. 

## Example: Load-Cell data format
The output of data from sensor is in 12 bytes fixed length ASCII characters. The baud rate of output is 9600 bps. Example output string on screen would be strings like `08.125 Kg.` & `12.546 Kg.`. The first two ASCII digits shows kilogram and rest 3 digit after decimal point shows gram unit. The string starts with 0x0A which is new line as well as start of string idenfier. The string ends with 0x0D which is acting as line feed character or End of string idenfier.

| Count | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|:------|:---|:---|:---|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|    | Start |    |    |   |   |   |   |   |   |   |   |End|
|ASCII Out-> | 0x0A | 0-9 | 0-9 | '.' | 0-9 | 0-9 | 0-9 | ' ' | 'K' | 'g' | '.' | 0x0D |

Some weighing machines do not send any units, rather only values as string representations (similar to the one above).

## References
1. [Load cell data format](https://www.sunrom.com/p/load-cell-amplifier-for-weighing-scale-serial-output)
1. [Digital scales blog](https://www.digitalscalesblog.com/interface-description-rs-232-fx-i-fz-i-precision-balances/)

## Circuit / Driver
* Source files : [uart_at32.c](https://github.com/narenkn/atmega_biller/blob/atmega32/uart_at32.c), [uart.h](https://github.com/narenkn/atmega_biller/blob/atmega32/uart.h) <br>

Refer to circuit & driver documentation of [printer](./printer.md). This is one of the few places we've a float data-type being used. It is used to keep things simple when we go for billing. The variable `uartWeight` stores the received weight. To accomodate different types of weighing machine, only numerical value of received data is stored. Any accompanied unit is lost. The unit is used from billing maching's settings.

AT32 has one UART, but we need to connect weighing scale & a printer to it. So, I've used a simple analog mux for this purpose. The third RS232 port is available for any generic purpose, may be to enable PC connectivity (software not coded).

## Board Tests
Generic UART testing was done, but didn't have a chance to test it against a real weighing machine. I hope it works :) !!
