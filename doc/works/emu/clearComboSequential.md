# Combinational and Sequential blocks in Synthesisable Verilog
Let's look at a simple counter implementation in synthesisable verilog. Generally, there's a tendency to write the code in one design block.
```verilog
logic [3:0] counter;
always @(posedge clk)
  if (reset)
    counter <= 4'h0;
  else
    counter <= counter + 1;
```

This kind of coding is not going to harm you, if you really understand what you're doing. **Writing synthesisable verilog is an _expression of the design in your mind_.** In this example, one should have in their mind that the design they are about to code has two parts (1) a 4-bit f/f to store the counter value (2) a combinational adder circuit to compute the next value. So, now the coding is just an _expression of design that's already in your mind_.

```verilog
logic [3:0] counter_r;
wire [3:0] counter;
always @(posedge clk)
  if (reset)
    counter_r <= 4'h0;
  else
    counter_r <= counter;
assign counter = counter_r + 1;
```

This kind of coding practice will help you understand your design better and would help you to debug larger circuits.

