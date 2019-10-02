# Environment
  I've used both _Ubuntu_ and _cygwin_ with same codebase & results. To flash into the device, you have to be either on _Ubuntu_ or run the flash software from _Windows_ directly with the _.hex_ files generated from cygwin. I think the _bash_ shell feature of _Windows 10_ would be much easier to use as well.

## Checkout & Dependency installations
1. sudo apt-get install gcc-avr binutils-avr avr-libc
1. sudo apt install libncurses5-dev
1. git clone https://github.com/narenkn/atmega_biller.git
1. cd atmega_biller
1. git checkout atmega32

## Build
Following commands would help you build for ATMEGA32
* cd default
* make

## Utils
The intent was to create a self-executing firmware update to flash the production device. The directory _gsBiller_ contains the firmware update software's source files. Updated firmware would be hard-built into the executable and can only be used to flash that update version. <br>
_fastboot_ is the image that would receive the incoming software updates and would program the device's flash. I've done most of the work, get in touch if you need this working.
