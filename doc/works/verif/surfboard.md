# Surfboard
Surfboard is a utility to access waveform data from FSDB files from Python scripts.

## Repository
* [Link](https://github.com/narenkn/surfboard.git)

## Video : Enhance Debug with SurfBoard
<iframe width="560" height="315" src="https://www.youtube.com/embed/wtAbJyMPeFY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Introduction
  *Introspecting waveform* is required to gather more details on the conditions that lead to a failure. *Python* is a powerful object-oriented scripting language. It also has high level data structures and vast standard set of libraries like PERL. The most important difference with PERL is that it is object-oriented scripting language and most libraries are implemented in C.<br>
  Marrying both the above concepts leaves us with a new world : A world for the engineer where he could introspect all the subjects of a failure and to automate debug (the simulation log files and waveform data) through a script.<br>
One needs multiple datatypes to handle interaction with FSDB in Python. The surfboard libarary provides Python objects to interact with FSDB files, as listed in the table below:

| *Python Object* | *Description* |
|--|--|

## The surfboard library Reference
   The _surfboard_ library contains the class definitions, constant definitions that could be used to access the waveform database (FSDB). Refer to the _setup section_ for details on the setup requirements before one can run a python script using the surfboard library.<br>
  The _surfboard_ provides a set of constants and objects to work with. These are detailed as follows.

### Constants
Constants are of few types. Though the type-names are not directly accessible to an user, the constants are. These constants affect the behavior of methods on objects.
<dl>
<dt>Verilog type constants</dt>
<dd><code>ZERO, ONE, TRISTATE, UNKNOWN</code> : Could be used to equate a return value to a particular verilog type without any ambiguity.</dd>
<dt>Reg constants</dt>
<dd><code>DATA, CONTROL</code> : Inputs to reg methods to return appropriate values</dd>
<dt>Conversion Type constants</dt>
<dd><code>BIN, HEX, DEC, OCT</code> : Input to methods to determine what string representation to convert to.</dd>
<dt>Spatial constants</dt>
<dd><code>LSB, MSB</code> : Specifies bit in question</dd>
</dl>


   Most generally the constants alter the behavior of object methods appropriately. Lookout for places of their usages.

### SimModule Class
   The SimModule class is very comparable to the C++-cosim's <code>cSimModule</code>, the <code>monitor()</code> and <code>sequential()</code> are called at any waveform object changes value. The _waveform file_ has to be specified during the object instantiation.

#### Methods
<dl>
<dt>wave(string[, pipe_size])</dt> <dd> Returns the object to a waveform signal. Accepts path to signal, optional pipe size. Pipe helps storing of current value for later use. The old data is lost. Use the <code>pipe()</code> method to effect a pipe on the wave. Default size of pipe is 0.</dd>
<dt>surf()</dt> <dd> starts the waveform playback, for this object.</dd>
<dt>options()</dt> <dd> called during sim time 0, but before <code>early_initial()</code></dd>
<dt>early_initial()</dt> <dd> called during sim time 0, but before <code>initial()</code></dd>
<dt>initial()</dt> <dd> called during sim time 0. Wave objects should be obtained here, but not before.</dd>
<dt>monitor()</dt> <dd> called during any event of signals of the object</dd>
<dt>sequential()</dt> <dd> called during any event of signals of the object. It is called after <code>monitor()</code></dd>
<dt>pipe()</dt> <dd> Pipe all wave objects belonging to this class/object (except the event). This method helps the user if he wishes to <code>pipe()</code> all signals of this class/object. The alternative is to call <code>pipe()</code> on every wave of interest.</dd>
<dt>final()</dt> <dd> called during end of all event triggers</dd>
<dt>finish()</dt> <dd> called anytime during playback to stop it. If this routine is called. The playback is stopped cleanly and returned. The <code>final()</code> gets called anyway.</dd>
</dl>

   The class does not overload any operators. <br>

#### Members
<dl>
<dt>time</dt><dd> The current simulation time.</dd>
</dl>

### Callback Class
   The Callback class is very comparable to the C++-cosim's <code>vpiCallback</code>, the <code>callback()</code> method is called at any change of the trigger wave changes value. The _waveform file_ has to be specified during the object instantiation. The _event_ on which callback occurs could be specified with <code>add_callback()</code>.

#### Methods
<dl>
<dt>wave(string[, pipe_size])</dt> <dd> Returns the object to a waveform signal. Accepts path to signal, optional pipe size. Pipe helps storing of current value for later use. The old data is lost. Use the <code>pipe()</code> method to effect a pipe on the wave. Default size of pipe is 0.</dd>
<dt>surf()</dt> <dd> starts the waveform playback, for this object.</dd>
<dt>add_callback(string)</dt> <dd> registers the Wave which triggers <code>callback()</code> . Accepts path to the event signal. One cannot specify the edge or the bit (if its a multi-bit-signal). Returns back the wave object.</dd>
<dt>options()</dt> <dd> called during sim time 0, but before <code>early_initial()</code></dd>
<dt>early_initial()</dt> <dd> called during sim time 0, but before <code>initial()</code></dd>
<dt>callback()</dt> <dd> called in a <code>Callback</code> class object, on every event of the trigger added using <code>add_callback()</code></dd>
<dt>initial()</dt> <dd> called during sim time 0. Wave objects should be obtained here, but not before.</dd>
<dt>pipe()</dt> <dd> Pipe all wave objects belonging to this class/object (except the event). This method helps the user if he wishes to <code>pipe()</code> all signals of this class/object. The alternative is to call <code>pipe()</code> on every wave of interest.</dd>
<dt>final()</dt> <dd> called during end of all event triggers.</dd>
<dt>finish()</dt> <dd> called anytime during playback to stop it. If this routine is called. The playback is stopped cleanly and returned. The <code>final()</code> gets called anyway.</dd>
</dl>

   The class does not overload any operators. <br>

#### Members
<dl>
<dt>event</dt> <dd> The waveform object corresponding to wave signal registered using <code>add_callback()</code>.</dd>
<dt>time</dt> <dd> The current simulation time.</dd>
</dl>

### Wave Class
   _Wave_ objects are obtained by <code>wave()</code> SimModule method. The <code>SimModule.event</code> is also a wave object. _Wave_ objects normally gets modified to _reg_ objects on operations.

#### Members
<dl>
<dt>event</dt> <dd> This variable contains 0/1 corresponding to an event of this wave at this cycle.</dd>
</dl>

#### Methods
<dl>
<dt><code>pipe()</code></dt> <dd> Pipe the wave variable values. The piped value is now shifted to index 1. The previous value at index 1 goes to index 2 and so on. The last value (which would be lost) is returned back.</dd>
<dt><code>path()</code></dt> <dd> Return the signal path as string.</dd>
<dt><code>numIdx()</code></dt> <dd> Return number of index for this signal.</dd>
<dt><code>Idx()</code></dt> <dd> Return index range for this <i>index</i>.</dd>
<dt><code>reg()</code></dt> <dd> Return reg (4 state value) corresponding to current value of the wave.</dd>
<dt><code>i()</code></dt> <dd> Return int/long (control bits) corresponding to current value of the wave. Accepts one argument <code>::sb.DATA/::sb.CONTROL</code>.</dd>
<dt><code>str()</code></dt> <dd> Return string representation of current value of the wave. Accepts one argument <code>::sb.HEX/sb.OCT/sb.BIN/sb.DEC</code>.</dd>
</dl>

#### Overloaded operators
<dl>
<dt>Unary </dt> <dd> <code>+, -, _is non zero_, ~</code></dd>
<dt>Binary</dt> <dd> <code>+, -, *, /, %, &, ^, |, >>, <<</code></dd>
<dt>Others</dt> <dd> <code>len(), [], oct(), hex(), int(), long()</code></dd>
</dl>

### Reg Class
   cReg is underlying this object. Hence it can represent arbitrary length verilog 4-state variables.

#### Methods
<dl>
<dt><code>i(CONST)</code></dt><dd> Return int/long object (control value). Accepts one arguments <code>::sb.DATA/::sb.CONTROL</code>.</dd>
<dt><code>str(CONST)</code></dt><dd> Return string object with value. Accepts one arguments <code>::sb.OCT/sb.BIN/sb.DEC/sb.HEX</code>.</dd>
<dt><code>push(CONST)</code></dt><dd> Pushes one bit either at lsb/msb. Takes optional argument <code>::sb.LSB/sb.MSB</code>.</dd>
<dt><code>resize(int[, int])</code></dt><dd> Resize the reg. One/Two args [Msb:Lsb].</dd>
<dt><code>pop(CONST)</code></dt><dd> Returns the lsb/msb bit (<code>sb.ZERO/sb.ONE/sb.UNKNOWN/sb.TRISTATE</code>) and decreases the size by one. Optional argument <code>::sb.LSB/sb.MSB</code>.</dd>
</dl>

#### Overloaded operators
<dl>
<dt>Unary</dt><dd><code> +, -, _is non zero_, ~</code></dd>
<dt>Binary</dt><dd><code> +, -, *, /, %, &, ^, |, <<, >></code></dd>
<dt>Others</dt><dd><code> oct(), hex(), int(), long()</code></dd>
</dl>

### *Python* pitfalls
<dl>
<dt>assignments</dt><dd>An assignment takes the value on the right and places to the identifier on the left irrespective of the object the identifier had. Consider the following code</dd>
<code>
   r = reg(31, 0);
   r = 20;
   print type(r);
</code>
   <dd>One would expect that <code>r</code> would still be of <code>reg</code> datatype and would hold the value of 20. But you would be quite surprised to understand that *Python* might have quietly replaced the <code>reg</code> object with <code>int</code> object with value 20.</dd>
<dt>Operator overloading</dt> <dd>To invoke an operator on an object, one of the following two has to be used <code>r += 20; r1 = r2 + 20;</code></dd>
<dt><code>Int, LongInt</code></dt><dd>Python has two int datatypes. one is <code>int</code>, the other <code>long</code>. The former can accommodate maximum of 64 databits (well actually depends on machine architecture) and the later can be arbitrarily large. Python intelligently uses both the data types, converting one into another whenever required. Hence w.r.t an user, he may not find any difference. Just be aware that an arbitrary <code>int</code> data can be manipulated in Python.</dd>
</dl>

## Building Surfboard library
   The surfboard libarary is written in C and hence is a shared-object file for the __specific python installation__ it would run with. Unexpected results might occur if different versions are used for build and run. User needs to be aware of this fact. C-code should not be dependent on gcc versions, but we found that different gcc versions were throwing different warnings/errors during compilation. The following tool versions were found to work correctly with the library.
```bash
module load        gcc/3.3.4
module load        python/2.3.4
module load        verdi/2013.01
```

   Steps to build the surfboard library yourself
   1. `module load surfboard`
   1. `mkdir <some_location_to_build>; cd <some_location_to_build>`
   1. Build the surfboard libarary : `python $ANCHOR_surfboard/build.py build` : You should find `build/lib.linux.../sb.so` shared object being created.
   1. Set <code>PYTHONPATH</code> appropriately <code>setenv PYTHONPATH &#96;pwd&#96;/build/lib.linux...:${PYTHONPATH}</code> or equivalent in your appropriate shell.

## Including surfboard in your project
  This should be done in your project configuration file, the format could also be different.
```bash
  <module> <name>surfboard</name>                <ver>6</ver> </module>
```
  There are two options to include the surfboard library in your project. First one, build the .so during 'bootenv'. Second one, build the .so at a later stage.

### First Option : build the .so during bootenv
  The best option is to build surfboard during _setup_ by putting the following code in one of your _modulefiles_

```bash
if { [file exists $env(PROJECT_PATH)/sbso/sb.so] = 1} {
   puts stderr "Building sbso/sb.so"
   file mkdir $env(PROJECT_PATH)/sbso
   cd $env(PROJECT_PATH)/sbso
   exec python $env(ANCHOR_surfboard)/build.py build >& build.log
   if { [file exists [glob -nocomplain build/lib.*/sb.so]] == 1 } {
     file link -symbolic sb.so [glob -nocomplain build/lib.*/sb.so]
   } else {
     puts stderr "Could not create sbso/sb.so : Please do it manually"
   }
}

prepend-path PYTHONPATH $env(PROJECT_PATH)/sbso
```

### Second Option : build the .so when required
  Add the following code in one of your _modulefiles_

```bash
prepend-path PYTHONPATH $env(PROJECT_PATH)/surfboard
```

#### Create .so before running your surfboard script
  The earlier two changes needs to go into your checkin. This step creates the surfboard's shared object file and you can run it once for each checkout. *Note that this is a bash script and could be put into a file if needed to be used by the team.

```bash
# /bin/env bash

if [  -d $PROJECT_PATH/surfboard ] ; then
  mkdir $PROJECT_PATH/surfboard;
fi

cd $PROJECT_PATH/surfboard;
if [  -f $PROJECT_PATH/surfboard/sb.so ] ; then
  echo Creating $PROJECT_PATH/surfboard/sb.so
  python $ANCHOR_surfboard/build.py build > build.log 2>&1;
  if [  -f build/lib.*/sb.so ] ; then
    echo "Creation of sb.so FAILED";
    cat build.log;
  else 
    ln -s build/lib.*/sb.so .;
  fi
fi
```


## Setup, Caveats
<dl>
<dt>Which Python?</dt>
<dd>Each project may be using a different version of python, which makes it difficult to provide compiled libraries. Hence it was decided to release source files and let users compile it for their purpose. CARE SHOULD BE TAKEN TO MAKE SURE THE VERSION/LOCATION OF PYTHON USED TO BUILD THE COMPILED-OBJECT WILL BE THE ONE USED TO LOAD IT.</dd>
<dt>Locating the surfboard library</dt>
<dd>The statement <code>import sb</code> will cause an attempt to locate the <code>sb.so</code> shared library in the <code>PYTHONPATH</code>. So, an user is required to set the environment variable <code>PYTHONPATH</code> with appropriate full-path. Checkout the library building section. <code>PYTHONPATH</code> is similar to <code>PATH</code> environment variable.</dd>
<dt>Alternate specification of surfboard library</dt>
<dd>The following code could be used to specify the path to surfboard library, right in the script itself</dd>
<code>
import sys
sys.path.append('build/lib.linux-x86_64-2.3')
from sb import *
</code>

<dt>Importing identifiers from library</dt>
<dd>The <code>import</code> statement causes all <i>public identifiers</i> to be exported to the current script. This prevents an user from using identifiers used by the library. If this is not desirable, then simple <code>import sb</code> would help you : but you'll have to refer to a library identifier with a prefix : like <code>sb.HEX</code>.</dd>
<dt>___name___</dt>
<dd>Any python script could be <code>import</code> ed as a module. Hence never have statements executed in your script. You have to protect your code with the <code>if</code> statement below</dd>
</dl>

```python
if __name__ == "__main__":
  tt_c = tt_checker("verilog.fsdb");
  tt_c.surf();
```

## Tutorials

<Vssue title="Surfboard" />
