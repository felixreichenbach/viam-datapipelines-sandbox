
viam datapipelines create --org-id=$VITE_VIAM_ORGANIZATION_ID --name="Queue" --enable-backfill=true --data-source-type=standard --schedule="* * * * *" --mql-path=query.json


viam datapipelines list --org-id=$VITE_VIAM_ORGANIZATION_ID

viam datapipelines describe --id=$VITE_VIAM_PIPELINE_ID


viam datapipelines disable --id=$VITE_VIAM_PIPELINE_ID

viam datapipelines delete --id=$VITE_VIAM_PIPELINE_ID