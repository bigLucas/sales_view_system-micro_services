#!/bin/bash
set -eo pipefail
echo "Remember to change env variables of stage and uncomment plugin serverless-export-env inside each serverless.yml"
echo ""
stage=${STAGE:-dev}

for dir in ./src/api/handlers/*/
do
    echo ""
    echo "Executing deploy on directory $dir :"
    cd $dir
    serverless deploy --stage $stage
    cd ../../../../
done

# run at project root
# to turn executable and run:
# chmod +x deploy_to_aws.sh && sudo STAGE='stage_name' ./deploy_to_aws.sh
# or, to deploy in dev stage
# chmod +x deploy_to_aws.sh && sudo ./deploy_to_aws.sh