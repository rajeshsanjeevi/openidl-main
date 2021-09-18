#!/bin/bash
#set -x
checkOptions() {
  if [ -z "${ACCESS_ID}" ]; then
    echo "AWS_ACCESS_ID is not defined"
    exit 1
  fi
  if [ -z "${SECRET_KEY}" ]; then
    echo "AWS_SECRET_KEY is not defined"
    exit 1
  fi
  if [ -z "${REGION}" ]; then
    echo "AWS_REGION is not defined"
    exit 1
  fi
}
action() {
echo "Install utilities"
yum install unzip wget tar gzip jq which sed -y
result=$?
if [ $result -ne 0 ]; then
        echo "Failed to install utilities using yum install"
    exit 1
fi
echo "Success with yum install for required utilities"
wget https://get.helm.sh/helm-v3.7.0-rc.3-linux-amd64.tar.gz
result=$?
if [ $result -ne 0 ]; then
        echo "Failed to download helm binary"
    exit 1
fi
echo "Downloaded helm binary"
tar -zxvf helm-v3.7.0-rc.3-linux-amd64.tar.gz
result=$?
if [ $result -ne 0 ]; then
        echo "Extracting helm binary failed"
    exit 1
fi
echo "Helm binary extracted"
mv linux-amd64/helm /usr/local/bin/helm
result=$?
if [ $result -ne 0 ]; then
        echo "Failed to move helm binary under /usr/local/bin"
    exit 1
fi
echo "Helm is ready for usage"
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
result=$?
if [ $result -ne 0 ]; then
        echo "Failed to download awscli"
    exit 1
fi
echo "awscli download completed"
unzip awscliv2.zip
result=$?
if [ $result -ne 0 ]; then
        echo "Extract awscli"
    exit 1
fi
echo "awscli unzipped"
./aws/install --update
result=$?
if [ $result -ne 0 ]; then
        echo "Failed to install awscli"
    exit 1
fi
echo "awscli install completed"
declare -a awskey=(${ACCESS_ID} ${REGION} ${SECRET_KEY})
for config in "${awskey[@]}"; do
  aws configure set aws_access_key_id ${config}
  rc=$?
  if [ $rc -ne 0 ]; then
    echo "Failed to set AWS env variable ${config}"
    exit 1
  fi
  echo "${config} env variable is set"
done
}
SECRET_KEY=""
ACCESS_ID=""
REGION=""

while getopts "a:s:r:" key; do
  case ${key} in
  a)
    ACCESS_ID=${OPTARG}
    ;;
  s)
    SECRET_KEY=${OPTARG}
    ;;
  r)
    REGION=${OPTARG}
    ;;
  \?)
    echo "Unknown flag: ${key}"
    ;;
  esac
done

checkOptions
action

exit 0