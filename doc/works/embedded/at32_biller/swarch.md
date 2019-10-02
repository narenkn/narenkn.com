# Software Architecture

## Initialization
Following happens in sequence
1. Device driver initializations in _main.c_
1. `menuInit()` does a host of initializations including factory setup, serial number checking, item index-ations, existing bill validations and make the device ready to create bills.
1. `menuMain()` is called, which never exits. On rare cases of exit, the system would be rebooted.

## Menu

## Device Settings

## Items

### Fast lookup

## Bills

## Power Savings

## Firmware Upgrade

## Storage
Both items and bills are stored in I2C EEPROM devices. These are very slow and becomes evident if a search is carried out.
### Items
### Bills

## Connectivity

## Self-tests

## Device Serial Number

## Report Generation

## User Priviledges & Logins
