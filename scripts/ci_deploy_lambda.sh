LAMBDA_NAME=$1

aws lambda update-function-code \
  --function-name $LAMBDA_NAME \
  --zip-file fileb://lambda.zip \
  --no-cli-pager

LAMBDA_STATE=$(aws lambda get-function --function-name $LAMBDA_NAME --query 'Configuration.State' --no-cli-pager)
LAMBDA_UPDATE_STATUS=$(aws lambda get-function --function-name $LAMBDA_NAME --query 'Configuration.LastUpdateStatus' --no-cli-pager)
while [ "$LAMBDA_STATE" != "\"Active\"" ] || [ "$LAMBDA_UPDATE_STATUS" != "\"Successful\"" ]
do
    echo "Waiting for lambda $LAMBDA_NAME to update...  (state: $LAMBDA_STATE, update status: $LAMBDA_UPDATE_STATUS)"

    sleep 1
    LAMBDA_STATE=$(aws lambda get-function --function-name $LAMBDA_NAME --query 'Configuration.State' --no-cli-pager)
    LAMBDA_UPDATE_STATUS=$(aws lambda get-function --function-name $LAMBDA_NAME --query 'Configuration.LastUpdateStatus' --no-cli-pager)
done

echo "Updating lambda $LAMBDA_NAME with new layer version $LAYER_VERSION_ARN..."

aws lambda update-function-configuration \
  --function-name $LAMBDA_NAME \
  --layers $LAYER_VERSION_ARN \
  --no-cli-pager