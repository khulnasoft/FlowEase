#!/bin/sh
if [ "$#" -gt 0 ]; then
  # Got started with arguments
  exec flowease "$@"
else
  # Got started without arguments
  exec flowease
fi
