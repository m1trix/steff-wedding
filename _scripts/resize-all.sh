#!/bin/bash

cd ${1}
for file in $(ls .) ; do
    echo "Resizing ${file} ..."
    if ! gimp -d -i -b "(sw-resize-image \"${file}\")" ; then
        echo "ERROR"
        exit 1
    fi
done

cd -
