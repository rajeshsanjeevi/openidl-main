#!/bin/bash
#set -x

JQ=$(which jq)
RESULT=$?
if [ $RESULT -ne 0 ]; then
  echo "Failed to execute jq command."
  exit 1
fi
if [ ! -x "${JQ}" ]; then
  echo "jq command not found."
  exit 1
fi

checkOptions() {
  if [ -z "${SECRET_ID}" ]; then
    echo "SECRET_ID is not defined"
    exit 1
  fi
  if [ -z "${APP}" ]; then
    echo "APP is not defined"
    exit 1
  fi
  if [ -z "${CONFIG}" ]; then
    echo "CONFIG is not defined"
    exit 1
  fi
}
action() {
echo "Retrieve credentials from AWS secret manager"
aws secretsmanager get-secret-value --secret-id ${SECRET_ID} --query SecretString --output text | jq -r 'to_entries|map("\(.key)=(.value)")|.[]' > /tmp/secrets.env
result=$?
if [ $result -ne 0 ]; then
	echo "Failed to retrieve credentials from AWS secret manager"
    exit 1
fi
echo "Export retrieved credentials as ENV variables"
eval $(cat /tmp/secrets.env | sed 's/^/export /')
result=$?
if [ $result -ne 0 ]; then
	echo "Failed to export credentials as ENV variables"
    exit 1
fi
rm -f /tmp/secrets.env
echo ${url}, ${username}, ${password}, ${orgName}, ${vaultPath}
./openidl-test-network/vault/pull-vault-config.sh -V ${url} -U ${username} -P ${password} -a ${CONFIG} -o ${orgName} -c ${CONFIG}
result=$?
if [ $result -ne 0 ]; then
	echo "Failed to retrieve credentials from VAULT"
    exit 1
fi
}
SECRET_ID=""
while getopts "s:a:c:" key; do
  case ${key} in
  s)
    SECRET_ID=${OPTARG}
    ;;
  a)
    APP=${OPTARG}
    ;;
  c)
    CONFIG=${OPTARG}
    ;;
  \?)
    echo "Unknown flag: ${key}"
    ;;
  esac
done

checkOptions
action

exit 0