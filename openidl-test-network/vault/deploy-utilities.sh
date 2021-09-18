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
aws configure set aws_access_key_id ${ACCESS_ID}
result=$?
if [ $result -ne 0 ]; then
        echo "aws access key failed to set"
    exit 1
aws configure set aws_secret_access_key ${SECRET_KEY}
result=$?
if [ $result -ne 0 ]; then
        echo "aws secret key failed to set"
    exit 1
aws configure set region ${REGION}}
result=$?
if [ $result -ne 0 ]; then
        echo "aws region failed to set"
    exit 1
echo "aws environment variables set successfully"
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