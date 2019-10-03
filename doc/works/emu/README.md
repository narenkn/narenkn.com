# Hardware Emulation
Hardware Emulation can be considered as a high-speed 2-state simulation. Speeds such as 250KHz (or 250K cycles/second) are common & we've also seen speeds upto 800KHz. But it has some constraints on the simulation components
1. Design has to be synthesisable verilog/ system verilog
1. Only cycle-accurate. If design has both +ve edge & -ve edge flops, then the speed halves.
1. Has modes to support non-synthesisable constructs at the cost of speed. This is the Simulation Acceleration mode described below.

## Caveat
Oflate, I've been using one particular emulator vendor (Veloce from Mentor), so all my data/results have not been validated on other emulators. But the point is that other vendors would soon catch-up if they've not!! At my workplace, I've access to other Emulators as well, but do not have the time to do experiments on them!!

## History
FPGAs were designed to become an alternative to ASICs. But due to their high-cost, they can't be used in high-volume solutions. I suppose they have lost to penetrate that market. Even in early days, FPGAs were a useful prototyping devices. You could develop both the hardware & software solutions (test at a lower frequency), before the ASIC is manufactured. This was becoming a generic use-case, and problems such as synthesis/fit on FPGA and debug capability were becoming complex and highly time-consuming. The process of developing hardware with software, together with its production-circuit board was called Emulation. Few companies started creating and marketing specific devices which made this prototyping easy as opposed to raw FPGA based hardware.<br>
Two types of emulator hardware are (1) Processor based and (2) FPGA based. Processor based hardware use highly massive and parallel processors for this purpose.

## Modes of Emulation
In recent times, it is very rare that Emulators are used in any one mode described below. The most common use case would be a combination of any or all modes.

### Synthesisable TB
As the name suggests, the test-bench and stimulus are created out of synthesisable modules. This enables complete design and stimulus generation to be placed in the emulator box. This is the fastest mode on the emulator. <br>
If the design is kind of processor and in this case, stimulus could be provided by placing the program binary into the memory. Even in this case, a synthesisable model of the system-memory and other peripherals would be needed. <br>
#### Advantages
1. Speed.
#### Disadvantages
1. Controlability of stimulus
1. Generation of stimulus : Such as constraint random generation
1. Development time and maintenance

### Simulation Acceleration
In Simulation Acceleration, the existing non-synthesisable testbench and synthesisable DUT are both accelerated in a simulator and emulator respectively. Both are compiled independently and during run will synchronize for every clock. Generally a 5x-10x speed improvements (over pure simulation) could be seen. <br>
Transaction based SA is about 10x faster than traditional SA. Here, the synchronization is only done if transaction packets are to be exchanged. Here, both sides do not run in a clock-synthronized fashion, which could cause additional debug challenges.<br>
#### Advantages
1. Stimulus could be reused.
#### Disadvantages
1. Additional effort required in multiple build models.
1. Debug is touch due to randomness in synchronization, which make recreation more difficuilt.

### In-Circuit Emulation
In ICE mode, the primary IOs of the design can be connected directly to a working periperal and emulated. Due to slownees of the design being emulated, a speed bridge would be required to make this connection in almost all cases.
#### Advantages
1. Real use-case is verified for very long durations, with standard components.
#### Disadvantages
1. Availability of Speed Bridges
1. Debug

## Comments
<Vssue title="Hardware Emulation" />
