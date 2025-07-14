// Use direct import from custom module (most reliable)
import { createViamClient, dataApi } from "@viamrobotics/sdk";
import { BSON } from "bson";

const keyid = import.meta.env.VITE_VIAM_AUTH_ENTITY;
const key = import.meta.env.VITE_VIAM_API_KEY;
const orgId = import.meta.env.VITE_VIAM_ORGANIZATION_ID;
const pipelineId = import.meta.env.VITE_VIAM_PIPELINE_ID;

async function queryPipelineSink() {
  // 1. Create client
  const client = await createViamClient({
    credentials: {
      type: "api-key",
      authEntity: keyid,
      payload: key,
    },
  });

  // 2. Create MQL pipeline (array of BSON-serialized stages)
  const mqlPipeline = [
    BSON.serialize({
      $group: {
        _id: {
          tracking_id: "$tracking_id",
          queue: "$queue",
        },
        all_events: {
          $push: {
            zone: "$zone",
            time: "$time",
          },
        },
      },
    }),
    BSON.serialize({
      $limit: 10,
    }),
  ];

  // 3. Create pipeline sink data source
  const dataSource = new dataApi.TabularDataSource({
    type: dataApi.TabularDataSourceType.PIPELINE_SINK,
    pipelineId: pipelineId,
  });

  // 4. Execute query
  const results = await client.dataClient.tabularDataByMQL(
    orgId, // organizationId
    mqlPipeline, // MQL stages array
    false, // useRecentData (optional)
    dataSource // pipeline sink source
  );

  console.log(results);
}

console.log("Querying pipeline sink...");
queryPipelineSink().catch(console.error);
