# Using User-types in Synthesisable Verilog
User types defined using `struct` keyword defines an aggregate type. One can use it to write clean and understandable code. It is also important to use `struct packed` as un-packed data-types do not support the features described here.

## Package the user types
If possible, `package` the user types which 'll enable usage across multiple modules/ files.
```verilog
package emuc;
   typedef struct packed {
      bit [7:0]  addr;
      bit [7:0]  data;
   } REQ;
endpackage // emuc
```

## As an aggregate
If used as a aggregate, it has advantages during declaration (not required to specify bit-size) and usage (fields accessable using the dot-operator). Moreover if new fields are added or if their size changes, the code adapts beautifully.

```verilog
emuc::REQ req, req_r;

always (@posedge clk)
    req_r <= req;

always @(*) begin
    req = 'h0;
    if (cond1)
        req.addr = 8'h12;
end
```

## As a Multi-dimentional memory
User types can be inferred as a memory if [used rightly](/works/emu/synthesisMem.html).
```verilog
emuc::REQ req_mem[100];
emuc::REQ req_mem_r_val;
int req_mem_rd_ptr, req_mem_wr_ptr;

always (@posedge clk)
    req_mem[req_mem_wr_ptr] <= req;

assign req_mem_r_val = req_mem[req_mem_rd_ptr];
```

## As a module interface
User types can be used in module interfaces, and is synthesisable.

```verilog
module emuc_req_tube #(SIZE = 1024)
   ( input clk, input _reset,
     input  send_valid, input emuc::REQ sdata, output send_ack,
     output recv_valid, output emuc::REQ rdata, input recv_ack
     );

endmodule // emuc_req_tube
```
