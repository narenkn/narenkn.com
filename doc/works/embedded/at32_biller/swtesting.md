# Software tests

## Unit tests
Unit tests (present in the _units_ directory) are built for the PC's processor and can be run on your machine without the need for the real AT32 based hardware. These tests are quick and effective way of testing your software using print statements and GBD. This is achieved by through a thin layer of driver emulation. These header files are still shared with the original sources, but the `C` files are a simple emulation and can be found under the _units_ directory.

|Test|Description|
|:---|:----------|
|test_bill.c | |
|test_billing_macros.c | |
|test_common.c | |
|test_ep_store.c | |
|test_i2c.c | |
|test_lcd.c | |
|test_menu_2.c | |
|test_menu_3.c | |
|test_menu_4.c | |
|test_menu_5.c | |
|test_menubilling.c | |
|test_menudelbill.c | |
|test_menu_i.c | |
|test_menu_setting_i.c | |
|test_menushowbill.c | |
|test_printer_prn.c | |
|test_sdsettings.c | |
|test_sscanf.c | |

### Build & Run
* To build & run all tests, do: _make_
* to build & run a particular test do: _make SOURCE=test_name.c_

## Board tests
Board tests are used to bringup distinct features of the software. They are often smaller compared to the original application.

|Test|Description|
|:---|:----------|
|test_bill.c | |
|test_buzzer.c | |
|test_eeprom.c | |
|test_flash.c | |
|test_kbd_1.c | |
|test_kbd.c | |
|test_lcd.c | |
|test_lcd_nointer_2.c | |
|test_lcd_nointer.c | |
|test_menu_1.c | |
|test_printer_1.c | |
|test_ps2barscan.c | |
|test_ps2kbd_2.c | |
|test_ps2kbd.c | |
|test_rtc.c | |
|test_uart.c | |

### Building
* To build all tests, do: _make_
* to build a particular test do: _make SOURCE=test_name.c_
