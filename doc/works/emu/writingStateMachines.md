# Tips for State-Machines
Every user has his style of coding.. I'm just showing here the style that I use..
## Enumerated states
One can write a S/M with enumerated state variable like
```verilog
   typedef enum                               { drReset, drError, drIdle,
                                                drState1, drState2, drState3,
                                                drState4 }
                                              dr_fsm_state_t;
   dr_fsm_state_t driver_state, driver_state_r;
```
This approach unlike `define` based approach, doesn't pollute the define-namespace. Another advantage is that one is not required to explicitly specify the number of bits required for the state variables and this automatically adapts if number of states increase.

## Components of a state machine
S/M can be written in a clean manner. We need two state variables, one that holds the current state `driver_state_r`. The other to hold the computed next state `driver_state`.

### State variable
The current state variable `driver_state_r`, should be synthesised to a flop. This can be explicitly written using a verilog always block.

```verilog
   always @(posedge Clk or negedge Reset_N) begin
      if (~Reset_N) begin
         driver_state_r <= drReset;
      end else begin
         driver_state_r <= (1 == pErrorRst) ? drReset :
                            ( ( 1== pError) ? drError : driver_state );
      end // else: !if(!Reset_N)
   end // always @ (posedge Clk or negedge Reset_N)
```

### Computing next state
A combinatorial block is used to compute the next state. Line numbers _1, 2_ are very important for this block of code to be inferred as a combinatorial block. One can also use `always_comb` in the first line.
```verilog{1,2}
   always @(*) begin
      driver_state = driver_state_r;
      case (driver_state_r)
        drReset:
          driver_state = clk_active ? drIdle : drReset;

        Idle: begin
           /* request pending & credits are available */
           driver_state = ~ififo_empty ? drState1 : drIdle;
        end

      endcase // case (driver_state_r)
   end // always @ (*)
```

One could wonder how two varilables declared with same construct `dr_fsm_state_t driver_state, driver_state_r;` be synthesised differently. That's synthesis for you. Synthesis always looks at how a variable is used and infer's the appropriate logic. In any event if a variable is required to hold its value, it would infer a latch.

### Action during states
All action blocks could be written in combinatorial logic with any synthesisable verilog constructs.

#### One Action
Sometimes it may be required to do an action exactly once such as sending back a `ready`. This could be accomplished by checking for entering a state or exiting a state.
```verilog
assign ready = (state1 == driver_state) & (sate1 != driver_state_r); /* entry */
assign ready2 = (state1 == driver_state_r) & (sate1 != driver_state); /* exit */
```
