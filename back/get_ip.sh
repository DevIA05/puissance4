#!/bin/bash

# Get the IP address of the host machine
MACHINE_IP=$(hostname -i | cut -d' ' -f1)

# Set the environment variable
export HOST_MACHINE_IP=$MACHINE_IP

# Execute the CMD or ENTRYPOINT
exec "$@"
