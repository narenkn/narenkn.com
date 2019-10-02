# C-Dump
This is a C++ library to dump C/C++ variables together with FSDB dumps. This makes debug with C++ testbenches simple.

## Repository
* [Link](https://github.com/narenkn/cdump.git)

## Interface
```c++
#define cDUMP_PushHier(hier)
#define cDUMP_PopHier()
#define cDUMP_PushArray(hier, sz)
#define cDUMP_PopArray()
#define cDUMP_int64(var, ...)
#define cDUMP_int32(var, ...)
#define cDUMP_int16(var, ...)
#define cDUMP_int8(var, ...)
#define cDUMP_char(var, ...)
#define cDUMP_bool(var, ...)
#define cDUMP_float(var, ...)
#define cDUMP_double(var, ...)
#define cDUMP_var(var, ...)
#define cDUMP_Arr1D(var)
```

## Example
The code was plucked out of existing code. I haven't had the opportunity to create a working example. I would be very happy if one of you could do it. Let me know, if further information is needed.
