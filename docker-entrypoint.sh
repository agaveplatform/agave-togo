#!/usr/bin/env bash

# calling initial entrypoint for apache and ssl setup
bash /docker_entrypoint.sh

DOCUMENT_ROOT=${DOCUMENT_ROOT:-/var/www/html}
WEB_PREFIX=${WEB_PREFIX:-}

# Check whether the app should run at a subpath rather than the root of a domain
if [[ -n "${WEB_PREFIX}" ]]
then
  echo "App will run as a subpath to $WEB_PREFIX"
  ABS_WEB_PREFIX=${DOCUMENT_ROOT}/${WEB_PREFIX}

  echo "Setting content directory to $ABS_WEB_PREFIX"
  if [[ ! -e "$ABS_WEB_PREFIX" ]]
  then
    echo "Target content directory does not exist. Copying content there now."
    mv /var/www/html /html
    mkdir -p ${ABS_WEB_PREFIX}
    mv /html/* ${ABS_WEB_PREFIX}/
  fi
else
  echo "App will run at the document root"
  ABS_WEB_PREFIX=${DOCUMENT_ROOT}
  echo "Setting content directory to $ABS_WEB_PREFIX"
fi

exec "$@"