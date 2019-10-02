# Synthesizing memory
  Synthesising for Hardware Emulators tries to map a multi-dimentional `logic/bit` declaration to a memory. But it fails to infer a memory due to bad coding style. The following are the guidelines to infer memories for multi-dimentional declarations. Note that there are pragma's (embedded comments) available in all emulators for this purpose, but that too would fail due to bad coding style. Pragma's also fail if the multi-dimentional array is less than a minimum size (say 512 bits).

## Do's and Dont's
### Do's
1. Have clear write conditions & read conditions :
```verilog
always @(posedge clk)
  if (we) mem <= wr_data;
```
2. Byte enables are supported
1. Multiport writes were supported, there’s a physical limit on this

### Dont's
1. Do not reset the array, use other innovative strategies. Initialization with Initial block is supported in Veloce.
1. Avoid more than 1 write to the array in any clock cycle. Multi-port memories are supported in Veloce.
1. Do not use it as a ram :
```verilog
if (ram[0] == ‘h1) begin
end else if (ram[1] == ‘h2) begin
end else if (ram[2] == ‘h3) begin
end else if (ram[3] == ‘h4) begin
end
```
4. Sliced Memory location writes does not infer a memory
```verilog
always @(posedge clk) begin
  ram[0][31:16] <= 16'hDEAD;
end
```
