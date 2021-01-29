#!/bin/bash

for file in $(ls .) ; do
    echo "Resing ${file}"
    if ! gimp -d -i -b "(sw-resize-image \"${file}\")" ; then
        echo "ERROR"
        exit 1
    fi
done