# SCEMI Library
SCEMI Library Implemented in vanilla C. The library implementes the Function-based Interface of the [spec](http://www.accellera.org/images/downloads/standards/sce-mi/SCE-MI_v22-140120-final.pdf).

## Uses
The library could be used to send transactions between two or more simulations running on same/different hosts.

## Video
<iframe width="560" height="315" src="https://www.youtube.com/embed/qOtkPb75nx0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Reference
* [Accellera Page](https://www.accellera.org/downloads/standards/sce-mi)
* [Spec](https://www.accellera.org/images/downloads/standards/sce-mi/SCE-MI_v23-June_2015.pdf)

## Repository
* [Link](https://github.com/narenkn/scemi_lib.git)

### Prerequisites
Standard verilog simulators implementing PLI/VPI.

## Running the tests
Tested on unix machines with industry standard compilers & VCS compiler. One test is present in _tests_ dir. Run commands are provided
```bash
cd tests
bash run.sh
```

## Authors
* **Narendran Kumaragurunathan** - *Initial work* - [scemi_lib](https://github.com/scemi_lib)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

<Vssue title="SCEMI Library" />
