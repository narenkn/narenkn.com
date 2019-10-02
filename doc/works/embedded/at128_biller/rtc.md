## Real Time Clock
Provision for I2C based DS1307 is provided, which can be enabled by `#define DS1307=1`. <br>
But AT128 has an internal oscillator, which just needs a crystal. `ISR(TIMER0_COMP_vect)` is called for every second and this keeps track of the time. [Ref circuit](at128.md)

### Board Tests
* [test_rtc.c](https://github.com/narenkn/atmega_biller/blob/atmega128/tests/test_rtc.c)
