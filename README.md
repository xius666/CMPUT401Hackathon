# CMPUT401Hackathon

# Invincibot
StarCraft2 Bot for CMPUT 350 Couse Project at University of Alberta.

## Build requirements
TODO


## Build instructions

```
# Get the project.
$ git clone --recursive git@github.com:qianyyu/invincibot.git && cd invincibot

# Create build directory.
$ mkdir build && cd build

# Generate a Makefile.
# Use 'cmake -DCMAKE_BUILD_TYPE=Debug ../' if debuginfo is needed
# Debug build also contains additional debug features and chat commands support.
$ cmake ../

# Build the project.
$ VERBOSE=1 cmake --build . --parallel

# Launch the bot with the specified path to a SC2 map, e.g.
$ ./bin/invincibot -c -a zerg -d Medium -m 0
```

## License
TODO