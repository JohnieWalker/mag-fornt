#!/bin/bash

start() {
    cd ${code_dir}

    export PORT=3000
    export DEBUG=bms-wex-project

    ./node_modules/.bin/forever start -p ${log_dir}/ --pidFile ${log_dir}/process.pid \
        -a -l ${log_dir}/startup.log -a -o ${log_dir}/output.log \
        -e ${log_dir}/error.log bin/www
}

stop() {
    cd ${code_dir}

    ./node_modules/.bin/forever stop -p ${log_dir}/ bin/www
}

case "$1" in
    'start')
        start
        ;;
    'stop')
        stop
        ;;
    'restart')
        stop
        start
        ;;
esac
exit ${retval}
