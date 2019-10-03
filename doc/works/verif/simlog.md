# SimLog
A quiet/no-fuss simulation logger utility to store the commandline of each runs and the result status at a remote webserver. The webserver is communicated through UDP so that the user wouldn't be affected, even if the webserver is not _UP_.

## Repository
* [Link](https://github.com/narenkn/simlog.git)

## Dependencies
Cython is used to convert Python to C.
```bash
sudo apt install cython
```

## Debug
During debug mode, set SIMLOG_DEBUGON environment variable.

## Build
```bash
make
```

## Cron Commands
```bash
*/5 * * * * cd simlog/simlog_run && bash ../src/simlog_srv.sh
0   * * * * python simlog/utils/save.py
0   0 * * * python simlog/utils/quit.py
```

## Comments
<Vssue title="SimLog" />
